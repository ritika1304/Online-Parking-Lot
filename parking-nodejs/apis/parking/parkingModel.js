var mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');
 var parkingSchema=mongoose.Schema({
     cityId:{type:mongoose.Schema.Types.ObjectId,default:null, ref: "city"},
     parkingname:{type:String,default:''},
     longitude:{type:Number,default:''},
     latitude:{type:Number,default:''},
     address:{type:String,default:''},
     parkingowner:{type:String,default:''},
     email:{type:String,default:''},
     phone:{type:Number,default:0},
     createdAt:{type:Date,default:Date.now()},
     updateAt:{type:Date}
    
 })
 var parking =module.exports=mongoose.model('parking',parkingSchema);  