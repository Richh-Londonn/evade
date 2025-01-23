const users = new Map();

module.exports = (io) => {
    io.use((socket, next) => {
        const now = Date.now();
        const user = users.get(socket.id) || { lastMessageTime: 0, messageCount: 0 };
        
        const timeSinceLastMessage = now - user.lastMessageTime;

        if (timeSinceLastMessage > 1000) {
            user.messageCount = 0; // Reset count every second
        }

        user.lastMessageTime = now;
        user.messageCount += 1;

        if (user.messageCount > 10) {
            return next(new Error('Rate limit exceeded'));
        }

        users.set(socket.id, user);
        next();
    });
};
