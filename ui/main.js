console.log('Loaded!');
//changed code
var img=document.getElementById('i1');
var marginleft=0;
function moveRight(){
    marginleft=marginleft+5;
    img.style.marginLeft=marginleft+'px';
}
img.onclick=function (){
    var interval=setInterval(moveRight,50);
}