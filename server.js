var express = require('express');
var morgan = require('morgan');
var path = require('path');

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

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:article',function(req,res){
  var an = req.params.article;
  res.send(createtemplate(articles[an]));
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
