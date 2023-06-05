var mongoose = require('mongoose');

 var citySchema=mongoose.Schema({
     //cityid:{type:Number,default:0},
     cityName:{type:String,default:''},
     cityImage:{type:String,default:"noimage.jpg"},

     
 })
 var city =module.exports=mongoose.model('city',citySchema);  