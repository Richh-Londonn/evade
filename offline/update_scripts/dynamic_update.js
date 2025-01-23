
const fs = require('fs');
const axios = require('axios');
const path = require('path');

async function updateMapTile(region, retries = 3) {
    const url = `https://tile.openstreetmap.org/${region}.png`;
    const filePath = path.join(__dirname, '../map_cache', `${region}.png`);

    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            const response = await axios.get(url, { responseType: 'stream' });
            await new Promise((resolve, reject) => {
                const stream = response.data.pipe(fs.createWriteStream(filePath));
                stream.on('finish', resolve);
                stream.on('error', reject);
            });
            console.log(`Updated map tile: ${region}`);
            return; // Success, exit the loop
        } catch (error) {
            console.error(`Failed to update map tile: ${region} (Attempt ${attempt + 1})`, error.message);
        }
    }

    console.error(`Failed to update map tile: ${region} after ${retries} attempts`);
}

async function updateMapTiles() {
    const mapCachePath = path.join(__dirname, '../map_cache');
    const regionsToUpdate = ['0/0/0', '0/1/0', '1/0/0', '1/1/0']; // Example tiles

    for (const region of regionsToUpdate) {
        await updateMapTile(region);
    }
}

updateMapTiles();
