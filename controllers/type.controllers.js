const TYPE = require('../models/type.models');
const typeMessages = require('../messages/type.messages')
const {
    validationResult
} = require('express-validator');
const { convert } = require('../init/functions');

//create new user type
exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors)
    let typeConv
    convert(req.body.type, (callback) => {
        typeConv = callback
    })
    TYPE.findOne({ 'type': typeConv })
        .exec()
        .then((type) => {
            if (type) res.status(typeMessages.success.s3.http).send(typeMessages.success.s3)
            else {
                const newtype = new TYPE({
                    type: typeConv,
                })
                newtype.save()
                    .then((type, error) => {
                        if (error) throw error
                        let message = typeMessages.success.s0
                        message.body = type
                        return res.status(message.http).send(message)
                    })
                    .catch((error) => {
                        let message = typeMessages.error.e1
                        message.body = error
                        return res.status(message.http).send(message)
                    })
            }
        })
        .catch((error) => {
            let message = typeMessages.error.e1
            message.body = error
            return res.status(message.http).send(message)
        })
}

//get all types
exports.get = ((req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors)
    TYPE.find()
        .exec()
        .then((types, error) => {
            if (error) throw error
            if (types == 0) return res.status(typeMessages.error.e0.http).send(typeMessages.error.e0)
            let message = typeMessages.success.s1
            message.body = types
            return res.status(message.http).send(message)
        })
        .catch((error) => {
            console.log(error)
        })

})

//delete type
exports.delete = (req, res) => {
    const errors = validationResult(req).array()
    if (errors.length > 0)
        return res.status(406).send(errors)
    TYPE.deleteOne({ '_id': { $eq: req.params.id } })
        .exec()
        .then((type) => {
            if (type.deletedCount <= 0)
                return res.status(typeMessages.error.e0.http).send(typeMessages.error.e0)
            let message = typeMessages.success.s4
            return res.status(message.http).send(message)
        })
        .catch(() => {
            return res.status(typeMessages.error.e1.http).send(typeMessages.error.e1)
        })
}

exports.getone = (req, res) => {
    const errors = validationResult(req).array()
    if (errors.length > 0) {
        return res.status(406).send(errors)
    }
    TYPE.findOne({ '_id': { $eq: req.params.id } })
        .exec()
        .then((type) => {
            if (!type)
                return res.status(typeMessages.error.e0.http).send(typeMessages.error.e0)
            let message = typeMessages.success.s5
            const typ = {
                type: type.type,
            }
            message.body = typ
            return res.status(message.http).send(message)
        })
        .catch(() => {
            return res.status(typeMessages.error.e1.http).send(typeMessages.error.e1)
        })
}