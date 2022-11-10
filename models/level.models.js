const mongoose = require('mongoose')
const Schema = mongoose.Schema

const levelSchema = new Schema({
    level: String,
    registration_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('level', levelSchema);