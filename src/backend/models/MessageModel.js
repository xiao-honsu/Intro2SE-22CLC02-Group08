const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chatID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    senderID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiverID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);