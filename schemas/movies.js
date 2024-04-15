var mongoose = require("mongoose");

var movieSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    image: {
        type: String
    },
    imdbPoint: {
        type: String
    },
    year: {
        type: String
    },
    timeLength:{
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = new mongoose.model('movie', movieSchema);