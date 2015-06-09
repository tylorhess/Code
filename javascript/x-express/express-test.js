var express = require('express');
var app = express();

// http://localhost:1338/folder/file.html?a=0&b[c]=tylor
app.get('/folder/file.html', function(req,res) {

	res.send(
	// req.body
	// req.query
	// req.params
	
	'req.baseUrl: ' 	+req.baseUrl		+'<br>'+
	'req.hostname: '	+req.hostname		+'<br>'+
	'req.ip: '			+req.ip 			+'<br>'+
	'req.ips: '			+req.ips			+'<br>'+
	'req.path: '		+req.path			+'<br>'+
	'req.protocol: '	+req.protocol		+'<br>'+
	'req.originalUrl: '	+req.originalUrl	+'<br>'+
	'req.subdomains: '	+req.subdomains 	+'<br>'+
	'req.route: '		+JSON.stringify(req.route)	+'<br>'+
	'a = '		+req.query.a		+'<br>'+
	'b.c = '	+req.query.b.c		+'<br>'
	
	// req.route
	// req.app
	// req.cookies   req.signedCookies
	// req.fresh     req.stale
	// req.secure	
	// req.xhr	

	);

});

var port = 1338;
app.listen(port);
console.log('listening on port: '+port);
