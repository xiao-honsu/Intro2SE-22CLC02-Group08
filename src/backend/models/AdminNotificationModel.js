const mongoose = require('mongoose');

const adminNotificationSchema = new mongoose.Schema({
    receiverID: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    role: { type: String, enum: ["admin"] },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false },
});

module.exports = mongoose.model('AdminNotification', adminNotificationSchema);