var mongoose = require("mongoose");

var xuatChieuSchema = new mongoose.Schema({
    movieID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movie"
    },
    date: {
        type: String,
    },
    time: {
        type: String,
    },
    seat: {
        type: Number,
        default: 52
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = new mongoose.model('xuatChieu', xuatChieuSchema);