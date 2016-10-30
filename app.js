
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./app/routes/main')
  , http = require('http')
  , path = require('path');


  
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs'); // set up ejs for templating

//app.use(express.logger('dev')); // log every request to the console
app.use(express.bodyParser()); // get information from html forms
app.use(express.methodOverride());
app.use(app.router);
app.use('/public', express.static(process.cwd() + '/public'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


//render
app.get('/', routes.index);

//API
app.get('/polls/polls', routes.list);
app.get('/polls/:id', routes.poll);
app.post('/polls', routes.create);


io.sockets.on('connection', routes.vote);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
