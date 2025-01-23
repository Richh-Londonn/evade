
const express = require('express');
const router = express.Router();
const { handleStripeWebhook } = require('../subscriptions/webhook');

// Stripe webhook endpoint
router.post('/stripe', express.raw({ type: 'application/json' }), handleStripeWebhook);

module.exports = router;
