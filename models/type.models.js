
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const typeSchema = new Schema({
    type: String,
    typename: String,
    registration_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('type', typeSchema);