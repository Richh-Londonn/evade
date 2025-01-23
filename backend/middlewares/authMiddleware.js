const jwt = require('jsonwebtoken');
const { AppError } = require('./errorHandler');

// Verify access token
exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return next(new AppError('Access denied, token missing', 403));

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        next(new AppError('Invalid or expired token', 401));
    }
};

// Refresh access token
exports.refreshToken = (req, res, next) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return next(new AppError('Refresh token missing', 403));

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const newAccessToken = jwt.sign(
            { id: decoded.id, email: decoded.email },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );
        res.status(200).json({ accessToken: newAccessToken });
    } catch (err) {
        next(new AppError('Invalid or expired refresh token', 401));
    }
};
