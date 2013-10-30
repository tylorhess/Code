var fs = require('fs');

fs.writeFile('message.txt', 'Hello Node', function (err) {
	if (err) 
		throw err;
	console.log('It\'s saved!');
});

fs.readFile('/etc/passwd', function (err, data) {
	if (err) 
		throw err;
	console.log(data);
});