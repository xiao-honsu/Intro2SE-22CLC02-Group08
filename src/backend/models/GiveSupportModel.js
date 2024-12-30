const mongoose = require('mongoose');

const giveSupportSchema = new mongoose.Schema({
    senderID: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
    receiverID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('GiveSupport', giveSupportSchema);
