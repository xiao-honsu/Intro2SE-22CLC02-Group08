const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema({
    orderDetailID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    orderID: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('OrderDetail', orderDetailSchema);