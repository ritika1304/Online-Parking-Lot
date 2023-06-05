var mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');
var registerSchema = mongoose.Schema({
    FirstName: { type: String, default: '' },
    LastName: { type: String, default: '' },
    email: { type: String, default: '' },
    password: { type: String, default: '' },
    phone: { type: Number, default: 0 },
    userType: { type: Number, default: 2 },// 1=> Admin , 2=> Customer , 3=>Parking
    createdAt: { type: Date, default: Date.now() },
    updateAt: { type: Date }

})
var register = module.exports = mongoose.model('register', registerSchema);  