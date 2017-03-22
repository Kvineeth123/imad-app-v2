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
/*var counter=document.getElementById('counter');
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
*/
//submitting name
/*var b1 = document.getElementById('btn');
b1.onclick = function() {
   var request = new XMLHttpRequest();
   request.onreadystatechange = function(){
       if(request.readyState===XMLHttpRequest.DONE){
           if(request.status===200){
               var names=request.responseText;
               names=JSON.parse(names);
               var list='';
               for(var i=0;i<names.length;i++)
               {
                   list+='<li>'+ names[i] + '<li>';
               }
                var ul=document.getElementById('namelist');
                ul.innerHTML=list ;          
           }
           
       }
   };
   var nameinput=document.getElementById('name');
   var n1=nameinput.value;
   request.open('GET','http://kvineeth123.imad.hasura-app.io/submit-name?name='+n1,true);
   request.send(null);
};
*/
// log in function
var b1 = document.getElementById('login');
b1.onclick = function() {
   var request = new XMLHttpRequest();
   request.onreadystatechange = function(){
       if(request.readyState===XMLHttpRequest.DONE){
           if(request.status===200){
                alert('logged in successfully');     
           }else if(request.status===403){
                alert('username/password error');
               
           }else if(request.status===400){
                alert('error in database');
           }
           
       }
   };
   var username=document.getElementById('username').value;
   var password=document.getElementById('password').value;
   console.log(username);
   console.log(password);
   request.open('POST','http://kvineeth123.imad.hasura-app.io/login',true);
   request.setRequestHeader('Content-Type','application/json');
   request.send(JSON.stringify({username:username, password:password}));
};
//register function
var b2 = document.getElementById('reg');
b2.onclick = function() {
   var request = new XMLHttpRequest();
   request.onreadystatechange = function(){
       if(request.readyState===XMLHttpRequest.DONE){
           if(request.status===200){
                alert('user created successfully');     
           }else if(request.status===403){
                alert('error in creating user try again');
               
           }
           
       }
   };
   var username=document.getElementById('username').value;
   var password=document.getElementById('password').value;
   console.log(username);
   console.log(password);
   request.open('POST','http://kvineeth123.imad.hasura-app.io/create-user',true);
   request.setRequestHeader('Content-Type','application/json');
   request.send(JSON.stringify({username:username, password:password}));
};
//loading login details

function loadLoggedInUser (username) {
    var loginArea = document.getElementById('login_area');
    loginArea.innerHTML = `
        <h3> Hi <i>${username}</i></h3>
        <a href="/logout">Logout</a>
    `;
}

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
            } else {
                var loginArea = document.getElementById('login_area');
                loginArea.innerHTML = '<h3> User not logged in </h3>';
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}

loadLogin();


