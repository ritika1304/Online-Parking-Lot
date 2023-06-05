var mongoose = require('mongoose');

var vehicleSchema = mongoose.Schema({
    vehicleId: { type: Number, default: 0 },
    customerId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'register' },
    vehiclename: { type: String, default: '' },
    vehicletype: { type: Number, default: 0 },
    vehiclemodel: { type: String, default: '' },
    vehiclenumber: { type: String, default: '' },

    createdAt: { type: Date, default: Date.now() },
    updateAt: { type: Date }

})
module.exports = mongoose.model('vehicle', vehicleSchema);  