
const { spawn } = require('child_process');

function analyzeRFSignals() {
    const rtlPower = spawn('rtl_power', ['-f', '88M:108M', '-g', '30']);

    rtlPower.stdout.on('data', (data) => {
        console.log('RF Data:', data.toString());
    });

    rtlPower.stderr.on('data', (data) => {
        console.error('Error:', data.toString());
    });

    rtlPower.on('close', (code) => {
        console.log(`RF Analysis process exited with code ${code}`);
    });
}

analyzeRFSignals();
