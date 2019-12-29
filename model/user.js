const mongoose = require('mongoose')
require('../db/mongoose')

const userSchema = new mongoose.Schema({
   value:{
       required:true,
       type:String,
       trim:true
   },
   imgvalue:{
       type:String
   }
})

const user = new mongoose.model('User',userSchema);

module.exports = user;