
const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    plan: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive', 'canceled'], default: 'active' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Subscription', SubscriptionSchema);
