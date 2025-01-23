
const fs = require('fs');
const path = require('path');

const signalLogsPath = path.join(__dirname, '../logs/rf_signal_logs.json');

function mapRFSignals(signalData) {
    const mappedData = signalData.map((signal) => ({
        frequency: signal.frequency,
        strength: signal.strength,
        location: signal.location, // GPS coordinates
        type: signal.type || 'Unknown',
    }));

    fs.appendFileSync(signalLogsPath, JSON.stringify(mappedData, null, 2) + '\n');
    console.log('RF Signals Mapped:', mappedData);
}

module.exports = mapRFSignals;
