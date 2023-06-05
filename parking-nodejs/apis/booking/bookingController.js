const Booking = require('./bokingModel')
const ParkingSlots = require('../slots/slotsModel')
const Vehicle = require('../vehicle/vehicleModel')
exports.addbooking = async (req, res) => {
    console.log(req.body)
    if (req == undefined || req.body == undefined || req.body.parkingId == undefined
        || req.body.vehicleId == undefined
        || req.body.customerId == undefined
        || req.body.bookingType == undefined
        || req.body.bookingDate == undefined
        || req.body.bookingAmount == undefined || req.body.count == undefined) {
        res.json({
            "message": "please fill the form",
            "status": 400,
            "successs": false
        })
    }
    else {

        let prevBooking = await Booking.findOne({ $and: [{ bookingDate: req.body.bookingDate }, { customerId: req.body.customerId }] })
        if (prevBooking != null) {
            res.json({ success: false, status: 409, message: "Booking already exists for this customer on same day" })
        } else {
            let slotData = {}
            // let availableSlots = 0
            let vehicleData = await Vehicle.findOne({ _id: req.body.vehicleId })
            let vehicleType = Number(vehicleData.vehicletype)
            slotData = await ParkingSlots.findOne({ parkingId: req.body.parkingId })

            // if (vehicleType == 1) {
            //     availableSlots = slotData.twowhslot
            // }
            // else if (vehicleType == 2) {
            //     availableSlots = slotData.threewhslot
            // }
            // else if (vehicleType == 3) {
            //     availableSlots = slotData.fourwhslot
            // }
            // console.log("Available Slots", availableSlots)
            // if (availableSlots <= 0) {
            //     res.json({ success: false, status: 409, message: "No Slots available" })
            // } else {

                let total = await Booking.countDocuments({})
                let bookingObj = new Booking()
                bookingObj.bookingId = total + 1
                bookingObj.customerId = req.body.customerId
                bookingObj.parkingId = req.body.parkingId
                bookingObj.vehicleId = req.body.vehicleId
                bookingObj.bookingAmount = req.body.bookingAmount
                bookingObj.bookingType = req.body.bookingType
                bookingObj.bookingDate = req.body.bookingDate
                if (req.body.count != undefined)
                    bookingObj.count = req.body.count
                bookingObj.save()
                    .then(async data => {
                        console.log("vehicleType", vehicleData)
                        if (vehicleData != null) {
                            console.log("slotData", slotData)
                            if (slotData != null) {
                                console.log("vehicleType", vehicleType)
                                if (vehicleType == 1) {
                                    if (slotData.twowhslot > 0)
                                        slotData.twowhslot -= 1
                                }
                                if (vehicleType == 2) {
                                    if (slotData.threewhslot > 0)
                                        slotData.threewhslot -= 1

                                }
                                if (vehicleType == 3) {
                                    if (slotData.fourwhslot > 0)
                                        slotData.fourwhslot -= 1
                                }
                                slotData.save()
                            }

                        }
                        res.json({
                            "message": "Booking made successfully",
                            "status": 200,
                            "success": "true",
                            "booking": data
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        res.json({
                            "message": "error in add booking",
                            "status": 500,
                            "success": false,
                            "error": String(err)
                        })


                    }

                    )
            // }
        }
    }
}
exports.showbooking = (req, res) => {
    Booking.find(req.body)
        .populate("parkingId")
        .populate("customerId")
        .populate("vehicleId")
        .then(data => {
            //console.log("data", data)
            res.json({
                "message": "Bookings Loaded",
                "status": 200,
                "success": true,
                "booking": data
            })
        })
        .catch(err => {
            //    / console.log("err", err)
            res.json({
                "message": " error booking info",
                "status": 500,
                "success": false,
                "error": String(err)
            })
        })
}
exports.fetchbookingbyid = (req, res) => {
    // console.log(req.body)
    Booking.findOne({ "_id": req.body.id }).exec(function (err, data) {
        res.json({
            "message": "single slot",
            "status": 200,
            "success": true,
            "booking": data
        })
    })
}
exports.checkInBooking = (req, res) => {
    Booking.findOne({ "_id": req.body.id })
        .then(bookingobj => {
            let currentDate = new Date()

            if (bookingobj == null) {
                res.json({
                    "message": "No details Found",
                    "status": 400,
                    "success": false
                })
            } else if (getConvertedDate(currentDate) != getConvertedDate(bookingobj.bookingDate)) {
                res.json({
                    "message": "Booking is not for today",
                    "status": 409,
                    "success": false
                })
            }
            else if (bookingobj.isCheckedIn) {
                res.json({
                    "message": "Already Checked In",
                    "status": 409,
                    "success": false
                })
            }
            else {
                bookingobj.checkInDateTime = Date.now()
                bookingobj.isCheckedIn = true

                bookingobj.save()
                res.json({
                    "message": "Checked In Successfully",
                    "status": 200,
                    "success": true,
                    "booking": bookingobj
                })
            }
        })

}

exports.checkOutBooking = async (req, res) => {
    Booking.findOne({ "_id": req.body.id })
        .then(async bookingobj => {
            if (bookingobj == null) {
                res.json({
                    "message": "No details Found",
                    "status": 200,
                    "success": true
                })
            } else if (bookingobj.isCheckedIn == false) {
                res.json({
                    "message": "Not Checked In",
                    "status": 409,
                    "success": false
                })
            } else if (bookingobj.isCheckedOut == true) {
                res.json({
                    "message": "Already Checked OUt",
                    "status": 409,
                    "success": false
                })
            }
            else {
                let vehicleData = await Vehicle.findOne({ _id: bookingobj.vehicleId })
                let vehicleType = Number(vehicleData.vehicletype)
                slotData = await ParkingSlots.findOne({ parkingId: bookingobj.parkingId })
                bookingobj.isCheckedOut = true
                bookingobj.checkOutDateTime = Date.now()
                if (!!req.body.penalty)
                    bookingobj.penalty = req.body.penalty
                if (!!req.body.penaltyReason)
                    bookingobj.penaltyReason = req.body.penaltyReason
                bookingobj.save().then(resp => {
                    if (slotData != null) {
                        console.log("vehicleType", vehicleType)
                        if (vehicleType == 1) {

                            slotData.twowhslot += 1
                        }
                        if (vehicleType == 2) {

                            slotData.threewhslot += 1

                        }
                        if (vehicleType == 3) {

                            slotData.fourwhslot += 1
                        }
                        slotData.save()
                    }
                    res.json({
                        "message": "Checked In Successfully",
                        "status": 200,
                        "success": true,
                        "booking": resp
                    })
                })

            }
        })

}

function getConvertedDate(date) {
    return date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()
}

