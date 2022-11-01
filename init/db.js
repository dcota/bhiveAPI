/*
Mestrado em Engenharia Informática e Tecnologia Web
Arquitetura e Padrões de Software
Tópico 4 - semana 2/3 (padrões de criação)
Author: Duarte Cota
Description: MySQL connection using Singleton pattern
*/

const CONFIG = require('../config/config');


module.exports = (app, callback) => {
    const mongoose = require('mongoose');
    let settings = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    global.mongoConnection = mongoose.connect(CONFIG.mongodb.uri, settings, (error) => {
        if (error) throw error;
        console.log('---Connected to DB');
        return callback();
    })

}