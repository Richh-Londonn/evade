module.exports = (io) => {
    io.use((socket, next) => {
        try {
            // Perform any necessary authentication or validation
            next();
        } catch (err) {
            console.error('WebSocket Error:', err.message);
            socket.emit('error', { message: 'An error occurred' });
            next(err);
        }
    });
};
