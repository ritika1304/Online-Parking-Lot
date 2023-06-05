var mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');
var slotSchema = mongoose.Schema({
    parkingId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "parking" },
    twowhslot: { type: Number, default: '' },
    threewhslot: { type: Number, default: '' },
    fourwhslot: { type: Number, default: '' },
    twowhcostperhour: { type: Number, default: '' },
    threewhcostperhour: { type: Number, default: '' },
    fourwhcostperhour: { type: Number, default: '' },
    twowhcostperday: { type: Number, default: '' },
    threewhcostperday: { type: Number, default: '' },
    fourwhcostperday: { type: Number, default: '' },

    createdAt: { type: Date, default: Date.now() },
    updateAt: { type: Date }

})
var slot = module.exports = mongoose.model('slot', slotSchema);  