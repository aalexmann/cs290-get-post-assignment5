var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8080);

var options = { root: __dirname + '/'}

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(function(req, res, next){
    console.log('url: %s\n\t%s :: %s', req.url, req.method, req.path);
    console.log('body: ', req.body)
    next();
});

app.get('/form', function(req, res){
    res.type('text/html');
    res.sendFile('form.html', options);
});

var gottenObjects = function(object){
    var ulOpen = '<ul>';
    for (var key in object){
        ulOpen += '<li>' + key + ' ' + object[key] + '</li>';
    }
    return ulOpen + '</ul>';
}

var getRequestTable = function(req){}

app.get('/', function(req, res){
    var html = '<h1>POST Request Received</h1> <table><tbody><tr><td>url: '+ req.url + '</td><td>body: ' + gottenObjects(req.body) + '</td></tr></tbody></table>';
    res.render(html);
});

app.post('/', function(req, res){
    var html = '<h1>POST Request Received</h1> <table><tbody><tr><td>url: '+ req.url + '</td><td>body: ' + gottenObjects(req.body) + '</td></tr></tbody></table>';
    res.render(html);
});

app.use(function(req,res){
    res.status(404);
    res.render('404 - File Could Not be Found');
  });
  
//   app.use(function(err, req, res, next){
//     console.error(err.stack);
//     res.type('plain/text');
//     res.status(500);
//     res.render('500');
//   });
  
  app.listen(port, function(){
    console.log('Express started on http://localhost:' + port + '; press Ctrl-C to terminate.');
  });
