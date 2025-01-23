const redis = require('redis');
const client = redis.createClient({
    host: 'localhost',
    port: 6379,
});

client.on('connect', () => {
    console.log('Redis client connected');
});

client.on('error', (err) => {
    console.error('Redis connection error:', err);
});

// Cache middleware
exports.cacheMiddleware = (key) => async (req, res, next) => {
    client.get(key, (err, data) => {
        if (err) return next(err);
        if (data) {
            return res.status(200).json(JSON.parse(data));
        }
        next();
    });
};

// Set cache
exports.setCache = (key, value, expiry = 3600) => {
    client.setex(key, expiry, JSON.stringify(value));
};
