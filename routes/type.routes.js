const express = require('express')
let router = express.Router()

const typeController = require('../controllers/type.controllers')
const authController = require('../controllers/auth.controllers')

const {
    body,
    param,
    sanitizeBody,
} = require('express-validator')

const CONFIG = require('../config/config')

router.route('/')
    .post(
        [body('type').isString(),
        ], typeController.create)

.get(typeController.get) //authController.checkAuth

router.route('/:id')
    .get([param('id').isMongoId()], typeController.getone) //authController.checkAuth
    .delete([param('id').isMongoId()], typeController.delete) //authController.checkAuth

module.exports = router