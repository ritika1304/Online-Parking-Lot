const user = require('./userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cityModel = require('../city/cityModel')
exports.loginuser = (req, res) => {
    if (req == undefined || req.body == undefined || req.body.email == undefined || req.body.password == undefined) {
        res.json({
            "message": "please fill the form",
            "status": 400,
            "success": false
        })

    }
    else {
        user.findOne({ "email": req.body.email })
            .then(async userObj => {
                if (userObj == null) {
                    res.json({
                        "message": "no user exist",
                        "status": 400,
                        "success": false
                    })
                }
                else {

                    if (bcrypt.compareSync(req.body.password, userObj.password)) {
                        let user = { name: userObj.name, id: userObj._id }
                        let token = jwt.sign(user, "SECRET")
                        res.json({
                            "message": "successfully login",
                            "status": 200,
                            "success": true,
                            token: token
                        })
                    }
                    else {
                        res.json({
                            "message": "invalid email and password",
                            "status": 400,
                            "success": false
                        })

                    }

                }
            })
            .catch(err => {

                res.json({
                    "message": "error in email",
                    "status": 500,
                    "success": false,
                    "err": String(err)
                })
                console.log(err);
            })
    }

}

