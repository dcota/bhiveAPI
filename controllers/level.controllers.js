const JWT = require('jsonwebtoken')
const CONFIG = require('../config/config');
const Level = require('../models/level.models');
const levelMessages = require('../messages/level.messages')
const bcrypt = require('bcryptjs')
const {
    validationResult
} = require('express-validator');
const { convert } = require('../init/functions');

//create new user level
exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors)
    let levelConv
    convert(req.body.level,(callback)=>{
        levelConv=callback
    })
    Level.findOne({ 'level': levelConv})
        .exec()
        .then((level) => {
            if (level) res.status(levelMessages.success.s3.http).send(levelMessages.success.s3)
            else {
                const newlevel = new Level({
                    level: levelConv,
                })
                newlevel.save()
                .then((level, error) => {
                    if (error) throw error
                    let message = levelMessages.success.s0
                    message.body = level
                    return res.status(message.http).send(message)
                })
                .catch((error) => {
                    let message = levelMessages.error.e1
                    message.body = error
                    return res.status(message.http).send(message)
                })
            }
        })
        .catch((error) => {
            let message = levelMessages.error.e1
            message.body = error
            return res.status(message.http).send(message)
        })
}

//get all levels
exports.get = ((req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors)
    Level.find()
        .exec()
        .then((levels, error) => {
            if (error) throw error
            if (levels == 0) return res.status(levelMessages.error.e0.http).send(levelMessages.error.e0)
            let message = levelMessages.success.s1
            message.body = levels
            return res.status(message.http).send(message)
        })
        .catch((error) => {
            console.log(error)
        })

})

//delete level
exports.delete = (req, res) => {
    const errors = validationResult(req).array()
    if (errors.length > 0)
        return res.status(406).send(errors)
    Level.deleteOne({ '_id': { $eq: req.params.id } })
        .exec()
        .then((level) => {
            if (level.deletedCount <= 0)
                return res.status(levelMessages.error.e0.http).send(levelMessages.error.e0)
            let message = levelMessages.success.s4
            return res.status(message.http).send(message)
        })
        .catch(() => {
            return res.status(levelMessages.error.e1.http).send(levelMessages.error.e1)
        })
}

exports.getone = (req, res) => {
    const errors = validationResult(req).array()
    if (errors.length > 0) {
        return res.status(406).send(errors)
    }
    Level.findOne({ '_id': { $eq: req.params.id } })
        .exec()
        .then((level) => {
            if (!level)
                return res.status(levelMessages.error.e0.http).send(levelMessages.error.e0)
            let message = levelMessages.success.s5
            const typ = {
                level: level.level,
            }
            message.body = typ
            return res.status(message.http).send(message)
        })
        .catch(() => {
            return res.status(levelMessages.error.e1.http).send(levelMessages.error.e1)
        })
}
