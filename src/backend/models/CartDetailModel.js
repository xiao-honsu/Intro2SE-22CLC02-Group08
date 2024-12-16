const mongoose = require('mongoose');

const cartDetailSchema = new mongoose.Schema({
    cartDetailID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    cartID: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
    productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true }
});

module.exports = mongoose.model('CartDetail', cartDetailSchema);