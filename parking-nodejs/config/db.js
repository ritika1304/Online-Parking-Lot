const moongoose = require('mongoose')
moongoose.connect('mongodb://127.0.0.1:27017/parkingDb').then(connect => {
    console.log("db connected")
})
.catch(err => {
    console.log("error in db connected", err)
})