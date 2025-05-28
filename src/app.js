const express = require('express');
const { trace, SpanStatusCode } = require('@opentelemetry/api');


const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api', async (req, res) => {
    let userId = req.query.user_id ? parseInt(req.query.user_id, 10) : Math.floor(Math.random() * (1000 - 11 + 1)) + 11;
    const span = trace.getActiveSpan();
    if (span) {
        span.setAttribute('user_id', userId);
    }
    if (userId === 10) {
        // Wait 4-6 seconds, then return success
        const delay = Math.floor(Math.random() * (6000 - 4000 + 1)) + 4000;
        await new Promise(resolve => setTimeout(resolve, delay));
        res.status(200).send(`Success for user_id ${userId} after ${delay / 1000}s`);
    } else {
        const randomNum = Math.random();
        if (randomNum < 0.9) {
            res.status(200).send(`Success for user_id ${userId}`);
        } else {
            const errorTypes = [
                { status: 500, message: 'Internal Server Error' },
                { status: 502, message: 'Bad Gateway' },
                { status: 503, message: 'Service Unavailable' },
                { status: 504, message: 'Gateway Timeout' },
                { status: 503, message: 'Downstream Phoenix failure' },
            ];
            const randomError = errorTypes[Math.floor(Math.random() * errorTypes.length)];
            if (span) {
                //{resource.service.name="error-testing-app" && span.http.status_code >=500} | rate() by(span.http.status_code)
                span.setStatus({ code: SpanStatusCode.ERROR, message: randomError.message });
                span.recordException({ code: randomError.status, message: randomError.message });
                // {resource.service.name="error-testing-app" && span.exception.type >=500} | rate() by(span.exception.message)
                span.setAttribute('exception.type', randomError.status);
                span.setAttribute('exception.message', randomError.message);
            }
            res.status(randomError.status).send(randomError.message);
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
