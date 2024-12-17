const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    buyerID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    totalAmount: { type: Number, required: true }
});

module.exports = mongoose.model('Cart', cartSchema);