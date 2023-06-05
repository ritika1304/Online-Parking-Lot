
const parking = require('./parkingModel')
const Register = require('../register/registerModel')
const bcrypt = require('bcrypt');
const saltRounds = 10
exports.addparking = async (req, res) => {
    if (req == undefined || req.body == undefined || req.body.parkingname == undefined || req.body.password == undefined || req.body.parkingowner == undefined || req.body.phone == undefined) {
        res.json({
            "message": "please fill the form",
            "status": 400,
            "successs": false
        })
    }
    else {
        let prevParking = await parking.findOne({ parkingname: req.body.parkingname })
        if (prevParking != null) {
            res.json({
                "message": "Parking already exists with same name",
                "status": 400,
                "successs": false
            })
        } else {
            let prevUser = await Register.findOne({ email: req.body.email })
            if (prevUser == null) {
                let parkingObj = new parking()
                parkingObj.cityId = req.body.cityId
                parkingObj.parkingname = req.body.parkingname
                parkingObj.longitude = req.body.longitude
                parkingObj.latitude = req.body.latitude
                parkingObj.address = req.body.address
                parkingObj.parkingowner = req.body.parkingowner
                parkingObj.email = req.body.email
                parkingObj.phone = req.body.phone
                parkingObj.save()
                    .then(park => {

                        let registerObj = Register()
                        registerObj.FirstName = park.parkingname
                        registerObj.email = park.email
                        registerObj.password = bcrypt.hashSync(req.body.password, saltRounds)
                        registerObj.phone = park.phone
                        registerObj.userType = 3
                        registerObj.save()
                        res.json({
                            "message": "parking info  added",
                            "status": 200,
                            "success": "true",
                            "parking": park
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        res.json({
                            "message": "error in add parking",
                            "status": 500,
                            "success": false,
                            "err": String(err)

                        })
                    })
            } else {
                res.send({
                    success: false,
                    status: 409,
                    email: "Parking already exists with same email"
                })
            }
        }


    }
}
exports.showparking = (req, res) => {
    parking.find(req.body).populate("cityId")
        .then(data => {
            res.json({
                "message": "parking info",
                "status": 200,
                "success": true,
                "parking": data
            })
        })
        .catch(err => {
            res.json({
                "message": "error in api",
                "status": 500,
                "success": false,
                "error": String(err)
            })
        })
}
exports.updateparking = (req, res) => {
    parking.findOne({ "_id": req.body.id })
        .then(parkingobj => {
            if (parkingobj == null) {
                res.json({
                    "message": "No details Found",
                    "status": true,
                    "success": true
                })
            } else {
                parkingobj.cityId = req.body.cityId
                parkingobj.parkingname = req.body.parkingname
                parkingobj.longitude = req.body.longitude
                parkingobj.latitude = req.body.latitude
                parkingobj.address = req.body.address
                parkingobj.parkingowner = req.body.parkingowner
                parkingobj.phone = req.body.phone
                parkingobj.email = req.body.email
                parkingobj.save()
                res.json({
                    "message": "parking updated Suc",
                    "status": 200,
                    "success": true,
                    "parking": parkingobj
                })
            }
        })

}
exports.deleteparking = (req, res) => {
    parking.deleteOne({ "_id": req.body.id })
        .exec(function (error, data) {
            res.json({
                "message": "record delete",
                "status": 200,
                "success": true,
                "parking": data


            })
        })
}
exports.fetchbyid = (req, res) => {
    // console.log(req.body)
    parking.findOne({ "_id": req.body.id }).populate("cityId").exec(function (err, data) {

        res.json({
            "message": "single parking",
            "status": 200,
            "success": true,
            "parking": data
        })
    })
}



