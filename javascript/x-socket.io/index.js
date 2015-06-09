var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http); // <-- notice http object

app.get('/', function(req, res){
  res.sendFile(__dirname+'/index.html');
});

io.on('connection', function(socket) {
	console.log('a user connected');
	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
		io.emit('chat message', msg);

	});
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

	var isFirst = true;
	console.log("'/' sockets:");
	for (var key in io.sockets.connected) {
	  if (io.sockets.connected.hasOwnProperty(key)) {
	  	console.log(key);
	  	if (isFirst) {JSON.stringify(console.log(io.sockets.connected[key]));}
	  	//for (var key2 in io.sockets.connected[key]) {console.log(io.sockets.connected[key][key2]);}
	  	for (var key2 in io.sockets.connected[key]) {
	  		if (isFirst) {
	  			console.log(key2);
	  			isFirst = false;
	  		}
	  	}
	  }
	}
	console.log("'/namespace' sockets:");
	for (var key in io.of('/namespace').connected) {
	  if (io.of('/namespace').connected.hasOwnProperty(key)) {console.log(key);}
	}
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});