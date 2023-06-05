const admin = require('./adminModel')
const register = require('../register/registerModel')

const { stringify } = require('nodemon/lib/utils')

exports.alluser = (req, res) => {
    register.find({ userType: 2 })
        .then(data => {
            if (data == null) {

                res.json({
                    "message": " no user info",
                    "status": 200,
                    "success": true

                })
            } else {
                res.json({
                    "message": "all users",
                    "status": 200,
                    "success": true,
                    "all user": data
                })
            }

        })
        .catch(err => {
            console.log(err)
            res.json({
                "message": "error in users",
                "status": 500,
                "success": false,
                "error": string(err)
            })
        })
}
exports.updateuser = (req, res) => {
    register.findOne({ "_id": req.body.id })
        .then(userobj => {
            if (userobj == null) {
                res.json({
                    "message": "No details Found",
                    "status": true,
                    "success": true
                })
            } else {
                userobj.FirstName = req.body.FirstName
                userobj.LastName = req.body.LastName
                userobj.email = req.body.email
                userobj.phone = req.body.phone

                userobj.save()
                res.json({
                    "message": "person updated Suc",
                    "status": 200,
                    "success": true,
                    "user": userobj
                })
            }
        })

}
