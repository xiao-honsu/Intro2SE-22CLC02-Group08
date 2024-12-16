const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema({
    statID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    date: { type: Date, required: true },
    totalUsers: { type: Number, required: true },
    totalVisitToday: { type: Number, required: true },
    currentVisitors: { type: Number, required: true }
});

module.exports = mongoose.model('Statistics', statisticsSchema);