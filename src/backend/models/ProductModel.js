const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    address: { type: String },
    categoryIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    sellerID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: {
        type: String,
        enum: ['Pending Approval', 'Not Purchased', 'To confirm', 'Shipping', 'Purchased'],
        default: 'Pending Approval'
    },
    images: {
        type: [String], 
        validate: {
            validator: function (arr) {
                return arr.length <= 5; 
            },
            message: 'You can upload up to 5 images only.'
        }
    },
    statusUpdatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
