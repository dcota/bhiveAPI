const mongoose = require('mongoose')
const Schema = mongoose.Schema

const apiarySchema = new Schema({
    user: { type: String, required: true },
    address: String,
    location: String,
    observations: String,
    registration_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('apiary', apiarySchema);