
const fs = require('fs');
const path = require('path');

const mapCachePath = path.join(__dirname, '../map_cache');
const tileAgeLimit = 30 * 24 * 60 * 60 * 1000; // 30 days

function purgeOldTiles() {
    fs.readdir(mapCachePath, (err, files) => {
        if (err) {
            console.error('Error reading map cache directory:', err.message);
            return;
        }

        const now = Date.now();
        files.forEach((file) => {
            const filePath = path.join(mapCachePath, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Error reading file stats:', err.message);
                    return;
                }

                if (now - stats.mtimeMs > tileAgeLimit) {
                    fs.unlink(filePath, (err) => {
                        if (err) console.error('Error deleting file:', err.message);
                        else console.log(`Deleted old tile: ${file}`);
                    });
                }
            });
        });
    });
}

purgeOldTiles();
