// Auth Middleware
module.exports = (req, res, next) => { console.log('Auth middleware'); next(); };