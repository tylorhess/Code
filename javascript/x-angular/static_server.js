var express = require('express');
var app = express();
var port = 3007;
app.use('/', express.static(__dirname));
app.listen(port, function() { console.log('localhost:'+port); });
