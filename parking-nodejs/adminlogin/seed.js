const register = require('../apis/register/registerModel')
const bcrypt = require('bcrypt');
const saltRounds = 10
exports.seedadmin = () => {
    let data = {
        FirstName: "Admin",
        password: 1234,
        userType: 1,
        email: "admin@gmail.com",
    }
    const hash = bcrypt.hashSync('1234', saltRounds);
    data.password = hash
    register.findOne({ email: "admin@gmail.com" })
        .then(data1 => {
            if (data1 == null) {
                let registerObj = new register(data)
                registerObj.save()
            }
        })
}