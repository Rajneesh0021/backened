const mongoose = require('mongoose');

const Schema = mongoose.Schema({
title: String,
body : String,
device :String,
no_if_comments: Number,
userId: String
});


const postModel = mongoose.model('Post', Schema);


module.exports = {postModel};