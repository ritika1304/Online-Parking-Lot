
const vehicle = require('./vehicleModel')
exports.addvehicle = async (req, res) => {
    if (req == undefined || req.body == undefined || req.body.vehiclename == undefined || req.body.vehicletype == undefined
        || req.body.vehiclemodel == undefined
        || req.body.vehiclenumber == undefined || req.body.customerId == undefined) {
        res.json({
            "message": "please fill the form",
            "status": 400,
            "successs": false
        })
    }
    else {
        let total = await vehicle.countDocuments()
        let vehicleObj = new vehicle()
        vehicleObj.vehicleId = total + 1
        vehicleObj.vehiclename = req.body.vehiclename
        vehicleObj.vehicletype = req.body.vehicletype
        vehicleObj.vehiclemodel = req.body.vehiclemodel
        vehicleObj.vehiclenumber = req.body.vehiclenumber
        vehicleObj.customerId = req.body.customerId
        vehicleObj.save()
            .then(veh => {

                res.json({
                    "message": "vehicle info  added",
                    "status": 200,
                    "success": "true",
                    "vehicle": vehicleObj
                })
            })
            .catch(err => {
                console.log(err)
                res.json({
                    "message": "error in add vehicle",
                    "status": 500,
                    "success": false,
                    "err": String(err)

                })
            })

    }
}
exports.showvehicle = (req, res) => {
    vehicle.find(req.body)
        .then(data => {
            res.json({
                "message": "vehicle info",
                "status": 200,
                "success": true,
                "vehicle": data
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
exports.updatevehicle = (req, res) => {
    vehicle.findOne({ "_id": req.body.id })
        .then(vehicleobj => {
            if (vehicleobj == null) {
                res.json({
                    "message": "No details Found",
                    "status": 400,
                    "success": true
                })
            } else {
                vehicleobj.cityId = req.body._id
                vehicleobj.vehiclename = req.body.vehiclename
                vehicleobj.vehicletype = req.body.vehicletype
                vehicleobj.vehiclemodel = req.body.vehiclemodel
                vehicleObj.vehiclenumber = req.body.vehiclenumber
                vehicleobj.save()
                res.json({
                    "message": "vehicle updated Suc",
                    "status": 200,
                    "success": true,
                    "vehicle": vehicleobj
                })
            }
        })

}





