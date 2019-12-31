const elem = document.getElementById('elements');
document.getElementById('show').onclick = async function(){
    elem.innerHTML='';
    const items =await $.get('/lists')
     items.forEach(element => {
         elem.innerHTML = elem.innerHTML+element.mood;
         elem.innerHTML = elem.innerHTML + "<br>"
         elem.innerHTML = elem.innerHTML + "<img src ='http://localhost:8887/"+element.imgpath+"'>";
         elem.innerHTML = elem.innerHTML + "<br>"
    });
    
}