const express = require('express')
let router = express.Router()

const apiaryController = require('../controllers/apiary.controllers')
const authController = require('../controllers/auth.controllers')

const {
    body,
    param,
    sanitizeBody,
} = require('express-validator')

const CONFIG = require('../config/config')

router.route('/')
    .post(
        [body('user').isMongoId(),
            body('address').isString(),
            body('location').isString(),
            body('observations').isString()
        ], apiaryController.create)

.get(apiaryController.get) //authController.checkAuth

router.route('/:id')
    .get([param('id').isMongoId()], apiaryController.getone) //authController.checkAuth
    .delete([param('id').isMongoId()], apiaryController.delete) //authController.checkAuth

module.exports = router