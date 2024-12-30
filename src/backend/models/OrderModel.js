const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    buyerID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiverName: { type: String, required: true },
    receiverPhoneNumber: { type: String, required: true },
    receiverEmail: { type: String, required: true },
    address: { type: String, required: true },
    paymentMethod: { type: String, enum: ['COD', 'Banking'], required: true },
    bank: { type: String },
    bankAccount: { type: String },
    orderDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['Confirming', 'Shipping', 'Received', 'Cancelled'], default: 'Comfirming' }
});

module.exports = mongoose.model('Order', orderSchema);