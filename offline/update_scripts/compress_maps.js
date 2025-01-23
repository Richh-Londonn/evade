
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

function compressMapTiles() {
    const mapCachePath = path.join(__dirname, '../map_cache');

    fs.readdir(mapCachePath, (err, files) => {
        if (err) {
            console.error('Error reading map cache directory:', err.message);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(mapCachePath, file);
            const compressedFilePath = `${filePath}.gz`;

            const readStream = fs.createReadStream(filePath);
            const writeStream = fs.createWriteStream(compressedFilePath);
            const gzip = zlib.createGzip();

            readStream.pipe(gzip).pipe(writeStream);
            console.log(`Compressed map tile: ${file}`);
        });
    });
}

compressMapTiles();
