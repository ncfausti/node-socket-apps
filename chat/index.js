// This is the server

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/chat', function(req, res){
	//res.send('<h1>Hello world</h1');  // just sends text to the browser
	res.sendFile(__dirname + '/chat.html');
});

app.get('/audio', function(req, res){
	//res.send('<h1>Hello world</h1');  // just sends text to the browser
	res.sendFile(__dirname + '/audio.html');
});

io.on('connection', function(socket){
	console.log('a user connected');
	
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});

	socket.on('chat message', function(msg){
		console.log('message ' + msg);
		io.emit('chat message', msg);
	});

	socket.on('coords acquired', function(msg){
		console.log('new user located at: ' + msg.lat + ',' + msg.lng);
		io.emit('coords acquired', msg);
	});

});



http.listen(3000, function(){
	console.log('listening on *:3000');
});