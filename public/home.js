const message = document.getElementById('message');
let capture;
const mood = document.getElementById('mood')
function setup(){
    noCanvas();
    capture = createCapture(VIDEO);
    console.log(capture)
    //capture.size(320, 240)
    document.getElementById('submit').onclick =  async function(e){
        e.preventDefault();
        if(mood.value==''){
            return message.innerHTML = "Must provide Value for Mood" 
        }
        else{
            message.innerHTML=''
        }
        capture.loadPixels();
        const video = capture.canvas.toDataURL();
        
        const js = {
            mood:mood.value,
            imgpath:video
        }
        await $.post('/home/images',js);
        console.log('sent')
    }

  }
function draw(){

}