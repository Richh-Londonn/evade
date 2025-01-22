
const express = require('express');
const router = express.Router();
const WebSocket = require('../ws/websocket');

// Send notification to all connected clients
router.post('/send', (req, res) => {
    const { message } = req.body;
    try {
        WebSocket.broadcast({ type: 'NOTIFICATION', message });
        res.json({ success: true, message: 'Notification sent' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send notification' });
    }
});

module.exports = router;
