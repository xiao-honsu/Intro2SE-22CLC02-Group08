const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    registrationDate: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    status: { type: String, enum: ['Active', 'Banned'], default: 'Active' },
    avatar: { type: String },
    totalSoldProducts: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);