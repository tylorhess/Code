var express = require('express');
var app = express();
var port = 1337;
app.use('/public', express.static(__dirname));
app.listen(port)

