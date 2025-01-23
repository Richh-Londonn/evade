
function tenantIsolation(req, res, next) {
    const tenantId = req.headers['x-tenant-id'];
    if (!tenantId) {
        return res.status(400).json({ error: 'Missing Tenant ID' });
    }
    req.tenantId = tenantId;
    next();
}

module.exports = tenantIsolation;
