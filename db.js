const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
require('dotenv').config();
const url= process.env.mongoURL;

const connection = mongoose.connect(url).then(()=>{
    console.log('Connected to MongoDB');
}).catch(()=>{
    console.log('Error connecting to MongoDB');
})



module.exports = {connection};