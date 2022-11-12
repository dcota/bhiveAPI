const JWT = require('jsonwebtoken')
const CONFIG = require('../config/config');
const APIARY = require('../models/apiary.models');
const apiaryMessages = require('../messages/apiary.messages')
const bcrypt = require('bcryptjs')
const {
    validationResult
} = require('express-validator');
const { convert } = require('../init/functions');

//create new user apiary
exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors)
        /*let apiaryConv
        convert(req.body.apiary, (callback) => {
            apiaryConv = callback
        })
        APIARY.findOne({ 'apiary': apiaryConv })
            .exec()
            .then((apiary) => {
                if (apiary) res.status(apiaryMessages.success.s3.http).send(apiaryMessages.success.s3)
                else {*/
    const newapiary = new APIARY({
        user: req.body.user,
        address: req.body.address,
        location: req.body.location,
        observations: req.body.observations,
    })
    newapiary.save()
        .then((apiary, error) => {
            if (error) throw error
            let message = apiaryMessages.success.s0
            message.body = apiary
            return res.status(message.http).send(message)
        })
        .catch((error) => {
            let message = apiaryMessages.error.e1
            message.body = error
            return res.status(message.http).send(message)
        })
        /* }
        })
        .catch((error) => {
            let message = apiaryMessages.error.e1
            message.body = error
            return res.status(message.http).send(message)
        })*/
}

//get all apiarys
exports.get = ((req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors)
    APIARY.find()
        .exec()
        .then((apiarys, error) => {
            if (error) throw error
            if (apiarys == 0) return res.status(apiaryMessages.error.e0.http).send(apiaryMessages.error.e0)
            let message = apiaryMessages.success.s1
            message.body = apiarys
            return res.status(message.http).send(message)
        })
        .catch((error) => {
            console.log(error)
        })

})

//delete apiary
exports.delete = (req, res) => {
    const errors = validationResult(req).array()
    if (errors.length > 0)
        return res.status(406).send(errors)
    APIARY.deleteOne({ '_id': { $eq: req.params.id } })
        .exec()
        .then((apiary) => {
            if (apiary.deletedCount <= 0)
                return res.status(apiaryMessages.error.e0.http).send(apiaryMessages.error.e0)
            let message = apiaryMessages.success.s4
            return res.status(message.http).send(message)
        })
        .catch(() => {
            return res.status(apiaryMessages.error.e1.http).send(apiaryMessages.error.e1)
        })
}

exports.getone = (req, res) => {
    const errors = validationResult(req).array()
    if (errors.length > 0) {
        return res.status(406).send(errors)
    }
    APIARY.findOne({ '_id': { $eq: req.params.id } })
        .exec()
        .then((apiary) => {
            if (!apiary)
                return res.status(apiaryMessages.error.e0.http).send(apiaryMessages.error.e0)
            let message = apiaryMessages.success.s5
            const typ = {
                user: apiary.user,
                address: apiary.address,
                location: apiary.location,
                observations: apiary.observations,
                registration_date: apiary.registration_date.getFullYear() + '-' + (parseInt(apiary.registration_date.getMonth()) + 1) + '-' + apiary.registration_date.getDate()
            }
            message.body = typ
            return res.status(message.http).send(message)
        })
        .catch(() => {
            return res.status(apiaryMessages.error.e1.http).send(apiaryMessages.error.e1)
        })
}