const router = require('express').Router()
const registerController = require('../apis/register/registerController')
const userController = require('../apis/user/userController')
const cityContoller = require('../apis/city/cityController')
const customerContoller = require('../apis/customer/customerController')
const vehicleController = require('../apis/vehicle/vehicleController')
const parkingController = require('../apis/parking/parkingController')
const bookingController = require('../apis/booking/bookingController')
const slotsController = require('../apis/slots/slotsController')
router.get("/", (req, res) => {
    res.send("welcome to register routes")
})
//user register page
router.post('/addperson', registerController.addperson)
router.post('/showperson', registerController.showperson)
router.post('/updateperson', registerController.updateperson)
router.delete('/deleteperson', registerController.deleteperson)
//user login page
router.post('/loginuser', registerController.loginuser)
// all city info
router.post('/allcity', cityContoller.showcity)


//vehicle info
router.post('/addvehicle', vehicleController.addvehicle)
router.post('/showvehicle', vehicleController.showvehicle)

//parking 
router.post('/showparking', parkingController.showparking)
router.post('/fetchbyparkingid', parkingController.fetchbyid)
//slots


router.post('/showslots', slotsController.showslots)

router.post('/fetchslotbyid', slotsController.fetchslotbyid)

//bookings 
router.post('/allBookings', bookingController.showbooking)
router.post('/addBooking', bookingController.addbooking)
router.post('/getSingleBooking', bookingController.fetchbookingbyid)

module.exports = router;
































