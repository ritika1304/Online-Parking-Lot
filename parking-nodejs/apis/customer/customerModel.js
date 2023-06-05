var mongoose = require('mongoose')
var customerSchema = mongoose.Schema({


    createdAt: { type: Date, default: Date.now() },
    updateAt: { type: Date }

})
var customer = module.exports = mongoose.model('customer', customerSchema);