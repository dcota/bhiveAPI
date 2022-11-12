const express = require('express')

module.exports = (app) => {
    const upload = require('../init/uploads')
        //app.use('/img', express.static('img'))
        //app.use('/offer', upload.array('img'), require('../routes/offer.routes'))
    app.use('/type', require('../routes/type.routes'))
    app.use('/evtype', require('../routes/eventType.routes'))
    app.use('/apiary', require('../routes/apiary.routes'))
    app.use('/device', require('../routes/device.routes'))
    app.use('/level', require('../routes/level.routes'))
    app.use('/user', upload.single('img'), require('../routes/user.routes'))
    app.use('/auth', require('../routes/auth.routes'))
        //app.use('/notification', require('../routes/notification.routes'))
}