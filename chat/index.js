// This is the server

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	//res.send('<h1>Hello world</h1');  // just sends text to the browser
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
	socket.on('chat message', function(msg){
		console.log('message ' + msg);
	});
});



http.listen(3000, function(){
	console.log('listening on *:3000');
});