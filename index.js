const express= require('express')
const jsonwebtoken = require('jsonwebtoken')
const app = express();
const mongoose = require('mongoose')
const bson = require('bson-objectid')
const fs = require('fs');
const shell = require('shelljs')
app.use(express.urlencoded({extended:true,limit:'2mb'}))
app.use(express.json({limit:'2mb'}));
app.use(express.static(__dirname+'/public/'))
const User = require('./models/user')
const Image = require('./models/images')
const path = __dirname+'/public/'
var user =''
var token=''
app.use(function(req,res,next){
    res.setHeader('Authorization',token)
    next();
})

const auth = async function(req,res,next){
   const gtoken = res.getHeader('Authorization')
   if(gtoken==''){
     return res.send('Please Authenticate')
   }
   const decode = jsonwebtoken.verify(gtoken, 'secret') 
   const user = await User.findOne({_id:decode._id});
    if(!user){
      return res.send('Please Authenticate')
    }
   req.user = user;
   console.log('Logged in as '+user)
   next();
}
app.get('/list',auth,async(req,res)=>{
    res.sendFile(path+'list.html')
})

app.get('/home',auth,async(req,res)=>{
    res.sendFile(path+'home.html')
})
app.get('/logout',auth,function(req,res){
    token = '';
    user = '';
    res.send('Logged Out')
})
app.post('/login',async(req,res)=>{
    const user =await User.findOne({username:req.body.username})
    if(user.password == req.body.password){
        token = jsonwebtoken.sign({_id:user._id},'secret',{expiresIn:'10 mins'})
        res.send('logged in')
    }
    else{
        res.send('invalid Credentials')
    }
})
app.get('/signup',async(req,res)=>{
    res.sendFile(path+'signup.html')
})
app.post('/signup',async (req,res)=>{
    const user = new User(req.body);
    if(!user){
       return res.send('Error')
    }
    await user.save();
    token = jsonwebtoken.sign({_id:user._id},'secret',{expiresIn:'10 mins'})
    res.send('logged in')
})
app.get('/',function(req,res){
    res.sendFile(path+'login.html')
})
app.post('/home/images',auth,async function(req,res){
    const id = bson().toString();
    const dir = __dirname+"\\images\\"+req.user._id;
    if(!fs.existsSync(dir)){
        shell.mkdir('-p',dir)
    }
    var base64Data = req.body.imgpath.replace(/^data:image\/png;base64,/, "");
    fs.writeFile(dir+'\\'+id+".png",base64Data, 'base64', function(err) {
        console.log(err); 
    });
    const js = {
        mood:req.body.mood,
        imgpath:req.user._id+'\\'+id+".png",
        owner:req.user._id
     }
    const images = new Image(js);
    await images.save();
    res.send('saved')
})
app.get('/lists',auth,async function(req,res){
  const items =await Image.find({owner:req.user._id})
  console.log(items)
  res.send(items)
})
app.listen(3000,function(){
 console.log('Hi')
})