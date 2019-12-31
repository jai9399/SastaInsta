require('../db/mongoose')
const mongoose = require('mongoose')
const ImgSchema = new mongoose.Schema({
    mood:{type:String,minlength:8,required:true,trim:true,unique:true},
    imgpath:{type:String,minlength:10,required:true},
    owner :{type:mongoose.Schema.Types.ObjectId,required:true,ref:'User'}
})
const Image = new mongoose.model('images',ImgSchema);

module.exports = Image;