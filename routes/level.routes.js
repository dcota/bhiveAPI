const express = require('express')
let router = express.Router()

const levelController = require('../controllers/level.controllers')
const authController = require('../controllers/auth.controllers')

const {
    body,
    param,
    sanitizeBody,
} = require('express-validator')

const CONFIG = require('../config/config')

router.route('/')
    .post(
        [body('level').isString(),
        ], levelController.create)

.get(levelController.get) //authController.checkAuth

router.route('/:id')
    .get([param('id').isMongoId()], levelController.getone) //authController.checkAuth
    .delete([param('id').isMongoId()], levelController.delete) //authController.checkAuth

module.exports = router