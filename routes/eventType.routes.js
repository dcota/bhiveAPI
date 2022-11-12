const express = require('express')
let router = express.Router()

const eventTypeController = require('../controllers/eventType.controllers')
const authController = require('../controllers/auth.controllers')

const {
    body,
    param,
    sanitizeBody,
} = require('express-validator')

const CONFIG = require('../config/config')

router.route('/')
    .post(
        [body('type').isString(), ], eventTypeController.create)

.get(eventTypeController.get) //authController.checkAuth

router.route('/:id')
    .get([param('id').isMongoId()], eventTypeController.getone) //authController.checkAuth
    .delete([param('id').isMongoId()], eventTypeController.delete) //authController.checkAuth

module.exports = router