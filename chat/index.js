// This is the server

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/chat', function(req, res){
	//res.send('<h1>Hello world</h1');  // just sends text to the browser
	res.sendFile(__dirname + '/chat.html');
});

app.get('/', function(req,res){
	res.send('ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDrSlCQulItSD3mF6yrh0dY5KSzuAnD4GUb/f+t7oV7e66MbWqmwCMc5dPfm/uV+DIiKXu8WXYlSt1wczN3QYmw1AG5ALYGih1X9aDuyjak5o4lhSO9NOCaBIj9+769E7Vx1wkRdlQa6L4LC/IiyFYkpvLnBy+5GOeA935Uod0q9TjpBq/nk8qtx+1ulaj+M+OLwGjZVNZEm5xGgSQ+80yQ+lAg9DvYcmVk7DRxVqvnMvBZPYSFIHrW11xsNBFmZMaRP26jVeqyXyPCLJsgHHL2EofIUEjlMpG4GmCMhrgtzfo2lAx0AMHo1nlmlZULXyxMh8J5cpDL5j186hTUxd0h ncfausti@gmail.com');
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