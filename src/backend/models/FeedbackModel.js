const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    sellerID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    buyerID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value >= 0.5 && value <= 5 && (value * 2) % 1 === 0;
            },
            message: 'Rating must be a multiple of 0.5 between 0.5 and 5.'
        }
    },
    comment: { type: String },
    feedbackDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);