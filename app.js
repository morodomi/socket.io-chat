
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

// for socket.io
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {
    // on connect
    console.log(socket.id + ' is connected');

    // get message from client
    socket.on('message', function(msg) {
        console.log(socket.id + ' has been sent a message, "' + msg + '"');
        socket.emit('message', msg);
        socket.broadcast.emit('message', msg);
    });
    // client disconnected
    socket.on('disconnect', function() {
        console.log(socket.id + ' is disconnected.');
    });
});
