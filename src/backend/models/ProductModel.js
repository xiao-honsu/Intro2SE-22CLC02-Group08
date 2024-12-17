const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    address: { type: String },
    quantity: { type: Number, required: true },
    categoryIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    sellerID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: {
        type: String,
        enum: ['Pending Approval', 'Not Purchased', 'Shipping', 'Purchased'],
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
    }
});

module.exports = mongoose.model('Product', productSchema);
