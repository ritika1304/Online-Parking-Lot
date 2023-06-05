const customer=require('./customerModel')
const city=require('../city/cityModel')

const { stringify } = require('nodemon/lib/utils')

exports.allcity = (req,res)=>{
    city.find()
        .then(data=>{
            if (data ==null){

            
            res.json({
                "message":" no city info",
                "status":200,
                "success":true
               
            })
        }else{
            res.json({
                "mrssage":"all cities",
                "ststus":200,
                "success":true,
                "customer":data
            })
        }

   })
  .catch(err=>{
      console.log(err)
      res.json({
          "message":"error in all cities",
          "status":500,
          "success":false,
          "error":stringify(err)
      })
  })     
}

