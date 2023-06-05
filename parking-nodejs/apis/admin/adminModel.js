var mongoose=require('mongoose')
var adminSchema=mongoose.Schema({
  
    
    createdAt:{type:Date,default:Date.now()},
    updateAt:{type:Date}
    
})
var admin=module.exports=mongoose.model('admin',adminSchema);