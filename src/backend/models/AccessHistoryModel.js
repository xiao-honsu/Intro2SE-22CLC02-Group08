const mongoose = require('mongoose');

const accessHistorySchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now },
    status: { type: String, enum: ['Logged In', 'Logged Out'], required: true }
});

module.exports = mongoose.model('AccessHistory', accessHistorySchema);