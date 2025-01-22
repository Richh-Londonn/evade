
const rateLimit = require('express-rate-limit');

// Define rate limit settings
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: 'Too many requests from this IP, please try again later.',
});

module.exports = apiLimiter;
