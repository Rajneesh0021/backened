const express = require('express');
const app =express()
app.use(express.json())
require('dotenv').config()
const Port =process.env.port
const cors = require('cors')
app.use(cors())
const {connection}= require('./db')
const {userRoute}= require('./route/user.route')
const {postRoute}=require('./route/post.route')
const {verifyToken}= require('./authentication/user.authenticate')

app.get("/",(req,res)=>{
    res.send("  HOME PAGE")
})
app.use('/users', userRoute)


// app.use(verifyToken)
app.use('/posts', postRoute)


app.listen(Port, async()=>{
    try {
        await connection
        console.log(`running on port ${Port}`)
    } catch (err) {
        console.log(err)
    }
    
})