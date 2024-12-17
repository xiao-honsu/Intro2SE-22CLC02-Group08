const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ["buyer", "seller", "guest"], default: "guest" },
    registrationDate: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    status: { type: String, enum: ['Active', 'Banned'], default: 'Active' },
    avatar: { type: String },
    totalSoldProducts: { type: Number, default: 0 },
    bank: { type: String, default: "" }, 
    bankAccount: { type: String, default: "" },
});

module.exports = mongoose.model('User', userSchema);