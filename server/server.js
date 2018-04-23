var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

var messages = [];

io.on('connection', function(socket) {
    socket.emit('messages', messages);
		socket.on('new-message', function(data) {
			messages.push(data);
		  io.sockets.emit('messages', messages);
		});
});

server.listen(8080, function() {
	console.log('Server running on http://localhost:8080');
});
