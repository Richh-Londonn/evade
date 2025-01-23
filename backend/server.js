
const express = require('express');





const app = express();
const rateLimiter = require('./middleware/rate_limit');
const tenantIsolation = require('./middleware/tenant_middleware');

// Apply rate limiting
app.use(rateLimiter);

// Apply tenant isolation
app.use(tenantIsolation);

app.use('/api/profile', require('./api/profile')); // Profile API
app.use('/api/notifications', require('./api/notifications')); // Notifications API
app.use('/api/analytics', require('./api/analytics')); // Analytics API

const morgan = require('morgan');
const winston = require('winston');

// Logger setup
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' })
    ],
});

// Use Morgan for HTTP request logging
app.use(morgan('combined'));

// Error Handling Middleware
app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.use('/api/user', require('./api/user')); // User API
app.use('/api/hazard', require('./api/hazard')); // Hazard Detection API

const { setupWebSocket } = require('./ws/websocket');

const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const routes = require('./routes');
dotenv.config();

// Middleware
app.use(bodyParser.json());

app.use('/api', routes);

app.use('/api/subscription', require('./routes/subscription')); // Subscription routes
app.use('/api/webhook', require('./routes/webhook')); // Webhook routes



// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    setupWebSocket(server); // WebSocket setup

    console.log(`Server running on port ${PORT}`);
});
