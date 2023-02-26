const { Router } = require("express");
const userRoute = Router();
const { model } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const env = require("dotenv").config();
const secret = process.env.SECRET;



userRoute.get('/admin', async (req, res) => {
  try {
    let user = await model.find();
    res.status(200).json(user);

  } catch (error) {
    
  }
  
})
userRoute.post("/register", async (req, res) => {
  
 
  
  let { name, email, password, userType } = req.body;
  let user = await model.find({ email });
  if (user.length !== 0) {
    res.status(400).json({ message: "user already exists" });
  }else{
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.send(err);
      }
      let payload = { name, email, password: hash, userType };
      let user = model(payload);
      await user.save();
      res.send({ message: "user registered successfully" });
    });
  } catch (error) {
    res.send(error.message);
  }
}
});

userRoute.post("/login", async (req, res) => {
  // let {email, password}=req.body;
  let email = req.body.email;
  let password = req.body.password;
  let type = req.body.userType;
  

  let user = await model.find({ email });
  if (user.length == 0) {
    res.status(404).json({ message: "user not found" });
  }else{
    try {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) {
          res.send({ message: "login failed", err: err });
        } else if (result) {
          // console.log(process.env.SECRET);
         if(type == "admin" && user[0].userType == "admin"){
          let token = jwt.sign({ _id: user[0]._id }, process.env.SECRET);
  
          res.send({message:"logged in as admin", token: token });
         }else{
          let token = jwt.sign({ _id: user[0]._id }, process.env.SECRET);
  
          res.send({message:"logged in as user" ,token: token });
         }

          
        }
      });
    } catch (error) {
      res.send(error.message);
    }
  }
  
 
});

module.exports = { userRoute };
