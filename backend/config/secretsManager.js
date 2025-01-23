require('dotenv').config();

const secrets = {
    jwtSecret: process.env.JWT_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    redisHost: process.env.REDIS_HOST || 'localhost',
    redisPort: process.env.REDIS_PORT || 6379,
};

if (!secrets.jwtSecret || !secrets.jwtRefreshSecret) {
    throw new Error('Missing critical secrets. Check your .env file.');
}

module.exports = secrets;
