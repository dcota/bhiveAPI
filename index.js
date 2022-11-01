/*
MEIW - Desenvolvimento de Aplicações Móveis
Project: SafeHarbor (back-end)
Description: API main file
*/

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const host = process.env.HOST

//app.use(express.static('./photos'))

require('./init/db.js')(app, () => {
    require('./init/middleware')(app);
    require('./init/router')(app);
    app.listen(port, host, (error) => {
        if (error) throw error;
        console.log('Your app is listening on ' + port);
    });
});