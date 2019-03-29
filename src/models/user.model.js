let mongoose = require('mongoose')

const uri = "mongodb+srv://donrokzon:92497370.a@lotuspg-tivhk.mongodb.net/test?retryWrites=true";

mongoose.connect(uri,{ useNewUrlParser: true })

let UserSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,        
        unique:true
    },
    rentPayed:{
        type:Array
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    },
    advancePayed:{
        type:String
    },permanentAddress:{
        
    },
    password:{
        type:String,
    }
    
})

module.exports = mongoose.model('Customer',UserSchema)