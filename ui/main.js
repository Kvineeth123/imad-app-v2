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
};
//counter
var counter=document.getElementById('counter');
counter.onclick=function(){
   // count=count+1;
   var request = new XMLHttpRequest();
   request.onreadystatechange = function(){
       if(request.readyState===XMLHttpRequest.DONE){
           if(request.status===200){
               var count=request.responseText;
                var span=document.getElementById('count');
                span.innerHTML=count.toString();           
           }
           
       }
   };
   request.open('GET','http://kvineeth123.imad.hasura-app.io/counter');
   request.send(null);
};

//submitting name
var nameval = document.getElementById('name');
var n1=nameval.value;
var b1 = document.getElementById('btn');
b1.onclick = function() {
    list='<li>'+n1+'<li>';
    var ul = document.getElementById('nl');
    ul.innerHTML=list;
};
