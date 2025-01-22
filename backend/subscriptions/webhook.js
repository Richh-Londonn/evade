
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY');
const express = require('express');

const handleStripeWebhook = (req, res) => {
    const sig = req.headers['stripe-signature'];

    try {
        const event = stripe.webhooks.constructEvent(
            req.rawBody,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );

        switch (event.type) {
            case 'invoice.payment_succeeded':
                console.log('Payment succeeded:', event.data.object);
                // Handle successful payment logic here (e.g., update subscription status)
                break;

            case 'invoice.payment_failed':
                console.log('Payment failed:', event.data.object);
                // Handle failed payment logic here (e.g., notify the user)
                break;

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        res.json({ received: true });
    } catch (err) {
        console.error('Webhook error:', err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
};

module.exports = { handleStripeWebhook };
