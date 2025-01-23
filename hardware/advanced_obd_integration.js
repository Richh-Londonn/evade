
const OBDReader = require('serial-obd');
const serialOBDReader = new OBDReader('/dev/ttyUSB0', { baudRate: 9600 });

serialOBDReader.on('dataReceived', (data) => {
    const vehicleData = {
        speed: data.speed || 'N/A',
        engineTemperature: data.engineTemp || 'N/A',
        fuelLevel: data.fuelLevel || 'N/A',
        rpm: data.rpm || 'N/A',
    };
    console.log('Vehicle Data:', vehicleData);
    // Additional logic: Send vehicle data to frontend or store in database
});

serialOBDReader.connect();
console.log('Advanced OBD-II integration active. Listening for data...');
