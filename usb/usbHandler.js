const fs = require('fs');
const path = require('path');

class USBHandler {
    constructor(mountPath = '/media/usb') {
        this.mountPath = mountPath;
    }

    isUSBConnected() {
        // Simulate USB connection check
        console.log(`Checking for USB connection at ${this.mountPath}...`);
        return fs.existsSync(this.mountPath);
    }

    copyToUSB(filePath) {
        if (!this.isUSBConnected()) {
            throw new Error('No USB device connected');
        }

        const fileName = path.basename(filePath);
        const destination = path.join(this.mountPath, fileName);
        fs.copyFileSync(filePath, destination);
        console.log(`File copied to USB: ${destination}`);
    }

    listFilesOnUSB() {
        if (!this.isUSBConnected()) {
            throw new Error('No USB device connected');
        }

        return fs.readdirSync(this.mountPath);
    }
}

module.exports = USBHandler;
