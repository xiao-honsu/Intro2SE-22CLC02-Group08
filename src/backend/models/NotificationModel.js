const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    receiverID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: ["buyer", "seller", "admin"] },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false },
});

module.exports = mongoose.model('Notification', notificationSchema);