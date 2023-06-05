const mongoose = require("mongoose");
var userSchema = mongoose.Schema({
     email: { type: String, default: '' },
     password: { type: String, default: '' },


     createdAt: { type: Date, default: Date.now() },
     updateAt: { type: Date }

})
var user = module.exports = mongoose.model('users', userSchema);






































