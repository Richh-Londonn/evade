// User model
const mongoose = require('mongoose');
module.exports = mongoose.model('User', new mongoose.Schema({ name: String, email: String }));