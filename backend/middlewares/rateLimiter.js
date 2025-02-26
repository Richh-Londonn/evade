const rateLimit = require('express-rate-limit');

// Apply rate limiting to all routes
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes.',
});

module.exports = apiLimiter;
