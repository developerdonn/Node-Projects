let UserModel=require('../models/user.model')

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

exports.addUser=function(req,res){
    if(!req.body){
        return res.status(400).json('Request body is missing')
     }
     if(!req.body.mobile){
      return res.status(400).json('Request parameter missing: mobile')
   }
   if(!req.body.name){
      return res.status(400).json('Request parameter missing: name')
   }
   if(!req.body.email){
      return res.status(400).json('Request parameter missing: email')
   }
     let model=new UserModel(req.body)
     model.save()
     .then(doc =>{
         if(!doc || doc.length === 0){
             return res.status(500).send(doc)
         }
         res.status(201).send(doc)
     })
      .catch(err => {
          res.status(500).json(err)
      })
};


exports.getUser=function(req,res){
    if(!req.query.mobile){
        return res.status(400).json({
            status:0,
            message:'Missing URL parameter: mobile'
        })
    }
       UserModel.findOne({
        mobile:req.query.mobile
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
}

exports.getAllUsers=function(req,res){
    UserModel.aggregate( [
        {
          $addFields: {
            totalPaymentsDone: { $sum: "$paymentsDone" } ,
          }
        },
     ] , function (err, result) {
        if (err) {
            next(err);
        } else {
         if(result.length>0){
            res.json({
                status:1,
                message:"success",
                detail:result
            });

         }else{
             res.json({
                status:0,                 
                 message:"No users found"
             })
         }


        }
    });


}



exports.deleteUser=function(req,res){
    if(!req.query.email){
        return res.status(400).json('Missing URL parameter: email')
    }
    
       UserModel.findOneAndRemove({
           email:req.query.email
       })
       .then(doc => {
           res.json(doc)
       })
       .catch(err =>{
           res.status(500).json(err)
       })
};