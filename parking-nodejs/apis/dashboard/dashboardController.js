const Booking = require('../booking/bokingModel')
const User = require('../register/registerModel')



exports.dashboardAdmin = async (req, res) => {
    let currentDate = new Date()
    let startDate = currentDate.setHours(0, 0, 0, 0)
    let endDate = currentDate.setHours(23, 59, 59, 59)
    let totalCustomers = await User.countDocuments({ userType: 2 })
    let totalParkings = await User.countDocuments({ userType: 3 })
    let totalBookings = await Booking.countDocuments()
    let todaysBookings = await Booking.countDocuments({ $and: [{ createdAt: { $gte: startDate } }, { createdAt: { $lte: endDate } }] })
    let recentBookings = await Booking.find().populate("customerId").populate("vehicleId").populate("parkingId").limit(5).sort({ createdAt: -1 })
    res.send({
        success: true,
        status: 200,
        totalBookings: totalBookings,
        totalCustomers: totalCustomers,
        totalParkings: totalParkings,
        todaysBookings: todaysBookings,
        recentBookings: recentBookings,

    })
}

exports.dashboardParking = async (req, res) => {
    if (!req.body.parkingId) {
        res.send({ success: false, status: 400, message: "parkingId is required" })
    } else {

        let currentDate = new Date()
        let startDate = currentDate.setHours(0, 0, 0, 0)
        let endDate = currentDate.setHours(23, 59, 59, 59)

        let totalBookings = await Booking.countDocuments({ parkingId: req.body.parkingId })
        let todaysBookings = await Booking.countDocuments({ $and: [{ parkingId: req.body.parkingId }, { createdAt: { $gte: startDate } }, { createdAt: { $lte: endDate } }] })
        let recentBookings = await Booking.find({ parkingId: req.body.parkingId }).populate("customerId").populate("vehicleId").populate("parkingId").limit(5).sort({ createdAt: -1 })
        res.send({
            success: true,
            status: 200,
            totalBookings: totalBookings,
            todaysBookings: todaysBookings,
            recentBookings: recentBookings,

        })
    }
}