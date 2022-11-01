const express = require('express')

module.exports = (app) => {
    const upload = require('../init/uploads')
        //app.use('/img', express.static('img'))
        //app.use('/offer', upload.array('img'), require('../routes/offer.routes'))
        //app.use('/request', require('../routes/request.routes'))
    app.use('/user', upload.single('img'), require('../routes/user.routes'))
    app.use('/auth', require('../routes/auth.routes'))
        //app.use('/notification', require('../routes/notification.routes'))
}