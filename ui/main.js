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
var nameinput=document.getElementById('name');
var n1=nameinput.value;
var b1 = document.getElementById('btn');
b1.onclick = function() {

   var request = new XMLHttpRequest();
   request.onreadystatechange = function(){
       if(request.readyState===XMLHttpRequest.DONE){
           if(request.status===200){
               var names=request.responseText;
               names=JSON.parse(names);
               var list='';
               for(var i=0;i<names.lenght;i++)
               {
                   list='<li>'+names[i]+'<li>';
               }
                var ul=document.getElementById('nl');
                ul.innerHTML=list ;          
                
           }
           
       }
   };
   request.open('GET','http://kvineeth123.imad.hasura-app.io/submit-name?name='+n1,true);
   request.send(null);
};
