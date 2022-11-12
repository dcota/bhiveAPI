const express = require('express')
let router = express.Router()

const userController = require('../controllers/user.controllers')
const authController = require('../controllers/auth.controllers')

const {
    body,
    param,
    sanitizeBody,
} = require('express-validator')

const CONFIG = require('../config/config')

router.route('/')
    .post(
        [body('firstname').isString(),
            body('lastname').isString(),
            body('email').isString(),
            body('nif').isNumeric(),
            body('mobile').isNumeric(),
            body('type').isString(),
            body('bdate').isString(),
            body('username').isAlphanumeric(),
            body('password').isString(),
            body('firstname').whitelist(CONFIG.sanitize.alphabeth), //sanitizebody
            body('lastname').whitelist(CONFIG.sanitize.alphabeth),
        ], userController.create)

.get(userController.get) //authController.checkAuth

router.route('/:id')
    .get([param('id').isMongoId()], userController.getone) //authController.checkAuth
    //.put([param('id').isMongoId()], userController.put) //authController.checkAuth
    .delete([param('id').isMongoId()], userController.delete) //authController.checkAuth
    .patch([param('id').isMongoId()], userController.update) //authController.checkAuth

/*router.route('/report/:id')
    .patch([param('id').isMongoId()], userController.report)*/

router.route('/changepass/:id')
    .patch([param('id').isMongoId(), body('newpass').isString()], userController.setNewPass) ///authController.checkAuth

module.exports = router