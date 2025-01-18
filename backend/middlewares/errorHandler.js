class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = {
    AppError,
    errorHandler: (err, req, res, next) => {
        console.error(err.stack || 'No stack trace');
        res.status(err.statusCode || 500).json({
            error: err.message || 'Internal Server Error',
        });
    },
};
