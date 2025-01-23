
const fs = require('fs');
const axios = require('axios');
const path = require('path');

const downloadMapTiles = async (region) => {
    const url = `https://tile.openstreetmap.org/${region}.png`;
    const filePath = path.join(__dirname, '../map_cache', `${region}.png`);

    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream',
        });
        response.data.pipe(fs.createWriteStream(filePath));
        console.log(`Downloaded map tile: ${region}`);
    } catch (error) {
        console.error(`Error downloading map tile: ${region}`, error);
    }
};

const regions = ['0/0/0', '0/1/0', '1/0/0', '1/1/0']; // Example tiles
regions.forEach((region) => downloadMapTiles(region));
