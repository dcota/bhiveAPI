
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const interventiontSchema = new Schema({
    user: String,
    apiary: String,
    device: String,
    description: String,
    registration_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('intervention', interventionSchema);