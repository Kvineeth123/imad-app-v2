var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user : 'kvineeth123',
    database: 'kvineeth123',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles={
	'article-one':{
	    title:'article-one-vineeth sai kareti',
	    heading:'this is my heading',
	    content:`
	    <p> this is my paragraph</p>
	    <p> this is my paragraph</p>
	    <p> this is my paragraph</p>
	    <p> this is my paragraph</p>
	    <p> this is my paragraph</p>
	    <p> this is my paragraph</p>
	    <p> this is my paragraph</p>
	    <p> this is my paragraph</p>
	    <p> this is my paragraph</p>
	    `
	}
};
function createtemplate(data){
	var title=data.title;
	var heading=data.heading;
	var content=data.content;
	var htmltemplate= `
	<html>
    <head>
        <title>
            ${title}
        </title>
    </head>
    <body>
        <div>
            <a href='/'>HOME</a>
        </div>
        <hr/>
        <h3>${heading}</h3>
        <div>
                ${content}
        </div>
    </body>
</html>
`;
return htmltemplate;
}
var names=[];
app.get('/submit-name',function(req,res){
    var name=req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});
var pool = new Pool(config);

app.get('/test-db',function(req,res){

    pool.query('SELECT * FROM article',function(err,result) {
        if(err){
            res.status(500).send(err.toString());
        }
        else{
                res.send(JSON.stringify(result.rows));
        }
    });    
});
var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
   res.send(counter.toString()); 
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/articles/:articleName',function(req,res){
  var an = req.params.articleName;
  pool.query("SELECT * FROM article WHERE title ="+an,function(err,result){
      if(err){
          res.status(400).send(err.toString());
      }
      else{
          if(result.rows.length===0){
              res.status(400).send('Article not found');
          }else{
            var articledata = result.rows[0];
            res.send(createtemplate(articledata));   
          }
      }
  });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
