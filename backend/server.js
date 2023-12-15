require ('dotenv').config()
const express = require('express')
const todoRoutes = require('./routes/todo')
const mongoose = require('mongoose')

//express app
const app = express()

//middleware
app.use((req,res,next)=>{
    console.log(req.path, req.method)
    next()
})

app.use(express.json())

//routes
app.use('/api/tasks',todoRoutes)

//connect to db
mongoose.connect(process.env.MONG_URI)
    .then(()=>{
        //listen for requests
        app.listen(process.env.PORT, ()=>{
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error)
    })
