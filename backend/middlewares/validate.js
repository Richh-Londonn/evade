exports.validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            error: error.details.map((detail) => ({
                field: detail.path[0],
                message: detail.message,
            })),
        });
    }
    next();
};
