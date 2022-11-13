const express = require('express')
let router = express.Router()

const deviceController = require('../controllers/device.controllers')
const authController = require('../controllers/auth.controllers')

const {
    body,
    param,
    sanitizeBody,
} = require('express-validator')

const CONFIG = require('../config/config')

router.route('/')
    .post(
        [body('deviceref').isString()], deviceController.create)

.get(deviceController.get) //authController.checkAuth

router.route('/:id')
    .get([param('id').isMongoId()], deviceController.getone) //authController.checkAuth
    //.put([param('id').isMongoId()], deviceController.put) //authController.checkAuth
    .delete([param('id').isMongoId()], deviceController.delete) //authController.checkAuth
    .patch([param('id').isMongoId()], deviceController.assign) //authController.checkAuth

router.route('/update/:id')
    .post([param('id').isMongoId(),
        body('ti').isNumeric(),
        body('to').isNumeric(),
        body('hi').isNumeric(),
        body('ho').isNumeric(),
        body('w').isNumeric(),
        body('s').isNumeric(),
        body('lat').isNumeric(),
        body('lon').isNumeric(),
    ], deviceController.updateData)

router.route('/apiary/:id')
    .get([param('id').isMongoId()], deviceController.getLatestDataAllDevices) ///authController.checkAuth

module.exports = router