var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = {
    user : 'kvineeth123',
    database: 'kvineeth123',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
	secret: "somerfaknlskavdf;av",
	cookie : {maxAge: 1000*30*60*60*24}
}));

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

app.get('/ui/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', req.params.fileName));
});

var pool = new Pool(config);

function hash(input,salt){
    var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ['pbkdf2',salt,10000,hashed.toString('hex')].join('$');
}
app.get('/hash/:input',function(req,res){
   var hashval = hash(req.params.input,"random-string-used-for-encoding");
   res.send(hashval);
});
app.post('/create-user',function(req,res){
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password,salt);
   pool.query('INSERT INTO users (username,password) VALUES ($1,$2)',[username,dbString],function(err,result){
       if(err){
          res.status(400).send(err.toString());
      }
      else{
          res.status("user created successfuly");
      }
   });
});

app.post('/login',function(req,res){
   var username = req.body.username;
   var password = req.body.password;
   pool.query('SELECT * FROM users WHERE username = $1',[username],function(err,result){
       if(err){
          res.status(400).send(err.toString());
      }
      else{
          if(result.rows.length===0){
              res.send(403).send("username/password invalid");
          }
          else
          {
              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[1];
              var hashedval = hash(password,salt);
              if(hashedval===dbString){
                  req.session.auth={userid: result.rows[0].id};
                  res.send("user successfully logged in");
              }
              else{
                  res.send(403).send("username/password invalid");
              }
          }
      }
   });
});

app.get('/check-login',function(req,res){
   if(req.session && req.session.auth && req.session.auth.userid){
     pool.query('SELECT * FROM users WHERE id = $1', [req.session.auth.userId], function (err, result) {
           if (err) {
              res.status(500).send(err.toString());
           } else {
              res.send(result.rows[0].username);    
           }
       });
   } else {
       res.status(400).send("you are not logged in");
   }
});
app.get('/logout',function(req,res){
   delete req.session.auth ;
 res.send('<html><body>Logged out!<br/><br/><a href="/">Back to home</a></body></html>');
});
/*
app.get('/get-articles', function (req, res) {
   // make a select request
   // return a response with the results
   pool.query('SELECT * FROM article ORDER BY date DESC', function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
});

app.get('/get-comments/:articleName', function (req, res) {
   // make a select request
   // return a response with the results
   pool.query('SELECT comment.*, "user".username FROM article, comment, "user" WHERE article.title = $1 AND article.id = comment.article_id AND comment.user_id = "user".id ORDER BY comment.timestamp DESC', [req.params.articleName], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
});

app.post('/submit-comment/:articleName', function (req, res) {
   // Check if the user is logged in
    if (req.session && req.session.auth && req.session.auth.userId) {
        // First check if the article exists and get the article-id
        pool.query('SELECT * from article where title = $1', [req.params.articleName], function (err, result) {
            if (err) {
                res.status(500).send(err.toString());
            } else {
                if (result.rows.length === 0) {
                    res.status(400).send('Article not found');
                } else {
                    var articleId = result.rows[0].id;
                    // Now insert the right comment for this article
                    pool.query(
                        "INSERT INTO comment (comment, article_id, user_id) VALUES ($1, $2, $3)",
                        [req.body.comment, articleId, req.session.auth.userId],
                        function (err, result) {
                            if (err) {
                                res.status(500).send(err.toString());
                            } else {
                                res.status(200).send('Comment inserted!')
                            }
                        });
                }
            }
       });     
    } else {
        res.status(403).send('Only logged in users can comment');
    }
});
*/
app.get('/articles/:articleName',function(req,res){
  pool.query("SELECT * FROM article WHERE title ='"+req.params.articleName+"'",function(err,result){
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

var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
   res.send(counter.toString()); 
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
