'use strict';

var express = require('express');
var socketIo = require('socket.io');

var models = require('./models');
var orm = {};
models(function (err, db) { 
    if (err) throw (err);

    orm.models = db.models;
    orm.db     = db; 
});


var app = express();

console.log('__dirname----->',__dirname)

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');

});


var server =  app.listen(3000, function(){
  console.log('listening on *:3000');
});

var io = socketIo(server);

io.on('connection', function(socket){

  console.log('a user connected -----  ',socket.id);

  socket.emit('ferret',{name:'amir',age:27}, (data) => {
    console.log(data); // data will be 'woot'
  });

  socket.on('chat message', function(msg){
    console.log(socket.id + ' ----message: ' + msg,);
    // io.emit('chat message', msg);
    socket.emit('chat message', msg);
  });

  socket.on('new-user', (data,fn)=>{
    console.log('user---->',data);

    orm.models.user.create({ name: data, surname: "test", age: 27, socket_id:socket.id }, function(err) {
      if (err){
        fn(err);
        throw err;
      }   
      fn('user create succesfully');
    });


  });





  /**
   * Disconnect Event
   */
  socket.on('disconnect', function(){
    console.log('user disconnected----->', socket.id);
    orm.models.user.find({ socket_id:socket.id }).remove(function (err) {
      if (err) throw (err);
    });
    
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