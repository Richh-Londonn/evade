
const WebSocket = require('ws');

const clients = new Set();

function setupWebSocket(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        clients.add(ws);
        console.log('New client connected. Total clients:', clients.size);

        ws.on('message', (message) => {
            console.log('Received:', message);
            clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        });

        ws.on('close', () => {
            clients.delete(ws);
            console.log('Client disconnected. Total clients:', clients.size);
        });
    });

    console.log('WebSocket server setup complete.');
}

module.exports = { setupWebSocket };
