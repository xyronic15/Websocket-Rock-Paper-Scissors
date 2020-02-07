var socket = io();

socket.on('chosen',function(){
  socket.emit('start');
})

document.getElementById('rock').addEventListener('click',function(event){
  socket.emit('turn','rock');
})

document.getElementById('paper').addEventListener('click',function(event){
  socket.emit('turn','paper');
})

document.getElementById('scissors').addEventListener('click',function(event){
  socket.emit('turn','scissors');
})

document.getElementById('new round').addEventListener('click',function(event){
  socket.emit('new round');
})

socket.on('msg', function(data){
  document.getElementById('message').innerHTML=data;
})