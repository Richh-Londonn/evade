
const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/audit.log');

function logAudit(action, userId, details) {
    const logEntry = {
        timestamp: new Date().toISOString(),
        action,
        userId,
        details,
    };
    fs.appendFile(logFilePath, JSON.stringify(logEntry) + '\n', (err) => {
        if (err) console.error('Error writing to audit log:', err.message);
    });
}

module.exports = logAudit;
