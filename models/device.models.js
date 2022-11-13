const mongoose = require('mongoose')
const Schema = mongoose.Schema

const deviceSchema = new Schema({
    user: String,
    deviceref: String,
    apiary: String,
    registered: Boolean,
    assigned: Boolean,
    location: {
        lat: Number,
        lon: Number
    },
    data: [{
        ti: Number,
        to: Number,
        hi: Number,
        ho: Number,
        w: Number,
        s: Number,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    registration_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('device', deviceSchema);