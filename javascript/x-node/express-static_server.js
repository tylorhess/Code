var express = require('express');
var app = express();
var port = 3000;
app.use('/', express.static(__dirname));
app.listen(port, function() { console.log('listening at http://localhost:'+port+'/<filename>'); });
// serves 'filename.txt' at http://localhost:<port>/filename.txt

