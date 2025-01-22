
const axios = require('axios');

async function performRequests(concurrentUsers) {
    const requests = [];
    for (let i = 0; i < concurrentUsers; i++) {
        requests.push(
            axios.get('http://localhost:5000/api/notifications/test', {
                headers: { Authorization: 'Bearer testtoken' },
            })
        );
    }
    try {
        const results = await Promise.all(requests);
        console.log(`${concurrentUsers} requests completed successfully.`);
    } catch (error) {
        console.error('Error during stress testing:', error.message);
    }
}

// Simulate 100, 500, and 1000 concurrent users
[100, 500, 1000].forEach((users) => {
    performRequests(users);
});
