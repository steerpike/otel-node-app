const express = require('express');
const { trace, SpanStatusCode } = require('@opentelemetry/api');


const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api', async (req, res) => {
    const span = trace.getActiveSpan();
    const randomNum = Math.random();
    if (randomNum < 0.9) {
        res.status(200).send(`Success`);
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
        }
        res.status(randomError.status).send(randomError.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
