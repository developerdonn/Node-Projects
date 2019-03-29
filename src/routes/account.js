let express = require('express')
let router = express.Router()
let Joi = require('joi');
let UserModel=require('../models/user.model')


router.post('/userRegister',(req,res)=>{
   
    UserModel.find({
        isAdmin:true
    })
    .then(doc => {
        res.json(doc)
    })
    .catch(err =>{
        res.status(500).json(err)
    })
})


router.post('/updatePassword',(req,res)=>{
if(req.body.newPassword===null){
res.json({
    status:0,
    message:"Missing parameter : newPassword"
})
}
     
UserModel.update({
    isAdmin:true
   },{ $set :{
    password : req.body.newPassword}
   })
   .then(doc => {
       if(doc!=null){
        res.json({
            status:1,
            message:"success",
            detail:doc
        }
            )
       }else{
        res.json({
            status:0,
            message:"No docs found"})           
       }
   })
   .catch(err =>{
       res.status(500).json(err)
   })

})








module.exports=router