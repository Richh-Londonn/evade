
const express = require('express');
const router = express.Router();
const { createCheckoutSession } = require('../subscriptions/stripe');

router.post('/create-checkout-session', createCheckoutSession);

module.exports = router;
