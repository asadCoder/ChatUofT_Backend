const io = require('socket.io-client');
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Socket.io connection established');
  socket.emit('message', 'Hello from Postman!');
});

socket.on('message', (data) => {
  console.log(`Received message: ${data}`);
});
