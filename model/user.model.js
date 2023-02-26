const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    name: String,
    email : String,
    password: String,
    userType:{ type:String , default:'user'}
});


const model = mongoose.model('User', Schema);


module.exports = {model};