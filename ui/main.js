console.log('Loaded!');
//changed code
var img=document.getElementById('img');
var marginleft=0;
function moveRight(){
    marginleft=marginleft+5;
    img.style.marginleft=marginleft+'px';
}
img.onclick=function (){
    var interval=setInterval(moveRight,50);
}