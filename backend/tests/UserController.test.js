const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const UserModel = require('../models/UserModel');
require('dotenv').config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/evade_test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe('UserController Tests', () => {
    let userId;

    it('should create a new user', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({ name: 'Test User', email: 'test@example.com', password: 'password123' });
        expect(res.statusCode).toBe(201);
        expect(res.body.email).toBe('test@example.com');
        userId = res.body._id;
    });

    it('should return all users', async () => {
        const res = await request(app).get('/api/users');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should fail to create a user with an invalid email', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({ name: 'Invalid Email User', email: 'not-an-email', password: 'password123' });
        expect(res.statusCode).toBe(400);
        expect(res.body.error[0].field).toBe('email');
    });

    it('should delete the created user', async () => {
        const res = await request(app).delete(`/api/users/${userId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('User deleted successfully');
    });
});
