const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api', async (req, res) => {
    try {
        // Simulate a periodic chance of throwing an unhandled error
        if (Math.random() < 0.1) {
            throw new Error('Simulated critical error');
        }
        const randomNum = Math.random();
        if (randomNum < 0.9) {
            res.status(200).send(`Success`);
        } else {
            const errorTypes = [
                { status: 500, message: 'Database connection failed' },
                { status: 502, message: 'Upstream subscriptions gateway error' },
                { status: 503, message: 'VMS service temporarily unavailable' },
                { status: 504, message: 'User API processing timed out' },
                { status: 503, message: 'Downstream Phoenix failure' },
            ];
            const randomError = errorTypes[Math.floor(Math.random() * errorTypes.length)];
            res.status(randomError.status).send(randomError.message);
        }
    } catch (err) {
        // Log the error and send a 500 response
        res.status(500).send(err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
