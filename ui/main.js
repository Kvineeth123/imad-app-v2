console.log('Loaded!');
//changed code
var img=document.getElementById('img');
var marginleft=0;
var interval=setInterval(moveRight,50);
img.onclick=function moveRight(){
    marginleft=marginleft+5;
    img.style.marginleft=marginleft+'px';
}