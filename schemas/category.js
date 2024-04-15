var mongoose = require("mongoose");

var categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = new mongoose.model('category', categorySchema);