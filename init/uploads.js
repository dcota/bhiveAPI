//const path = require('path')
const multer = require('multer')
const fs = require('fs')

const folder = Date.now()

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const path = 'img/'
        fs.mkdir(path, (error) => {
            if (error) console.log(error)
        })
        cb(null, path)
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname.split(' ').join(''))
    }
})

var upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
            callback(null, true)
        } else callback(null, false)
    },
    limits: {
        fileSize: 1000000
    }
})

module.exports = upload