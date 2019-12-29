const elem = document.getElementById('getElem');
document.getElementById('show').onclick = async function(){
    elem.innerHTML='';
    const items =await $.get('/lists')
    items.forEach(element => {
        element.imgvalue = element.imgvalue.replace('C:\\Users\\Jai Kathuria\\Desktop\\DataSelfie\\images\\','')
        console.log(element.imgvalue);
        console.log(element.value)
        console.log("<img src ='http://localhost:8887/"+element.imgvalue+">")
        elem.innerHTML = elem.innerHTML+element.value;
        elem.innerHTML = elem.innerHTML + "<br>"
        elem.innerHTML = elem.innerHTML + "<img src ='http://localhost:8887/"+element.imgvalue+"'>";
        elem.innerHTML = elem.innerHTML + "<br>"
    });
    
}