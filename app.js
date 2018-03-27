
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var fs = require('fs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3002);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname + '/public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/what', routes.index);
app.get('/get_involved', routes.index);
app.get('/process', routes.index);
app.get('/vision', routes.index);
app.get('/contact', routes.index);
app.get('/legal', routes.legal);

app.get('/process_details', routes.process);

// handle contact post
app.post('/celeb-contact', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    fs.appendFileSync("celeb-contact", name + " " + email + "\n");
});

app.post('/normal-contact', function(req, res) {
    var email = req.body.email;
    fs.appendFileSync("normal-contact", email + "\n");
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
