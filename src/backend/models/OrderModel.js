const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    buyerID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiverName: { type: String, required: true },
    receiverPhoneNumber: { type: String, required: true },
    receiverEmail: { type: String, required: true },
    address: { type: String, required: true },
    paymentMethod: { type: String, enum: ['COD', 'BANKING'], required: true },
    bank: { type: String },
    bankAccount: { type: String },
    orderDate: { type: Date, default: Date.now },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' }
});

module.exports = mongoose.model('Order', orderSchema);