
const OBDReader = require('serial-obd');
const serialOBDReader = new OBDReader('/dev/ttyUSB0', { baudRate: 9600 });

serialOBDReader.on('dataReceived', (data) => {
    console.log('OBD-II Data:', data);
    // Example: Extract specific metrics like speed or engine temperature
    const speed = data.speed || 'N/A';
    const engineTemp = data.engineTemp || 'N/A';
    console.log(`Speed: ${speed}, Engine Temperature: ${engineTemp}`);
});

serialOBDReader.connect();
console.log('Connected to OBD-II device. Listening for data...');
