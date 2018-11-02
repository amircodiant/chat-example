var express = require('express');
var socketIo = require('socket.io');

var app = express();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


var server =  app.listen(3000, function(){
  console.log('listening on *:3000');
});

var io = socketIo(server);

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });



  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});







/*---------------------- another proccess using http module --------------------*/
/*var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// app.get('/', function(req, res){
//   res.send('<h1>Hello world</h1>');
// });

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});*/