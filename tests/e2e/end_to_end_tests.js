
const request = require('supertest');
const app = require('../backend/server'); // Assuming server is exported from this path

describe('End-to-End Tests', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({ name: 'Test User', email: 'testuser@example.com', password: 'password123' });
        expect(response.statusCode).toBe(200);
    });

    it('should login the user', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({ email: 'testuser@example.com', password: 'password123' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should fetch user profile', async () => {
        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send({ email: 'testuser@example.com', password: 'password123' });
        const token = loginResponse.body.token;

        const profileResponse = await request(app)
            .get('/api/profile/testuser')
            .set('Authorization', `Bearer ${token}`);
        expect(profileResponse.statusCode).toBe(200);
        expect(profileResponse.body).toHaveProperty('email', 'testuser@example.com');
    });
});
