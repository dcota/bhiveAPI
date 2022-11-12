const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventTypeSchema = new Schema({
    type: String,
    typename: String,
    registration_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('eventType', eventTypeSchema);