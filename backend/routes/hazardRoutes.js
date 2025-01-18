const express = require('express');
const router = express.Router();
const { cacheMiddleware } = require('../utils/cache');

// Route to get all cached hazards
router.get('/', cacheMiddleware('all_hazards'), (req, res) => {
    // If no cache, continue to handler
    const hazards = []; // Fetch from database or other source
    res.status(200).json(hazards);
});

module.exports = router;
