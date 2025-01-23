
const express = require('express');
const router = express.Router();
const tf = require('@tensorflow/tfjs-node');

// Load the hazard detection model
let model;
(async () => {
    model = await tf.loadLayersModel('file://ml/models/hazard_detection_model/model.json');
    console.log('Hazard detection model loaded successfully');
})();

// Predict hazards
router.post('/predict', async (req, res) => {
    if (!model) return res.status(500).json({ error: 'Model not loaded' });

    const { image } = req.body; // Expect base64 image data
    try {
        const tensor = tf.node.decodeImage(Buffer.from(image, 'base64'), 3)
            .resizeNearestNeighbor([128, 128])
            .toFloat()
            .expandDims(0);

        const prediction = model.predict(tensor).dataSync();
        res.json({ prediction });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Prediction failed' });
    }
});

module.exports = router;
