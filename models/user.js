require('../db/mongoose')
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username:{type:String,minlength:8,required:true,trim:true,unique:true},
    password:{type:String,minlength:10,required:true}
})
const User = new mongoose.model('user',userSchema);

module.exports = User;