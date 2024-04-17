var mongoose = require("mongoose");

var billSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    xuatChieuId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"xuatChieu",
    },
    seat: {
        type: Number,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = new mongoose.model('bill', billSchema);