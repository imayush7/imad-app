var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user : 'ayushbsp98',
    db : 'ayushbsp98',
    host : 'db.imad.hasura-app.io',
    port : '5432',
    password : process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles ={
    'article-one': {
  title: 'Article One | Ayush Singh',
  heading: 'Article One',
  date: 'Aug 16 , 2017',
  content:`
        <p>
            This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.
        </p>
        <p>
            This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.
        </p>
        <p>
            This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.
        </p>`
},
    'article-two': {
    title: 'Article Two | Ayush Singh',
  heading: 'Article Two',
  date: 'Aug 16 , 2017',
  content:`
        
        <p>
            This is the content for my second article.
        </p>`
},
    'article-three': {
      title: 'Article Three | Ayush Singh',
  heading: 'Article three',
  date: 'Aug 16 , 2017',
  content:`
        
        <p>
            This is the content for my Third article.
        </p>`
}
};

var pool = new Pool(config);
app.get('/test-db',function(req,res){
    //make a select request
    //return a response
    pool.query('SELECT * FROM test',function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result));
        }
    });
});

function createTemplate(data){
    var date = data.date;
    var title = data.title;
    var heading = data.heading;
    var content = data.content;
var htmlTemplate = `
<html>
    <head>
        <title>${title}</title>
        <meta name="viewport" content="width-device-width , initial-scale-one"/>
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
            <div>
            <a href="/">Home</a>
            <hr/>
            </div>
            <h3>${heading}</h3>
            <div>
                ${date.toDateString()}
            </div>
            <div>
                ${content}
            </div>
        </div>
    </body>
</html>
`;
return htmlTemplate;
}

var names=[];
app.get('/submit-name',function(req,res){
    var names = req.querry.name;
    names.push(name);
    //JavaScript Object notation
    res.send(JSON.stringify(names));
});

var counter = 0;
app.get('/counter',function(req,res){
    counter = counter + 1;
    res.send(counter,toString());
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/articles/:articleName', function(req,res) {
    pool.query("SELECT * FROM article WHERE title =$1",[req.params.articleName],function(err,result){
       if(err) {
           res.status(500).send(err.toString());
       }else{
           if(result.rows.length === 0){
               res.status(404).send('Article not found');
           }else{
               var articleData = result.rows[0];
               res.send(createTemplate(articleData));
           }
       }
    });
    /*var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));*/
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


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
