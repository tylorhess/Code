var http = require('http');
var port = 8124;
var host = '127.0.0.1';
var msg = 'http server running at http://'+host+':'+port+'/';
http.createServer(function(req,res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(msg);
}).listen(port, host);
console.log(msg);