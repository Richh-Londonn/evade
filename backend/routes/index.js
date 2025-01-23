
const express = require('express');
const router = express.Router();

// Example route
router.get('/', (req, res) => {
    res.send({ message: 'Welcome to the Evade API!' });
});

module.exports = router;
