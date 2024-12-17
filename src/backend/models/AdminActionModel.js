const mongoose = require('mongoose');

const adminActionSchema = new mongoose.Schema({
    adminID: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    actionType: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AdminAction', adminActionSchema);