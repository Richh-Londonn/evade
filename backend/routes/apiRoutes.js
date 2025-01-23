const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Define routes
router.get('/users', verifyToken, UserController.getAllUsers);
router.post('/users', UserController.createUser);
router.put('/users/:id', verifyToken, UserController.updateUser);
router.delete('/users/:id', verifyToken, UserController.deleteUser);

module.exports = router;
