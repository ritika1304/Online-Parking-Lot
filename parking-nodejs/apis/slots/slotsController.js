const slots = require('./slotsModel')
exports.addslots = (req, res) => {
    if (req == undefined || req.body == undefined ||
        req.body.twowhslot == undefined ||
        req.body.threewhslot == undefined ||
        req.body.fourwhslot == undefined ||
        req.body.twowhcostperhour == undefined ||
        req.body.threewhcostperhour == undefined ||
        req.body.fourwhcostperhour == undefined ||
        req.body.twowhcostperday == undefined ||
        req.body.threewhcostperday == undefined ||
        req.body.fourwhcostperday == undefined ||
        req.body.parkingId == undefined) {
        res.json({

            "message": "please fill the form",
            "status": 400,
            "successs": false
        })


    }
    else {
        let slotObj = new slots()
        slotObj.parkingId = req.body.parkingId
        slotObj.twowhslot = req.body.twowhslot
        slotObj.threewhslot = req.body.threewhslot
        slotObj.fourwhslot = req.body.fourwhslot
        slotObj.twowhcostperhour = req.body.twowhcostperhour
        slotObj.threewhcostperhour = req.body.threewhcostperhour
        slotObj.fourwhcostperhour = req.body.fourwhcostperhour
        slotObj.twowhcostperday = req.body.twowhcostperday
        slotObj.threewhcostperday = req.body.threewhcostperday
        slotObj.fourwhcostperday = req.body.fourwhcostperday
        slotObj.save()
            .then(slot => {

                res.json({
                    "message": "slots added",
                    "status": 200,
                    "success": "true",
                    "slots": slot
                })
            })
            .catch(err => {
                console.log(err)
                res.json({
                    "message": "error in add slots",
                    "status": 500,
                    "success": false,
                    "err": String(err)

                })
            })

            .catch(err => {
                console.log(err)
                res.json({
                    "message": "error in add slots",
                    "status": 500,
                    "success": false,
                    "error": String(err)
                })


            }

            )
    }
}
exports.fetchslotbyid = (req, res) => {
    // console.log(req.body)
    slots.findOne({ "_id": req.body.id }).populate("parkingId").exec(function (err, data) {
        res.json({
            "message": "single slot",
            "status": 200,
            "success": true,
            "slots": data
        })
    })
}
exports.showslots = (req, res) => {
    slots.find(req.body).populate("parkingId").exec(function (err, data) {
        if (err) {
            res.json({
                "message": "Error in API",
                "status": 500,
                "success": false,
                "error": String(err)
            })
        } else {
            res.json({
                "message": "slots info",
                "status": 200,
                "success": true,
                "slots": data
            })
        }
    })
}
exports.updateslots = (req, res) => {
    slots.findOne({ "_id": req.body.id })
        .then(slotsobj => {
            if (slotsobj == null) {
                res.json({
                    "message": "No details Found",
                    "status": true,
                    "success": true
                })
            } else {
                slotsobj.parkingId = req.body.parkingId
                slotsobj.twowhslot = req.body.twowhslot
                slotsobj.threewhslot = req.body.threewhslot
                slotsobj.fourwhslot = req.body.fourwhslot
                slotsobj.twowhcostperhour = req.body.twowhcostperhour
                slotsobj.threewhcostperhour = req.body.threewhcostperhour
                slotsobj.fourwhcostperhour = req.body.fourwhcostperhour
                slotsobj.twowhcostperday = req.body.twowhcostperday
                slotsobj.threewhcostperday = req.body.threewhcostperday
                slotsobj.fourwhcostperday = req.body.fourwhcostperday
                slotsobj.save().then(saveres => {
                    res.json({
                        "message": "slots updated Suc",
                        "status": 200,
                        "success": true,
                        "slots": saveres
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


