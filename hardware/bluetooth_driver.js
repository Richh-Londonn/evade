
const noble = require('noble');

noble.on('stateChange', (state) => {
    if (state === 'poweredOn') {
        console.log('Bluetooth powered on. Scanning for devices...');
        noble.startScanning();
    } else {
        noble.stopScanning();
    }
});

noble.on('discover', (device) => {
    console.log(`Discovered device: ${device.advertisement.localName}`);
});
