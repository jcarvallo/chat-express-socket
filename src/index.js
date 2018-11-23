const express  = require('express');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const http     = require('http');
const path     = require('path');

const app=express();
app.set('port', process.env.PORT || 3200);
app.use(express.static(path.join(__dirname, 'public')));

const server= http.createServer(app);

server.listen(app.get('port'),()=>{
  console.log(`El servidor se ejecuta por el port ${app.get('port')}`);
})


const io = socketio.listen(server);
require('./socket')(io);

// conexion db
mongoose.connect('mongodb://localhost/chat')
  .then(db => console.log('DB conectada'))
  .catch(err => console.log(err));








