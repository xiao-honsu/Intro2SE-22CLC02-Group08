const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    sellerID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    buyerID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
    feedbackDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);