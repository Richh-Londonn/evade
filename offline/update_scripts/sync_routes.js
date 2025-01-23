
const fs = require('fs');
const axios = require('axios');
const path = require('path');

const routeCachePath = path.join(__dirname, '../route_cache');

async function syncRoutes() {
    const files = fs.readdirSync(routeCachePath);

    for (const file of files) {
        const filePath = path.join(routeCachePath, file);
        try {
            const routeData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            const response = await axios.post('http://localhost:5000/api/routes/sync', routeData);
            if (response.status === 200) {
                console.log(`Synced route: ${file}`);
                fs.unlinkSync(filePath); // Delete synced file
            }
        } catch (error) {
            console.error(`Failed to sync route: ${file}`, error.message);
        }
    }
}

syncRoutes();
