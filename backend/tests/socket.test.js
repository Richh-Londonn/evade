const io = require('socket.io-client');
const { createServer } = require('http');
const socketServer = require('../socket/index');

let server, clientSocket;

beforeAll((done) => {
    server = createServer();
    socketServer(server);
    server.listen(() => {
        const { port } = server.address();
        clientSocket = io(`http://localhost:${port}`);
        clientSocket.on('connect', done);
    });
});

afterAll(() => {
    server.close();
    clientSocket.close();
});

describe('WebSocket Hazard System', () => {
    it('should broadcast hazard alerts', (done) => {
        const hazardData = { id: '123', type: 'speed', message: 'Speed trap ahead' };
        clientSocket.emit('hazard_alert', hazardData);

        clientSocket.on('hazard_update', (data) => {
            expect(data).toEqual(hazardData);
            done();
        });
    });
});
