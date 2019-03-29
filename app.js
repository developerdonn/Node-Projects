var express = require("express");
var app = express();
var mongoose=require('mongoose')
let personRoute=require('./src/routes/user')
let accountRoute=require('./src/routes/account')

let bodyParser=require('body-parser')

app.use(bodyParser.json())

app.use((req,res,next)=>{
    console.log(`${new Date().toString()} => ${req.originalUrl}`,req.body)
    next()
})

app.use(personRoute)
app.use(accountRoute)
app.use(express.static('public'))

//Handler for 404 - Resource not found
app.use((req,res,next)=>{
   res.status(404).json({
       status:0,
       message:'we think you are lost'
   })
})

//Handler for error 500
app.use((err,req,res,next)=>{
    res.status(500).send(err.stack)
 })

const PORT=process.env.PORT || 3000
app.listen(PORT,() =>console.info(`Server has started on ${PORT}`))

