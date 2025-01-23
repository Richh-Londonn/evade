
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

async function runInference(imagePath) {
    const model = await tf.loadLayersModel('file://ml/models/hazard_detection_model/model.json');
    const imageBuffer = fs.readFileSync(imagePath);
    const decodedImage = tf.node.decodeImage(imageBuffer, 3)
        .resizeNearestNeighbor([128, 128])
        .toFloat()
        .expandDims(0);

    const prediction = model.predict(decodedImage);
    prediction.print();
    console.log('Inference complete. Prediction:', prediction.dataSync());
}

const imagePath = process.argv[2];
if (!imagePath) {
    console.error('Please provide the path to an image.');
    process.exit(1);
}

runInference(imagePath);
