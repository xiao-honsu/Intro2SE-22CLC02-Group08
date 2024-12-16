const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryID: { type: mongoose.Schema.Types.ObjectId, auto: true },
    categoryName: { type: String, required: true },
    description: { type: String }
});

module.exports = mongoose.model('Category', categorySchema);