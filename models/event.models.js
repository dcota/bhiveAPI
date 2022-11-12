const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    device: String,
    type: String,
    active: Boolean,
    registration_date: {
        type: Date,
        default: Date.now
    },
    res_date: {
        type: Date,
        default: null
    }
})

module.exports = mongoose.model('event', eventSchema);