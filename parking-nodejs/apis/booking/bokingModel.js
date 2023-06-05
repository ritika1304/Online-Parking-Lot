const mongoose = require('mongoose')


const bookingSchema = mongoose.Schema({

    bookingId: { type: Number, default: 0 },
    customerId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "register" },
    vehicleId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "vehicle" },
    parkingId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "parking" },


    bookingType: { type: Number, default: 1 }, // one hour , 2=> Per Day
    count: { type: Number, default: 0 }, // hours/days count
    bookingAmount: { type: Number, default: 0 },

    isCheckedIn: { type: Boolean, default: false },
    isCheckedOut: { type: Boolean, default: false },

    bookingDate: { type: Date, default: null },

    checkInDateTime: { type: Date, default: '' },
    checkOutDateTime: { type: Date, default: '' },


    penalty: { type: Number, default: 0 },
    penaltyReason: { type: String, default: '' },


    createdAt: { type: Date, default: Date.now() },


})

module.exports = mongoose.model('bookings', bookingSchema)