const JWT = require('jsonwebtoken')
const CONFIG = require('../config/config');
const USER = require('../models/user.models');
const userMessages = require('../messages/user.messages')
const bcrypt = require('bcryptjs')
const {
    validationResult
} = require('express-validator')

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors)
    USER.findOne({ 'email': req.body.email })
        .exec()
        .then((user) => {
            if (user) res.status(userMessages.success.s3.http).send(userMessages.success.s3)
            else {
                const newuser = new User({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    nif: req.body.nif,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    type: req.body.type,
                    bdate: req.body.bdate,
                    devices: [],
                    auth: {
                        username: req.body.username,
                        password: req.body.password
                    }
                })
                if (req.file) {
                    //let finalPath = 'https://safeharbor.duartecota.com/' + req.file.path.replace(/\\/, '/')
                    let finalPath = 'http://localhost:3000' + req.file.path.replace(/\\/, '/')
                    newuser.img = finalPath
                } else {
                    newuser.img = ""
                }
                newuser.save()
                    .then((user, error) => {
                        if (error) throw error
                        let payload = {
                            pk: user.auth.public_key
                        }
                        let options = {
                            expiresIn: CONFIG.auth.expiration_time,
                            issuer: CONFIG.auth.issuer
                        }
                        let token = JWT.sign(payload, user.auth.private_key, options)
                        let message = userMessages.success.s0
                        message.body = user
                        return res.header('location', '/users/' + user._id).header('Authorization', token).status(message.http).send(message)
                    })
            }
        })
        .catch((error) => {
            console.log(error)
        })
}

exports.get = ((req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors)
    USER.find()
        .exec()
        .then((user, error) => {
            console.log(user)
            if (error) throw error
            if (user == 0) return res.status(userMessages.error.e0.http).send(userMessages.error.e0)
            let message = userMessages.success.s1
            message.body = user
            return res.status(message.http).send(message)
        })
        .catch((error) => {
            console.log(error)
        })

})

/*exports.put = (req, res) => {
    const errors = validationResult(req).array()
    if (errors.length > 0) {
        return res.status(406).send(errors)
    }
    USER.findOneAndUpdate({ '_id': { $eq: req.params.id } }, { $set: { 'accepted': true } }, { new: true })
        .exec()
        .then((user, error) => {
            if (error) throw error
            if (!user) return res.status(userMessages.error.e0.http).send(userMessages.error.e0)
            let message = userMessages.success.s1
            message.body = user
            return res.status(message.http).send(message)
        })
        .catch((error) => {
            return res.status(userMessages.error.e1.http).send(userMessages.error.e1)
        })
}*/

exports.update = (req, res) => {
    const errors = validationResult(req).array()
    if (errors.length > 0) {
        return res.status(406).send(errors)
    }
    //teste
    let finalPath;
    if (req.file) {
        finalPath = 'https://safeharbor.duartecota.com/' + req.file.path.replace(/\\/, '/')
        USER.findOneAndUpdate({ '_id': { $eq: req.params.id } }, {
                $set: {
                    'firstname': req.body.firstname,
                    'lastname': req.body.lastname,
                    'nif': req.body.country,
                    'bdate': req.body.bdate,
                    'mobile': req.body.mobile,
                    'email': req.body.email,
                    'img': finalPath
                }
            }, { new: true })
            .exec()
            .then((user) => {
                if (!user)
                    return res.status(userMessages.error.e0.http).send(userMessages.error.e0)
                let message = userMessages.success.s1
                message.body = user
                return res.status(message.http).send(message)
            })
            .catch(() => {
                return res.status(userMessages.error.e1.http).send(userMessages.error.e1)
            })
    } else {
        USER.findOneAndUpdate({ '_id': { $eq: req.params.id } }, {
                $set: {
                    'firstname': req.body.firstname,
                    'lastname': req.body.lastname,
                    'nif': req.body.country,
                    'bdate': req.body.bdate,
                    'mobile': req.body.mobile,
                    'email': req.body.email,
                }
            }, { new: true })
            .exec()
            .then((user) => {
                if (!user)
                    return res.status(userMessages.error.e0.http).send(userMessages.error.e0)
                let message = userMessages.success.s1
                message.body = user
                return res.status(message.http).send(message)
            })
            .catch(() => {
                return res.status(userMessages.error.e1.http).send(userMessages.error.e1)
            })
    }

}

exports.delete = (req, res) => {
    const errors = validationResult(req).array()
    if (errors.length > 0)
        return res.status(406).send(errors)
    USER.deleteOne({ '_id': { $eq: req.params.id } })
        .exec()
        .then((user) => {
            if (user.deletedCount <= 0)
                return res.status(userMessages.error.e0.http).send(userMessages.error.e0)
            let message = userMessages.success.s4
            return res.status(message.http).send(message)
        })
        .catch(() => {
            return res.status(userMessages.error.e1.http).send(userMessages.error.e1)
        })
}

exports.getone = (req, res) => {
    const errors = validationResult(req).array()
    if (errors.length > 0) {
        return res.status(406).send(errors)
    }
    USER.findOne({ '_id': { $eq: req.params.id } })
        .exec()
        .then((user) => {
            if (!user)
                return res.status(userMessages.error.e0.http).send(userMessages.error.e0)
            let message = userMessages.success.s5
            const usr = {
                firstname: user.firstname,
                lastname: user.lastname,
                nif: user.nif,
                email: user.email,
                mobile: user.mobile,
                type: user.type,
                bdate: user.bdate,
                img: user.img,
                registration_date: user.registration_date
            }
            message.body = usr
            return res.status(message.http).send(message)
        })
        .catch(() => {
            return res.status(userMessages.error.e1.http).send(userMessages.error.e1)
        })
}

exports.setNewPass = (req, res) => {
    const errors = validationResult(req).array()
    if (errors.length > 0) {
        return res.status(406).send(errors)
    }
    let newpass = bcrypt.hashSync(escape(req.body.newpass), bcrypt.genSaltSync(2))
    USER.findOneAndUpdate({ '_id': { $eq: req.params.id } }, {
            $set: {
                'auth.password': newpass
            }
        }, { new: true })
        .exec()
        .then((user) => {
            console.log(user.password)
            if (!user)
                return res.status(userMessages.error.e0.http).send(userMessages.error.e0)
            let message = userMessages.success.s7
            message.body = user
            return res.status(message.http).send(message)
        })
        .catch(() => {
            return res.status(userMessages.error.e1.http).send(userMessages.error.e1)
        })
}