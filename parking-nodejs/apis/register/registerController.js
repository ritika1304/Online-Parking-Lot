const user = require("../user/userModel")
const register = require('./registerModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const saltRounds = 10

const Parking = require('../parking/parkingModel')

exports.loginuser = (req, res) => {
    if (req == undefined || req.body == undefined || !req.body.email || !req.body.password) {
        res.json({
            "message": "please fill the form",
            "status": 400,
            "success": false
        })
    }
    else {
        register.findOne({ "email": req.body.email })
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
                        let parkingId = null
                        let parkingData = null
                        if (userObj.userType == 3) {
                            parkingData = await Parking.findOne({ email: userObj.email })
                            if (!!parkingData)
                                parkingId = parkingData._id
                        }
                        res.json({
                            "message": "successfully login",
                            "status": 200,
                            "success": true,
                            token: token,
                            parkingId: parkingId,
                            data: userObj
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

exports.addperson = async (req, res) => {
    if (req == undefined || req.body == undefined || req.body.FirstName == undefined || req.body.LastName == undefined || req.body.phone == undefined || req.body.email == undefined) {
        res.json({
            "message": "please fill the form",
            "status": 400,
            "successs": false
        })
    }
    else {
        let prevUser = await register.findOne({ email: req.body.email })
        if (prevUser == null) {
            let regObj = new register()
            regObj.FirstName = req.body.FirstName
            regObj.LastName = req.body.LastName
            regObj.email = req.body.email
            regObj.phone = req.body.phone
            regObj.userType = 2
            const hash = bcrypt.hashSync(req.body.password, saltRounds)
            regObj.password = hash
            regObj.save()
                .then(regi => {
                    res.json({
                        "message": "user added",
                        "status": 200,
                        "success": "true",
                        "register": regi
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.json({
                        "message": "error in add parking",
                        "status": 500,
                        "success": false,
                        "error": String(err)
                    })


                }

                )
        } else {
            res.send({
                status: 409,
                success: false,
                message: "User already exists with same email"
            })
        }
    }
}
exports.showperson = (req, res) => {
    register.find({ userType: 2 }).exec(function (err, data) {
        if (err) {
            res.json({
                "message": "Error in API",
                "status": 500,
                "success": false,
                "error": String(err)
            })
        } else {
            res.json({
                "message": "person info",
                "status": 200,
                "success": true,
                "data": data
            })
        }
    })
}
exports.updateperson = (req, res) => {
    register.findOne({ "_id": req.body.id })
        .then(regsobj => {
            if (regsobj == null) {
                res.json({
                    "message": "No details Found",
                    "status": true,
                    "success": true
                })
            } else {
                regsobj.FirstName = req.body.FirstName
                regsobj.LastName = req.body.LastName
                regsobj.email = req.body.email
                regsobj.phone = req.body.phone

                regsobj.save()
                res.json({
                    "message": "person updated Suc",
                    "status": 200,
                    "success": true,
                    "register": regsobj
                })
            }
        })

}
exports.deleteperson = (req, res) => {
    register.deleteOne({ "_id": req.body.id }).exec(function (error, data) {
        res.json({

            "message": "record delete",
            "status": 200,
            "success": true,
            "register": data


        })
    })



}
