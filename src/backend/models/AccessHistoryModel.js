const mongoose = require('mongoose');

const accessHistorySchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    timestamp: { type: Date, default: Date.now },
    status: { type: String, enum: ['Logged In', 'Logged Out'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('AccessHistory', accessHistorySchema);