const express = require('express');
const { incrementMetric, getMetrics } = require('../utils/analytics');
const router = express.Router();

// Endpoint to get all metrics
router.get('/', (req, res) => {
    getMetrics((err, metrics) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch metrics' });
        }
        res.status(200).json(metrics);
    });
});

// Endpoint to increment a specific metric
router.post('/increment', (req, res) => {
    const { metric } = req.body;
    if (!metric) {
        return res.status(400).json({ error: 'Metric name is required' });
    }
    incrementMetric(metric);
    res.status(200).json({ message: 'Metric incremented' });
});

module.exports = router;
