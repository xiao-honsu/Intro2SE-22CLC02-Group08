const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    productName: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    address: { type: String },
    quantity: { type: Number, required: true },
    categoryID: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    sellerID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: {
        type: String,
        enum: ['Pending Approval', 'Not Purchased', 'Shipping', 'Purchased'],
        default: 'Pending Approval'
    },
    images: [{ type: String }]
});

module.exports = mongoose.model('Product', productSchema);