require('dotenv').config({ path: '../private/.env' })
const credentials = require('../private/credentials')

module.exports = {
    mongodb: {
        uri: 'mongodb+srv://' + credentials.auth.username + ':' + credentials.auth.password + '@cluster0.ppscmeu.mongodb.net/?retryWrites=true&w=majority',
        collections: {
            users: 'users',
            apiaries: 'apiaries',
            hives: 'hives',
            data: 'data'
        }
    },
    auth: {
        expiration_time: 15000, //in seconds
        issuer: 'bhive'
    },
    sanitize: {
        alphabeth: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzŠŒŽšœžŸ¥µÀÁÂÃÄÅÆÇÈÉÊËẼÌÍÎÏĨÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëẽìíîïĩðñòóôõöøùúûüýÿ\\ ',
        numerical: '0123456789'
    },
    email: {
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "392547575f34da",
            pass: "53a52774ec5af4"
        }
    },
    onesignal: {
        app_id: '00df04ad-9a2a-4e6f-86bf-798f859e9dab',
        api_key: 'NTc1OWQyMzMtNTMzMC00MDA3LTkxNDEtNTRjYjFiZDg2OTAy'
    }
}