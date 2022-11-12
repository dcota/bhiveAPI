const express = require('express')
let router = express.Router()

const eventController = require('../controllers/event.controllers')
const authController = require('../controllers/auth.controllers')

const {
    body,
    param,
    sanitizeBody,
} = require('express-validator')

router.route('/')
    .post(
        [body('device').isMongoId(),
            body('type').isString(),
        ], eventController.create)

.get(eventController.get) //authController.checkAuth

router.route('/:id')
    //.get([param('id').isMongoId()], deviceController.getone) //authController.checkAuth
    //.put([param('id').isMongoId()], deviceController.put) //authController.checkAuth
    //.delete([param('id').isMongoId()], deviceController.delete) //authController.checkAuth
    .patch([param('id').isMongoId()], eventController.changeStatus) //authController.checkAuth*/

/*router.route('/update/:id')
    .patch([param('id').isMongoId(),
        body('tempIn').isNumeric(),
        body('tempOut').isNumeric(),
        body('humIn').isNumeric(),
        body('humOut').isNumeric(),
        body('weight').isNumeric(),
        body('soundLevel').isNumeric(),
        body('lat').isNumeric(),
        body('lon').isNumeric(),
    ], deviceController.updateData)*/

/*router.route('/apiary/:id')
    .get([param('id').isMongoId()], deviceController.getLatestDataAllDevices) ///authController.checkAuth*/

module.exports = router