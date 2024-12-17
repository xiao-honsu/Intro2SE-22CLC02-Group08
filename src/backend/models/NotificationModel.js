const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    receiverID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);