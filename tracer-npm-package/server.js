const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.io = io;

app.use(express.static('out'))
app.use(express.json())

app.post('/socketio', (req, res) => {
  req.app.io.emit('data', req.body)
  res.end()
})

io.on('connection', function(socket) {
  console.log('App connected');
  console.log(socket.id);

  socket.on('disconnect', function () {
     console.log('App disconnected');
  });
});

http.listen(2929, function() {
   console.log('listening on *:2929');
});