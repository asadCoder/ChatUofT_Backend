const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 4000;

mongoose.connect('mongodb://localhost/chatapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const messageSchema = new mongoose.Schema({
  text: String,
  sender: String,
  timestamp: Number,
});
const Message = mongoose.model('Message', messageSchema);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('message', (data) => {
    console.log('Message received', data);
    const { text, sender, timestamp } = data;
    const message = new Message({ text, sender, timestamp });
    message.save((err) => {
      if (err) {
        console.log(err);
      } else {
        io.emit('message', data);
      }
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
