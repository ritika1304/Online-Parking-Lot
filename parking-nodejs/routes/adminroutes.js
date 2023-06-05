const router = require('express').Router()
const parkingController = require('../apis/parking/parkingController')
const slotsController = require('../apis/slots/slotsController')
const cityController = require('../apis/city/cityController')
const registerController = require('../apis/register/registerController')
const adminController = require('../apis/admin/adminController')
const bookingController = require('../apis/booking/bookingController')
const vehicleController = require('../apis/vehicle/vehicleController')
const dashboardController = require('../apis/dashboard/dashboardController')

const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        let newname = Date.now() + path.extname(file.originalname)
        cb(null, newname)
    }
})
const upload = multer({ storage: storage })
router.get("/", (req, res) => {
    res.send("welcome to admin routes")
})
router.post('/loginuser', registerController.loginuser)
router.post('/showcity', cityController.showcity)
router.post('/addperson', registerController.addperson)

router.use(require('../middleware/tokenChecker'))
router.post('/dashboardAdmin', dashboardController.dashboardAdmin)
router.post('/dashboardparking', dashboardController.dashboardParking)
router.get('/showcity', cityController.showcity)

//user info admin side
router.post('/alluser', adminController.alluser)
router.post('/updateuser', adminController.updateuser)
//parking info
router.post('/addparking', parkingController.addparking)
router.post('/showparking', parkingController.showparking)
router.post('/updateparking', parkingController.updateparking)
router.post('/deleteparking', parkingController.deleteparking)
router.post('/fetchbyid', parkingController.fetchbyid)
//manage city info 
router.post('/addcity', upload.single('cityImage'), cityController.addcity)
router.post('/updatecity', upload.single('cityImage'),cityController.updatecity)
router.post('/fetchcitybyid', cityController.fetchbyid)
//slots info
router.post('/addslots', slotsController.addslots)
router.post('/showslots', slotsController.showslots)
router.post('/updateslots', slotsController.updateslots)
router.post('/fetchslotbyid', slotsController.fetchslotbyid)

//bookings 
router.post('/allBookings', bookingController.showbooking)
router.post('/checkIn', bookingController.checkInBooking)
router.post('/checkOut', bookingController.checkOutBooking)
router.post('/getSingleBooking', bookingController.fetchbookingbyid)

//vehicle info
router.post('/addvehicle', vehicleController.addvehicle)
router.post('/showvehicle', vehicleController.showvehicle)
//user register page

router.post('/showperson', registerController.showperson)
router.post('/updateperson', registerController.updateperson)
router.post('/deleteperson', registerController.deleteperson)


module.exports = router;
































