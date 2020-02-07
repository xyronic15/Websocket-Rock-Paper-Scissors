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
  socket.on('start',function(){
    /*var player = {};
    var choices = [];

    socket.on('turn',function(data){
      player[socket.id]={
        choice:data
      };
      choices.push(player[socket.id].choice);
    });*/

    var p1Turn = choices[0];
    var p2Turn = choices[1];
    console.log(p1Turn);
    console.log(p2Turn);

    /*switch(p1Turn){
      case 'rock':
        switch(p2Turn){
          case 'rock':
            socket.emit('msg', "It\'s is tie!");
            break;
          case 'paper':
            socket.emit('msg', "Player 1 wins");
            break;
          case 'scissors':
            socket.emit('msg', "Player 2 wins");
            break;
        }
      case 'paper':
        switch(p2Turn){
          case 'rock':
            socket.emit('msg', "Player 1 wins");
            break;
          case 'paper':
            socket.emit('msg', "It\'s is tie!");
            break;
          case 'scissors':
            socket.emit('msg', "Player 2 wins");
            break;
        }
      case 'scissors':
        switch(p2Turn){
          case 'rock':
            socket.emit('msg', "Player 2 wins");
            break;
          case 'paper':
            socket.emit('msg', "Player 1 wins");
            break;
          case 'scissors':
            socket.emit('msg', "It\'s is tie!");
            break;
        }
    }*/
  
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
    socket.emit('msg', 'New Round');
  })
})



/*function checkRoundEnd() {
  /*if (p1Turn !== null && p2Turn !== null) {
    io.to(roomName).emit('msg', 'Round Ended! P1 - '
      + p1Turn + ' P2 - ' + p2Turn);

    io.to(roomName).emit('msg', 'Next round!');
  
}*/

server.listen(5000, function() {
  console.log('Starting server on port 5000');
});

