let express = require('express')
let router = express.Router()
let Joi = require('joi');
let UserModel=require('../models/user.model')
let userController=require('../controller/user_controller');


//GET ROOT
router.get('/',userController.index);


//GET ONE
router.get('/user',userController.getUser);

//GET ALL with sum 
router.get('/users',userController.getAllUsers);


//CREATE
router.post('/addUser',userController.addUser)

//DELETE
router.delete('/user',userController.deleteUser)


//UPDATE
router.patch('/addUserPayment',(req,res)=>{
    if(!req.body.mobile){
        return res.status(400).json({
            status:0,
            message:'Missing URL parameter: mobile'})
    }
    if(!req.body.newPayment){
        return res.status(400).json({
            status:0,
            message:'Missing URL parameter: newPayment'})
    }

    UserModel.findOneAndUpdate(
        { mobile: req.body.mobile }, { $push: { paymentsDone: req.body.newPayment  } },  {new: true}, (error, doc) =>{
             if (error) {
                res.status(500).json(err)
                 console.log(error);
             } else {
                 if(doc!=null){
                    res.json({
                        status:1,
                        message:"Updated Succesfully",
                        detail:doc
                       }
                       ) 
                 }else{
                     res.json({
                        status:0,
                        message:" Couldnt update check if mobile is registered",
                     })
                 }
               
                
             }
         });
    })





   
    const schema=Joi.object().keys({
        currentPassword :Joi.string().required().min(3),
        newPassword:Joi.string().required().min(3)
      });

      
//Forgot password
    router.post('/forgotPw',(req,res)=>{
        const data = req.body;
        Joi.validate(data, schema, (err, value) => {
    
            if (err) {
                res.status(422).json({
                    status: 'error',
                    message: err.message,
                });
            } else {
                res.json({
                    status: 'success',
                    message: 'User created successfully',
                });
            }
    
        });


    })

 


module.exports=router