const { setCache } = require('../utils/cache');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        socket.on('hazard_alert', (data) => {
            console.log('Received hazard alert:', data);

            // Broadcast the hazard to all connected clients
            io.emit('hazard_update', data);

            // Cache the hazard for future use
            const cacheKey = `hazard:${data.id}`;
            setCache(cacheKey, data, 3600); // Cache for 1 hour
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
};
