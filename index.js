const express = require('express')
const mongoose = require('mongoose')
const bson = require('bson-objectid')
const sharp = require('sharp')
require('./db/mongoose')
//const http = require('http')
//const server = new http.createServer(express());
const User = require('./model/user')
const app = express();
app.use(express.json({limit:'2mb'}))
app.use(express.urlencoded({extended:true,limit:'2mb'}))
app.use(express.static(__dirname+"/public"))
const port = process.env.PORT || 3000;
app.get('/',function(req,res){
   res.sendFile('C:/Users/Jai Kathuria/Desktop/DataSelfie/public/index.html')
})
app.post('/run',async (req,res)=>{
    const id = bson().toString();
    var base64Data = req.body.imgvalue.replace(/^data:image\/png;base64,/, "");
    var img = new Buffer(base64Data,'base64');
    /*sharp(img).resize(320,320).toBuffer().then((reqbase64)=>{base64data = reqbase64.toString('base64')});*/
    const buffer = await sharp(img).resize({
        width:250,
        height:250
    }).png().toBuffer();
    base64Data = buffer.toString('base64');

    require("fs").writeFile(__dirname+"/images/"+id+".png", base64Data, 'base64', function(err) {
    console.log(err); 
});
    req.body.imgvalue =__dirname+"\\images\\"+id+".png";
    const userdetails = new User(req.body);
    await userdetails.save()
    console.log('Saved')
})
app.get('/lists',async (req,res)=>{
    const items = await User.find({})
    console.log(items);
    res.send(items);
})
app.listen(port,()=>{
    console.log('Hello')
})