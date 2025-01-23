const socketIO = require('socket.io');

module.exports = (server) => {
    const io = socketIO(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        socket.on('hazard_alert', (data) => {
            console.log('Hazard alert received:', data);
            // Broadcast hazard alert to all connected clients
            io.emit('hazard_update', data);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
};
