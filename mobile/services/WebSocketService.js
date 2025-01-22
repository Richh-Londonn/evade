
export const setupWebSocket = (onMessage) => {
    const socket = new WebSocket('ws://localhost:5000');

    socket.onopen = () => {
        console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
        console.log('WebSocket message:', event.data);
        onMessage(JSON.parse(event.data));
    };

    socket.onclose = () => {
        console.log('WebSocket disconnected');
    };

    return socket;
};
