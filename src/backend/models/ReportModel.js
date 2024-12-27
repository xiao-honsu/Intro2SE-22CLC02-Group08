const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    reporterID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reportedID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    description: { type: String },
    reportDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);