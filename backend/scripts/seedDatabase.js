const mongoose = require('mongoose');
const UserModel = require('../models/UserModel');
const AlertModel = require('../models/AlertModel');
require('dotenv').config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/evade', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const users = [
            { name: 'Admin', email: 'admin@example.com', password: 'password123' },
            { name: 'John Doe', email: 'john@example.com', password: 'password123' },
        ];
        const alerts = [
            { type: 'speed', message: 'Speed trap ahead', active: true },
        ];

        await UserModel.insertMany(users);
        console.log('Users seeded successfully');

        await AlertModel.insertMany(alerts);
        console.log('Alerts seeded successfully');
    } catch (err) {
        console.error('Error seeding data:', err.message);
    } finally {
        mongoose.disconnect();
    }
};

seedData();
