
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const mapCachePath = path.join(__dirname, '../map_cache');
const priorityRegions = [
    '0/0/0', // Example region 1
    '0/1/0', // Example region 2
];

async function cachePriorityTiles() {
    console.log('Caching priority regions...');
    for (const region of priorityRegions) {
        const url = `https://tile.openstreetmap.org/${region}.png`;
        const filePath = path.join(mapCachePath, `${region}.png`);

        if (fs.existsSync(filePath)) {
            console.log(`Tile already cached: ${region}`);
            continue;
        }

        try {
            const response = await axios.get(url, { responseType: 'stream' });
            await new Promise((resolve, reject) => {
                const stream = response.data.pipe(fs.createWriteStream(filePath));
                stream.on('finish', resolve);
                stream.on('error', reject);
            });
            console.log(`Cached tile: ${region}`);
        } catch (error) {
            console.error(`Failed to cache tile: ${region}`, error.message);
        }
    }
}

cachePriorityTiles();
