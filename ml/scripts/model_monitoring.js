
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const path = require('path');

const logsPath = path.join(__dirname, '../logs/model_logs.json');

async function monitorModelAccuracy(modelPath, testDataPath) {
    const model = await tf.loadLayersModel(`file://${modelPath}`);
    const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));

    let correctPredictions = 0;

    testData.forEach(({ image, label }) => {
        const tensor = tf.tensor4d(image, [1, 128, 128, 3]);
        const prediction = model.predict(tensor).argMax(-1).dataSync()[0];

        if (prediction === label) {
            correctPredictions += 1;
        }
    });

    const accuracy = correctPredictions / testData.length;
    const logEntry = {
        timestamp: new Date().toISOString(),
        accuracy,
        datasetSize: testData.length,
    };

    fs.appendFileSync(logsPath, JSON.stringify(logEntry) + '\n');
    console.log('Model Accuracy:', accuracy);
}

monitorModelAccuracy('../models/hazard_detection_model/model.json', '../data/test_hazard_data.json');
