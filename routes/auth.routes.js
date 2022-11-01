const express = require('express')
let router = express.Router()

const {
    body
} = require('express-validator')

const authController = require('../controllers/auth.controllers')

router.route('/')
    .post([
        body('username').isAlphanumeric(),
        body('password').isString(),
        body('device').isString()
    ], authController.login)

.get(authController.checkAuth, authController.getInfo)

module.exports = router