
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const interventiontSchema = new Schema({
    device: String,
    type: String,
    active: Boolean,
    registration_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('intervention', interventionSchema);