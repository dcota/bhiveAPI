const EVENT = require('../models/event.models');
const eventMessages = require('../messages/event.messages')
const {
    validationResult
} = require('express-validator')

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors)
    EVENT.findOne({ 'device': req.body.device }, { 'type': req.body.type }, { 'active': 'true' })
        .exec()
        .then((event) => {
            if (event) res.status(eventMessages.success.s3.http).send(eventMessages.success.s3)
            else {
                const newevent = new EVENT({
                    device: req.body.device,
                    type: req.body.type,
                    active: true,
                    res_date: null
                })
                newevent.save()
                    .then((event, error) => {
                        if (error) throw error
                        let message = eventMessages.success.s0
                        message.body = event
                        return res.status(message.http).send(message)
                    })
                    .catch((error) => {
                        let message = eventMessages.error.e1
                        message.body = error
                        return res.status(message.http).send(message)
                    })
            }
        })
        .catch((error) => {
            let message = eventMessages.error.e1
            message.body = error
            return res.status(message.http).send(message)
        })
}

exports.get = ((req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors)
    EVENT.find()
        .exec()
        .then((events, error) => {
            if (error) throw error
            if (events == 0) return res.status(eventMessages.error.e0.http).send(eventMessages.error.e0)
            let message = eventMessages.success.s1
            message.body = events
            return res.status(message.http).send(message)
        })
        .catch((error) => {
            console.log(error)
        })

})

exports.changeStatus = (req, res) => {
    const errors = validationResult(req).array()
    if (errors.length > 0) {
        return res.status(406).send(errors)
    }
    EVENT.findOneAndUpdate({ 'device': { $eq: req.params.id } }, {
            $set: {
                'active': false,
                'res_date': Date.now(),
            }
        }, { new: true })
        .exec()
        .then((event) => {
            if (!event)
                return res.status(eventMessages.error.e0.http).send(eventMessages.error.e0)
            let message = eventMessages.success.s6
            const evn = {
                device: event.device,
                active: event.active,
                registration_date: event.registration_date,
                res_date: event.res_date
            }
            message.body = evn
            return res.status(message.http).send(message)
        })
        .catch(() => {
            return res.status(eventMessages.error.e1.http).send(eventMessages.error.e1)
        })
}


/*exports.getLatestDataAllDevices = ((req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors)
    DEVICE.find({ 'apiary': req.params.id })
        .exec()
        .then((devices, error) => {
            if (error) throw error
            if (devices == 0) return res.status(eventMessages.error.e0.http).send(eventMessages.error.e0)
            let message = eventMessages.success.s1
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

})*/

/*exports.assign = (req, res) => {
    const errors = validationResult(req).array()
    if (errors.length > 0) {
        return res.status(406).send(errors)
    }
    DEVICE.findOne({ '_id': { $eq: req.params.id } })
        .exec()
        .then((device) => {
            if (!device)
                return res.status(eventMessages.error.e0.http).send(eventMessages.error.e0)
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
                            return res.status(eventMessages.error.e0.http).send(eventMessages.error.e0)
                        let message = eventMessages.success.s6
                        message.body = device
                        return res.status(message.http).send(message)
                    })
                    .catch(() => {
                        return res.status(eventMessages.error.e1.http).send(eventMessages.error.e1)
                    })
            } else {
                let message = eventMessages.error.e2
                return res.status(message.http).send(message)
            }
        })

}*/

/*exports.updateData = (req, res) => {
    const errors = validationResult(req).array()
    if (errors.length > 0) {
        return res.status(406).send(errors)
    }
    DEVICE.findOne({ '_id': { $eq: req.params.id } })
        .exec()
        .then((device) => {
            if (!device)
                return res.status(eventMessages.error.e0.http).send(eventMessages.error.e0)
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
                        return res.status(eventMessages.error.e0.http).send(eventMessages.error.e0)
                    let message = eventMessages.success.s6
                    message.body = device
                    return res.status(message.http).send(message)
                })
                .catch(() => {
                    return res.status(eventMessages.error.e1.http).send(eventMessages.error.e1)
                })
        })

}*/

exports.delete = (req, res) => {
    const errors = validationResult(req).array()
    if (errors.length > 0)
        return res.status(406).send(errors)
    EVENT.deleteOne({ '_id': { $eq: req.params.id } })
        .exec()
        .then((event) => {
            if (event.deletedCount <= 0)
                return res.status(eventMessages.error.e0.http).send(eventMessages.error.e0)
            let message = eventMessages.success.s4
            return res.status(message.http).send(message)
        })
        .catch(() => {
            return res.status(eventMessages.error.e1.http).send(eventMessages.error.e1)
        })
}

exports.getone = (req, res) => {
    const errors = validationResult(req).array()
    if (errors.length > 0) {
        return res.status(406).send(errors)
    }
    EVENT.findOne({ '_id': { $eq: req.params.id } })
        .exec()
        .then((event) => {
            if (!event)
                return res.status(eventMessages.error.e0.http).send(eventMessages.error.e0)
            let message = eventMessages.success.s5
            const evn = {
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
            return res.status(eventMessages.error.e1.http).send(eventMessages.error.e1)
        })
}