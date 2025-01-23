const environments = {
    development: {
        database: 'mongodb://localhost:27017/evade_dev',
        jwtSecret: 'dev_jwt_secret',
        apiKeys: {
            mapService: 'dev_map_api_key',
        },
    },
    testing: {
        database: 'mongodb://localhost:27017/evade_test',
        jwtSecret: 'test_jwt_secret',
        apiKeys: {
            mapService: 'test_map_api_key',
        },
    },
    production: {
        database: process.env.MONGO_URI,
        jwtSecret: process.env.JWT_SECRET,
        apiKeys: {
            mapService: process.env.MAP_SERVICE_API_KEY,
        },
    },
};

const environment = process.env.NODE_ENV || 'development';
module.exports = environments[environment];
