const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    name: String,
    email : String,
    gender: String,
    password: String,
    age : Number,
    city: String
});


const model = mongoose.model('User', Schema);


module.exports = {model};