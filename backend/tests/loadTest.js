const request = require('supertest');
const app = require('../app');

describe('Load Testing API Endpoints', () => {
    it('should handle multiple concurrent requests', async () => {
        const requests = [];
        for (let i = 0; i < 100; i++) {
            requests.push(request(app).get('/api/analytics'));
        }

        const responses = await Promise.all(requests);
        responses.forEach((response) => {
            expect(response.statusCode).toBe(200);
        });
    });
});
