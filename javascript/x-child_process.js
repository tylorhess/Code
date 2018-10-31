// var cmd = exec('pwd', function (error, stdout, stderr) {
// 	console.log('stdout: ' + stdout);
// 	console.log('stderr: ' + stderr);
// 	if (error !== null) {
// 		console.log('exec error: ' + error);
// 	}
// });


// var cmd = require('child_process').spawn('/Applications/MATLAB_R2015a.app/bin/matlab', ['-nojvm -nodisplay -nosplash']);

// cmd.stdout.on('data', function(data) { console.log("stdout: "   +data) });	// stdout's  "on data"  event
// cmd.stderr.on('data', function(data) { console.log("stderr: "   +data) });	// stderr's  "on data"  event
// cmd.on('close',       function(code) { console.log("exit code: "+code) });	// command's "on close" event

// cmd.stdin.write("x=10\n");
// cmd.stdin.write("x=11\n"); 
// cmd.stdin.write("quit\n");
// cmd.stdin.end();

var cmd = require('child_process').spawn('python');

cmd.stdout.on('data', function(data) { console.log("stdout: "   +data) });	// stdout's  "on data"  event
cmd.stderr.on('data', function(data) { console.log("stderr: "   +data) });	// stderr's  "on data"  event
cmd.on('exit',  function(code, signal) { console.log('python process exited with code: ', code, ' and signal: ', signal) });	// matlab's "on exit"  event
cmd.on('close', function(code, signal) { console.log('python process closed with code: ', code, ' and signal: ', signal) });	// matlab's "on close" event
cmd.stdin.write("print 'output to stdout'\n");
cmd.stdin.write("open('deleteme.txt','w')\n"); // create deleteme.txt
cmd.stdin.write("exit()\n");
cmd.stdin.end();