const sanitizeHtml = require('sanitize-html');

exports.sanitizeBody = (req, res, next) => {
    const sanitizeObject = (obj) => {
        Object.keys(obj).forEach((key) => {
            if (typeof obj[key] === 'string') {
                obj[key] = sanitizeHtml(obj[key], { allowedTags: [], allowedAttributes: {} });
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                sanitizeObject(obj[key]);
            }
        });
    };

    sanitizeObject(req.body);
    next();
};
