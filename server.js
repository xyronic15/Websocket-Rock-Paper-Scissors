//Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});// Starts the server.

/*let waiting = null;
 
io.on('connection', (sock) => {
  sock.emit('msg', 'You are connected');
  sock.on('msg', (msg) => io.emit('msg', msg));
 
  if (waiting === null) {
    sock.emit('msg', 'You Are Waiting');
    waiting = sock;
  } else {
    startGame(waiting, sock);
    waiting = null;
  }
 
});*/

var choices = [];
var player = {}

io.on('connect',function(socket){
  socket.on('turn',function(data){
    player[socket.id]={
      choice:data
    };

    choices.push(player[socket.id].choice);
    socket.emit('chosen');
  });
})



io.on('connection',function(socket){
  socket.on('check',function(){

    var p1Turn = choices[0];
    var p2Turn = choices[1];
    console.log(p1Turn);
    console.log(p2Turn);

    if(p1Turn==p2Turn){
        io.emit('msg', "It\'s is tie!");
      } else if(p1Turn=='rock'&& p2Turn=='paper'){
        io.emit('msg', "Player 2 Wins");
      } else if(p1Turn=='rock' && p2Turn=='scissors'){
        io.emit('msg', "Player 1 Wins");
      } else if(p1Turn=='paper' && p2Turn=='rock'){
        io.emit('msg', "Player 1 Wins");
      } else if(p1Turn=='paper' && p2Turn=='scissors'){
        io.emit('msg', "Player 2 Wins");
      } else if(p1Turn=='scissors' && p2Turn=='rock'){
        io.emit('msg', "Player 2 Wins");
      } else if(p1Turn=='scissors' && p2Turn=='paper'){
        io.emit('msg', "Player 1 Wins");
      }

  })

  socket.on('new round', function(){
    p1Turn = p2Turn = null;
    choices.pop();
    choices.pop();
    io.emit('msg', 'New Round');
  })
})

server.listen(5000, function() {
  console.log('Starting server on port 5000');
});

