const {Router} = require('express');
const userRoute= Router()
const {model}=require('../model/user.model')
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt')
require('dotenv').config()
const secret =process.env.JWT_SECRET

userRoute.post('/register',async (req,res)=>{
    let {name,email,gender,password,age,city}=req.body;

try {
    bcrypt.hash(password, 5, async(err, hash) =>{
        if(err){
            res.send(err)
        } 
        let payload={name,email,gender,password:hash,age,city}
        let user = model(payload);
        await user.save();
       res.send({"message":"user registered successfully"})
    });
} catch (error) {
    res.send(error.message)
}
})



userRoute.post('/login',async (req,res)=>{
    let {email,password}=req.body;
    let user=await model.find(email)
    try {
        bcrypt.compare(password, user[0].password, function(err, result) {
            if(result){
                    let token=jwt.sign({id:user[0]._id},secret)
                    res.send({"message":"login success" ,"token":token})
                }else{
                    res.send({"message":"login failed","err":err})
    
                }
    
        });  
    } catch (error) {
       res.send(error.message)
    }
    
})


module.exports={userRoute};