const redis = require('redis');
const client = redis.createClient({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
});

client.on('connect', () => {
    console.log('Connected to Redis for analytics');
});

client.on('error', (err) => {
    console.error('Redis connection error:', err);
});

// Increment a metric in Redis
exports.incrementMetric = (metric) => {
    client.incr(metric, (err, reply) => {
        if (err) {
            console.error(`Error incrementing metric ${metric}:`, err);
        } else {
            console.log(`Metric ${metric} incremented, new value:`, reply);
        }
    });
};

// Fetch all metrics from Redis
exports.getMetrics = (callback) => {
    client.keys('*', (err, keys) => {
        if (err) {
            console.error('Error fetching metrics keys:', err);
            callback(err, null);
            return;
        }
        const metrics = {};
        let completed = 0;

        keys.forEach((key) => {
            client.get(key, (err, value) => {
                if (!err) {
                    metrics[key] = parseInt(value, 10) || 0;
                }
                completed += 1;
                if (completed === keys.length) {
                    callback(null, metrics);
                }
            });
        });
    });
};
