var cmd = exec('pwd', function (error, stdout, stderr) {
	console.log('stdout: ' + stdout);
	console.log('stderr: ' + stderr);
	if (error !== null) {
		console.log('exec error: ' + error);
	}
});

var lastline = "";
var spawn = require('child_process').spawn;
var cmd = spawn('/Applications/MATLAB_R2015a.app/bin/matlab', ['-nojvm -nodisplay -nosplash -r "matchframes(100,100,100,100);quit;"']);
cmd.stdout.on('data', function(data) { console.log("stdout: "+data) });	// stdout's  "on data"  event
cmd.stderr.on('data', function(data) { console.log("stderr: "+data) });	// stderr's  "on data"  event
cmd.on('close', function(code) { console.log("exit code: "+code) });	// command's "on close" event
setTimeout(function() {cmd.stdin.write("x = [];quit;")}, 1000);