const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    cartID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    buyerID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    totalAmount: { type: Number, required: true }
});

module.exports = mongoose.model('Cart', cartSchema);