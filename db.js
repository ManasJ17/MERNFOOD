const mongoose = require("mongoose");

// var mongoURL = 'mongodb://localhost:27017/mernfood';

mongoose.connect('mongodb://localhost:27017/tests')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));


var db = mongoose.connection

db.on('connected',()=>{
    console.log("Connected Sucess!!")
})

db.on('error', ()=>{
    console.log("Failer!!!")
})

module.exports = mongoose