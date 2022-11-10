const mongoose = require('mongoose')
const Schema = mongoose.Schema

const apiarySchema = new Schema({
    user: String,
    address: String,
    Observations: String,
    registration_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('apiary', apiarySchema);