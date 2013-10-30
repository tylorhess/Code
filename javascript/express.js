// node modules (files) OR npm packages
var express = require('express');	// $ npm install express

// configuration
var app = express();
app.configure(function() {
	// configure...
});

// routes
var port = 3000;
var msg = 'http://localhost:'+port+' test';
app.get('/', function(req, res) {
// '/'			= url.com/	
// '/username/'	= url.com/username/
	
	res.send(msg);	//res.setHeader('Content-Type', 'text/plain'); res.setHeader('Content-Length', msg.length); res.end(msg);
});

app.listen(port);

console.log(msg);
