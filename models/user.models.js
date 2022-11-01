/*
MEIW - Desenvolvimento de Aplicações Móveis
Project: SafeHarbor (back-end)
Description: User model
*/

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    nif: Number,
    email: String,
    mobile: Number,
    type: String,
    bdate: String,
    devices: [String],
    img: String,
    auth: {
        username: {
            type: String,
            unique: true
        },
        password: String,
        public_key: String,
        private_key: String
    },
    registration_date: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', function(callback) {
    this.auth.public_key = Math.random().toString(36).substring(2) + this._id
    this.auth.private_key = Math.random().toString(36).substring(2) + this._id
    this.auth.password = bcrypt.hashSync(escape(this.auth.password), bcrypt.genSaltSync(2))
    callback()
})

module.exports = mongoose.model('user', userSchema);