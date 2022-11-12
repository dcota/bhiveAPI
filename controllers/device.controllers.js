const DEVICE = require('../models/device.models');
const deviceMessages = require('../messages/device.messages')
const {
    validationResult
} = require('express-validator')

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors)
    DEVICE.findOne({ 'deviceref': req.body.deviceref })
        .exec()
        .then((device) => {
            if (device) res.status(deviceMessages.success.s3.http).send(deviceMessages.success.s3)
            else {
                const newdevice = new DEVICE({
                    apiary: null,
                    deviceref: req.body.deviceref,
                    registered: true,
                    assigned: false,
                    location: {
                        lat: 0.0,
                        lon: 0.0
                    },
                    data: []
                })
                newdevice.save()
                    .then((device, error) => {
                        if (error) throw error
                        let message = deviceMessages.success.s0
                        message.body = device
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

exports.get = ((req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors)
    DEVICE.find()
        .exec()
        .then((device, error) => {
            console.log(device)
            if (error) throw error
            if (device == 0) return res.status(deviceMessages.error.e0.http).send(deviceMessages.error.e0)
            let message = deviceMessages.success.s1
            message.body = device
            return res.status(message.http).send(message)
        })
        .catch((error) => {
            console.log(error)
        })

})


exports.getLatestDataAllDevices = ((req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors)
    DEVICE.find({ 'apiary': req.params.id })
        .exec()
        .then((devices, error) => {
            if (error) throw error
            if (devices == 0) return res.status(deviceMessages.error.e0.http).send(deviceMessages.error.e0)
            let message = deviceMessages.success.s1
            let resArray = []
            devices.forEach(element => {
                let instance = {
                    lat: element.location.lat,
                    lon: element.location.lon,
                    data: element.data[element.data.length - 1]
                }
                arr.push(instance)
            });

            message.body = resArray
            return res.status(message.http).send(message)
        })
        .catch((error) => {
            console.log(error)
        })

})

exports.assign = (req, res) => {
    const errors = validationResult(req).array()
    if (errors.length > 0) {
        return res.status(406).send(errors)
    }
    DEVICE.findOne({ '_id': { $eq: req.params.id } })
        .exec()
        .then((device) => {
            if (!device)
                return res.status(deviceMessages.error.e0.http).send(deviceMessages.error.e0)
            if (device.apiary == null) {
                DEVICE.findOneAndUpdate({ '_id': { $eq: req.params.id } }, {
                        $set: {
                            'apiary': req.body.apiary,
                            'assigned': true,
                        }
                    }, { new: true })
                    .exec()
                    .then((device) => {
                        if (!device)
                            return res.status(deviceMessages.error.e0.http).send(deviceMessages.error.e0)
                        let message = deviceMessages.success.s6
                        message.body = device
                        return res.status(message.http).send(message)
                    })
                    .catch(() => {
                        return res.status(deviceMessages.error.e1.http).send(deviceMessages.error.e1)
                    })
            } else {
                let message = deviceMessages.error.e2
                return res.status(message.http).send(message)
            }
        })

}

exports.updateData = (req, res) => {
    const errors = validationResult(req).array()
    if (errors.length > 0) {
        return res.status(406).send(errors)
    }
    DEVICE.findOne({ '_id': { $eq: req.params.id } })
        .exec()
        .then((device) => {
            if (!device)
                return res.status(deviceMessages.error.e0.http).send(deviceMessages.error.e0)
            let newData = {
                tempIn: req.body.tempIn,
                tempOut: req.body.tempOut,
                humIn: req.body.humIn,
                humOut: req.body.humOut,
                weight: req.body.weight,
                soundLevel: req.body.soundLevel,
                date: Date.now()
            }
            console.log(newData)
            DEVICE.findOneAndUpdate({ '_id': { $eq: req.params.id } }, {
                    $set: {
                        'location.lat': req.body.lat,
                        'location.lon': req.body.lon,
                    },
                    $push: { 'data': newData }
                }, { new: true })
                .exec()
                .then((device) => {
                    if (!device)
                        return res.status(deviceMessages.error.e0.http).send(deviceMessages.error.e0)
                    let message = deviceMessages.success.s6
                    message.body = device
                    return res.status(message.http).send(message)
                })
                .catch(() => {
                    return res.status(deviceMessages.error.e1.http).send(deviceMessages.error.e1)
                })
        })

}

exports.delete = (req, res) => {
    const errors = validationResult(req).array()
    if (errors.length > 0)
        return res.status(406).send(errors)
    DEVICE.deleteOne({ '_id': { $eq: req.params.id } })
        .exec()
        .then((device) => {
            if (device.deletedCount <= 0)
                return res.status(deviceMessages.error.e0.http).send(deviceMessages.error.e0)
            let message = deviceMessages.success.s4
            return res.status(message.http).send(message)
        })
        .catch(() => {
            return res.status(deviceMessages.error.e1.http).send(deviceMessages.error.e1)
        })
}

exports.getone = (req, res) => {
    const errors = validationResult(req).array()
    if (errors.length > 0) {
        return res.status(406).send(errors)
    }
    DEVICE.findOne({ '_id': { $eq: req.params.id } })
        .exec()
        .then((device) => {
            if (!device)
                return res.status(deviceMessages.error.e0.http).send(deviceMessages.error.e0)
            let message = deviceMessages.success.s5
            console.log(device)
            const dev = {
                apiary: null,
                deviceref: device.deviceref,
                registered: device.registered,
                assigned: device.assigned,
                location: {
                    lat: device.location.lat,
                    lon: device.location.lon
                },
                data: device.data,
                registration_date: device.registration_date.getFullYear() + '-' + (parseInt(device.registration_date.getMonth()) + 1) + '-' + device.registration_date.getDate()
            }
            message.body = dev
            return res.status(message.http).send(message)
        })
        .catch(() => {
            return res.status(deviceMessages.error.e1.http).send(deviceMessages.error.e1)
        })
}