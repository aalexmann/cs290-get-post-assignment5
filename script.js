var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8080);


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(function(req, res, next){
    console.log('url: %s\n\t%s :: %s', req.url, req.method, req.path);
    console.log('body: ', req.body)
    next();
});

app.get('/form', function(req, res){
    res.type('text/html');
    res.sendFile('index.html', options);
});

var gottenObjects = function(object){
    var ulOpeningTag = '<ul>';
    for (var key in object){
        ulOpeningTag += '<li>' + key + ' ' + object[key] + '</li>';
    }
    return ulOpeningTag + '</ul>';
}

var getRequestTable = function(req){}

app.get('/', function(req, res){
    var html = '<h1>GET Request Received</h1>';
    html += '<table><tbody><tr>';
    html += '<td>url: ' + req.url + '</td>';
    html += '<td>body: ' + gottenObjects(req.body) + '</td>';
    html += '</tr></tbody></table>';
    res.render(html);
});

app.post('/', function(req, res){
    var html = '<h1>POST Request Received</h1>';
    html += '<table><tbody><tr>';
    html += '<td>url: ' + req.url + '</td>';
    html += '<td>body: ' + gottenObjects(req.body) + '</td>';
    html += '</tr></tbody></table>';
    res.render(html);
});

app.use(function(req,res){
    res.status(404);
    res.render('404');
  });
  
  app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
  });
  
  app.listen(app.get('8080'), function(){
    console.log('Express started on http://localhost:' + app.get('8080') + '; press Ctrl-C to terminate.');
  });
