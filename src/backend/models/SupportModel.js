const mongoose = require('mongoose');

const supportSchema = new mongoose.Schema({
    senderID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiverID: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Support', supportSchema);