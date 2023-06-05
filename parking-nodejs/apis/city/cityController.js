const city = require('./cityModel')
exports.addcity = async (req, res) => {
    console.log(req.body)
    console.log(req.file)
    if (req == undefined || req.body == undefined || req.body.cityName == undefined) {
        res.json({
            "message": "please fill the form",
            "status": 400,
            "successs": false
        })
    }
    else {
        let prevCity = await city.findOne({ cityName: req.body.cityName })
        if (prevCity != null) {
            res.send({ success: false, status: 409, message: "City already exist with same name" })

        } else {

            let cityObj = new city()
            cityObj.cityName = req.body.cityName
            if (req.file != undefined) {
                cityObj.cityImage = "images/" + req.file.filename
            }
            cityObj.save()
                .then(data => {

                    res.json({
                        "message": "city info  added",
                        "status": 200,
                        "success": "true",
                        "city": data
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
        }
    }
}
exports.showcity = (req, res) => {
    city.find()
        .then(data => {
            console.log("data", data)
            res.json({
                "message": "parking info",
                "status": 200,
                "success": true,
                "city": data
            })
        })
        .catch(err => {
            console.log("err", err)
            res.json({
                "message": " error parking info",
                "status": 500,
                "success": false,
                "error": String(err)
            })
        })
}
exports.fetchcitybyid = (req, res) => {
    // console.log(req.body)
    city.findOne({ "_id": req.body.id }).exec(function (err, data) {
        res.json({
            "message": "single slot",
            "status": 200,
            "success": true,
            "city": data
        })
    })
}
exports.updatecity = (req, res) => {
    // console.log(req)
    city.findOne({ "_id": req.body._id })
        .then(async cityobj => {
            // console.log(cityobj)
            if (cityobj == null) {
                res.json({
                    "message": "No details Found",
                    "status": 200,
                    "success": false
                })
            } else {
                cityobj.cityName = req.body.cityName
                if (req.file != undefined) {
                    cityobj.cityImage = "images/" + req.file.filename
                }
                let id = cityobj._id
                let prevCity = await city.findOne({ $and: [{ cityName: req.body.cityName }, { _id: { $ne: id } }] })
                if (prevCity != null) {
                    res.send({ success: false, status: 409, message: "City already exist with same name" })

                } else
                    cityobj.save().then(updateres => {
                        res.json({
                            "message": "parking updated Suc",
                            "status": 200,
                            "success": true,
                            "city": cityobj
                        })
                    }).catch(err => {
                        res.json({
                            "message": err.toString(),
                            "status": 500,
                            "success": false
                        })
                    })

            }
        })

}


exports.fetchbyid = (req, res) => {
    // console.log(req.body)
    city.findOne({ "_id": req.body.id }).exec(function (err, data) {
        res.json({
            "message": "city",
            "status": 200,
            "success": true,
            "city": data
        })
    })
}


