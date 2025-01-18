const fs = require('fs');
const path = require('path');

class OfflineMapManager {
    constructor(mapDirectory = './maps') {
        this.mapDirectory = mapDirectory;
        if (!fs.existsSync(this.mapDirectory)) {
            fs.mkdirSync(this.mapDirectory, { recursive: true });
        }
    }

    downloadMap(region, url) {
        console.log(`Downloading map for region: ${region}`);
        const mapPath = path.join(this.mapDirectory, `${region}.map`);

        // Simulate a download process
        fs.writeFileSync(mapPath, 'Map data for ' + region);
        console.log(`Map downloaded and saved to ${mapPath}`);
    }

    listMaps() {
        return fs.readdirSync(this.mapDirectory).map((file) => file.replace('.map', ''));
    }

    deleteMap(region) {
        const mapPath = path.join(this.mapDirectory, `${region}.map`);
        if (fs.existsSync(mapPath)) {
            fs.unlinkSync(mapPath);
            console.log(`Map for region ${region} deleted.`);
        } else {
            console.log(`Map for region ${region} not found.`);
        }
    }
}

module.exports = OfflineMapManager;
