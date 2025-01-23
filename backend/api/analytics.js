
const express = require('express');
const router = express.Router();

// Mock analytics data
router.get('/dashboard', (req, res) => {
    const mockData = {
        activeUsers: 1500,
        subscriptions: 350,
        hazardsReported: 250,
    };
    res.json(mockData);
});

module.exports = router;
