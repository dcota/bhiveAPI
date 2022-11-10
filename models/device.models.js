const mongoose = require('mongoose')
const Schema = mongoose.Schema

const deviceSchema = new Schema({
    user: String,
    apiary: String,
    registered: Boolean,
    location: {
        lat: Number,
        lon: Number
    },
    data: [
        {
            tempIn: Number, 
            tempOut: Number,
            humIn: Number,
            humOut: Number,
            weight: Number,
            soundLevel: Number,
            date: {
                type: Date,
                default: Date.now
            }
        },

    ],
    registration_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('device', deviceSchema);