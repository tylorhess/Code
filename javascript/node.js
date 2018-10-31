// node.js = server-side javascript (SSJS)
// linux: $ sudo apt-get install -y nodejs
// OS X: downloaded .dmg from nodejs.org
// 		installed into: /usr/local/bin/node
// 		make sure $PATH has /usr/local/bin in it:
//			$ echo $PATH
//			> ...:/usr/local/bin:...


--------------- execute node.js ---------------

// execute filename.js (using node command)
$ node filename.js --> msg 	// filename.js = console.log('msg');
$ ctrl+C 					// halt execution

// execute filename.js (without typing node)
$ chmod 777 filename.js 	// to be able to execute the file (chmod 777 = permission to read/write/execute file)
$ ./filename.js 			// executes	filename.js
/* filename.js (line 1): */ #!/usr/bin/env node 	// so bash uses node to execute 

// in-line commands
$ node -e "console.log('msg');" --> msg

// line-by-line commands
$ node
> console.log('msg'); --> msg
> ...
> .exit

-------------------- process --------------------
// access command-line arguments
$ node /path/to/filename.js arg1 arg2 arg3
> process.argv --> ['node', '/full/path/to/filename.js', 'arg1', 'arg2', 'arg3']	// full path, even if you didn't enter it

// process id
$ ps | grep node --> 28285 ttys000    0:00.14 node
> process.pid --> 28285

--------------- global variables ---------------
__dirname  --> "/Users/tylor" 				// similar to terminal's `$ pwd` 
__filename --> "/Users/tylor/filename.js"

-------------------- buffer --------------------
buf = new Buffer('str');	// creates Buffer from String
buf.toString();

-------------------- stream --------------------
// used: 
//		http 			req/res (request/response)
//		net (tcp) 		socket
//		fs 				createReadStream/createWriteStream
//		child_process 	stdin/stdout/stderr
//		process 		stdin/stdout/stderr
//		zlib			
//		crypto			
// types (of streams): 
//		Readable 			drainable reservoir (water tank + sink/output)
//		Writable 			fillable  reservoir (water tank + source/input)
//		Duplex (read/write) reservoir + drain/sink/output + spigot/source/input

writable.write();
	writable.write('msg'); 	// return true  = keep writing...
	writable.write(buf);	// return false = Stop! I'm backed up
readable.on('data', function(data) {}) /**/ data --> [Buffer Object]

readable.on('error', function(err) {}) /**/ err  --> [Error Object]

writable.end();  // Remember to .end() after .write()
writable.on('finish', function() {});	// after .end() event
readable.on('end', function() {});		// after .end() event

readable.pipe(writable); 	// input.pipe(output);   readable.pipe(writable);
readable.unpipe(writable);	// input.unpipe(output); readable.unpipe(writable);
writable.on('pipe',   function(src) {});  /**/ src --> [(Readable) Stream Object]
writable.on('unpipe', function(src) {});  /**/ src --> [(Readable) Stream Object]

readable.pause();
readable.resume();
readable.isPaused();

writable.cork();   // pauses (buffers all .write()en data)
writable.uncork(); // unpauses 

readable.unshift(data); 	/**/ data --> [Buffer Object]

readable.on('readable', function() {
	var data;
	while (null !== (data = stream.read())) {
		console.log('got %d bytes of data', chunk.length);
	}
});

writable.setDefaultEncoding('utf8');	/* sets: */ data --> [String] /* instead of: */ [Buffer Object]
readable.setEncoding('utf8');			/* sets: */ data --> [String] /* instead of: */ [Buffer Object]

// Custom Stream
var Stream = require('stream').Readable|.Writable|.Duplex|.Transform;
var util = require('util');
function CustomStream(options) { 	// options = {	objectMode: (false)|true,	 // false = .write(buf|"str")-only, true = .write(any_object)
	Stream.call(this, options);		//				decodeStrings: (false)|true, // false --> [Buffer Object], true --> [String]
	this.customVar = 0;				//				highWaterMark: (16)			 // max 'data' size? (16kb)
}									//			 }
util.inherits(CustomStream, Stream);
CustomStream.prototype.customFunc = function() {...};
CustomStream.prototype._read = function() {									// Readable  || Duplex
	// get 'data' (from "reservoir")
	if (/* end of data */)
		this.push(null);
	else
		this.push(data); // outputs 'data' = fire .on('data', ...) event
};
CustomStream.prototype._write = function(data, encoding, callback) { 		// Writeable || Duplex
	// save 'data' (to "reservoir")
	callback();	
};
CustomStream.prototype._transform = function(data, encoding, callback) {	// Transform-only
	// transform 'data'
	this.push(data); 	// outputs transformed 'data'
	callback();			// input next, untransformed 'data'
};

// see: "node_stream.js" (file) for more about Streams


-------------------- require --------------------
var mod = require('./modulename.js');	// .js is optional
var mod = require('./modulename');		// looks for modulename.(js|json|node) in that order (.node = compiled)
// avoid circular references/requires

// read/write json object from/to file
var obj = require('./file.json');		// loads an object saved to hard disk
require('fs').writeFile('./file.json', JSON.stringify(obj));	// write an object to hard disk

try {
	var mod = require('./nonexistent');
} catch (e) {
	e.code --> 'MODULE_NOT_FOUND'
}

---------------------------------------------
--------------- core modules ----------------
---------------------------------------------
// you need to: require('core_modules');
// but you don't need to: `npm install core_modules`


-------------------- modules --------------------
// modulename.js
require('module'); 				// creates (global?) variables: module & export
module.exports = function() {};
exports.var = {};
exports.func = function() {};

// filename.js (uses modulename.js)
var mod = require('./modulename');	// mod ~= javascript constructor (function)
var inst = mod(args); 				// inst = instance of module; args = initialization arguments
inst.var
inst.func()


-------------------- util --------------------
var util = require('util');			// can NOT simplify to: require('util').inherits(New, Old);
var NewClass = function() {...};	// (constructor)
util.inherits(NewClass, OldClass);	// place immediately after constructor 
// NewClass inherits from OldClass


---------------- fs (file system) ----------------
var fs = require('fs');

// Synchronous = wait until done before executing next line of javascript
// 		Note: read/write to file/harddrive is ~10,000 times slower than read/write to memory/RAM
var buf = fs.readFileSync('/path/to/filename.txt') --> [Buffer Object]

// Asynchronous = execute in parallel with next line of javascript 
fs.readFile('/path/to/filename.txt', function(err, fileContents){ fileContents --> [Buffer Object] });
fs.readdir('/path/to/directory/', function(err, filelist){ filelist --> [Array of Strings] });

// writeFile replaces file, if it already exists
fs.writeFile('./file.txt', 'line1');
fs.writeFile('./file.txt', 'line1', function(err) {if (err) throw err;});



function mkdir(dir, callback) {
	fs.mkdir(dir, function(err) {
		if (!err || err.code === 'EEXIST')	// if (success || directory exists already)
			callback();						//		continue...
		else 								// else if (err)	// unexpected error
			callback(err);					// 		continue with error message...
	});
}
// alternatively: npm mkdirp; var mkdirp = require('mkdirp'); mkdirp('/tmp/foo/', function (err) {...}); // mkdir -p (recursively)

-------------------- readline --------------------
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('sample.txt'),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  line --> [String]
  console.log(`Line from file: ${line}`);
});


-------------------- http --------------------
// http (web) server
var http = require('http');
var server = http.createServer(handler);				// handler = function <-- var express = require('express'); var app = express();
var server = http.createServer(function (req, res) {
	/* request */ req --> [(Readable) Stream Object] /* response */ res --> [(Writable) Stream Object]
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n');								// responds to every request with "Hello World"
});
server.listen(1337, '127.0.0.1');							// listens on http://127.0.0.1:1337/

// GET
http.get(process.argv[2], function (response) {
	/**/ response --> [Stream Object] 
	response.setEncoding('utf8')      		 			   /* sets: */ data --> [String]
	response.on("data", function(data) { console.log(data);  }); /* */ data --> [Buffer Object] // (below)
	response.on("error", function(err) { console.error(err); });
	response.on('end', function() {});
})

-------------------- net --------------------
// TCP server
var net = require('net');
var server = net.createServer(function (socket) {
	/**/ socket --> [(Duplex) Stream Object]	// ("duplex" = read & write)
	socket.pipe(socket);				// echos back whatever you send it
	socket.write('Echo server\r\n');
	socket.end('(optional) end msg');		// terminates socket.write
});
server.listen(1337, '127.0.0.1');		// listens on http://127.0.0.1:1337/
// to test:
//		$ nc localhost 1337

-------------------- url --------------------
var url = require('url');
var url_obj    =    url.parse('http://images.www.url.com:1338/api/user/3219?id=3219&pin=5542', true);
	url_obj.href 		  --> 'http://images.www.url.com:1338/api/user/3219?id=3219&pin=5542'
	url_obj.protocol	  --> 'http:'
	url_obj.slashes 	  -->      true
	url_obj.host 		  -->        'images.www.url.com:1338'
		url_obj.hostname  -->        'images.www.url.com'
		url_obj.port 	  -->                           '1338'
	url_obj.path 		  -->                                '/api/user/3219?id=3219&pin=5542'
		url_obj.pathname  -->                                '/api/user/3219'
		url_obj.search 	  -->                                              '?id=3219&pin=5542'
	url_obj.query  		  -->                                              {id:'3219',pin:'5542'}


-------------------- path --------------------
var path = require('path');									// Windows
var path_obj = path.parse('/home/user/dir/file.txt')		path.parse(C:\path\dir\file.txt)
	path_obj.root  -->    '/'									-->    C:\
	path_obj.dir   -->    '/home/user/dir'						-->    C:\path\dir
	path_obj.base  -->                   'file.txt'				-->                file.txt       
	path_obj.name  -->                   'file'					-->                file
	path_obj.ext   -->                       '.txt'				-->                    .txt

// terminology you'll find on the Internet (DOES NOT exactly correspond with `path` variable names)
// 		path          = folders + filename (all of the characters needed to identify a file on a filesystem)
//		relative path = relative paths start from current folder (e.g. - './' or '../../')
//		absolute path = absolute paths start from root folder (e.g. - '/')
// 		filename      = basename + extension (sometimes)
// 		basename      = filename - extension (sometimes)
// 		extention     = file extention


---------------- child_process ----------------
// execute bash|shell|Terminal command

//-------- exec (for simple commands) --------//
var cmd = require('child_process').exec('cat *.js bad_file | wc -l', function (error, stdout, stderr) {
	if (error ) { console.log('error: '  + error ); } // (error === null, when no error)
	if (stdout) { console.log('stdout: ' + stdout); }
	if (stderr) { console.log('stderr: ' + stderr); }
});

//----- spawn (for more complex commands) -----//
var cmd = require('child_process').spawn('command', ['-arg1 -arg2', '-arg3']);
var ls  = require('child_process').spawn('ls',      ['-la',  '/Users/tylor']);

// matlab
var mat = require('child_process').spawn('/Applications/MATLAB_R2015a.app/bin/matlab', ['-nojvm -nodisplay -nosplash']);

/* either 'error' or 'exit' is always fired before 'close' */
mat.on('error', function(err)          { console.err('ERROR: ',err) }); // fired (instead of 'exit') if error (e.g. - invalid bash command)
mat.on('exit',  function(code, signal) { console.log('matlab process exited with code: ', code, ' or signal: ', signal) });	// fired if no error
/* 'close' is always fired after either 'error' or 'exit' */
mat.on('close', function(code, signal) { console.log('matlab process closed with code: ', code, ' or signal: ', signal) });
	
	
mat.stdout.on('data', function(data) { console.log("stdout: "+data) });	 // stdout's "on data"  event
mat.stderr.on('data', function(data) { console.log("stderr: "+data) });	 // stderr's "on data"  event
mat.stdin.write("x=10 \n"); // outputs to stdout
mat.stdin.write("x=11;\n"); // DOES NOT output to stdout (because ';' means "suppress output" in matlab)
mat.stdin.write("quit;\n"); /* same as: */ mat.stdin.end(); /* similar to: */ mat.kill();
mat.stdin.end(); // terminates stdin [Writable Stream] (then terminates process, after executing all stdin commands)
mat.kill();

mat.removeAllListeners();
mat.removeAllListeners('close');
mat.stdout.removeAllListeners('data');

process.stdin.pipe(mat.stdin);	 // terminal input --> matlab input
mat.stdout.pipe(process.stdout); // matlab output  --> terminal output
mat.stderr.pipe(process.stderr); // matlab error   --> terminal error



// python
// var py = require('child_process').spawn('python');
// ...
// py.stdin.write("print 'output to stdout'\n"); // outputs to stdout
// py.stdin.write("open('deleteme.txt','w')\n"); // DOES NOT output anywhere that I know of (which is weird, because it does output when executed in bash terminal)
// py.stdin.write("exit()\n"); /* similar to: */ py.kill();
// py.stdin.end();

---------------- process ----------------
process // gloabl node variable, referencing the node process itself (NOT child processes)
process.stdin // see: [Stream]
process.stdin.write('typing'); // simulates: user typing into terminal
process.stdin.end();		   // simulates: ctrl+d (^D) = end of file (EOF) = exit running process (node)
process.stdout // see [Stream]
process.exit();  // success
process.exit(1); // failure
process.on('exit', function(code) {})


---------------- readline ----------------
var readline = require('readline');
// var rl = readline.createInterface(process.stdin, process.stdout);
var rl = readline.createInterface({
	input:  process.stdin,
	output: process.stdout//,
	// completer: function() {}, //
	// terminal: (false)|true, // false checks isTTY() on output stream upon instantiation; true treats input/output streams as TTY (has ANSI/VT100 escape codes written to it)
	// historySize: 30 // (default) line history length
});

rl.setPrompt('ty> ');   // (default) what to place before the cursor each time the user is prompted for input
rl.prompt();			// gets realine ready for user input

rl.write('typed'); // simulates typing into console/terminal
rl.write(null, {ctrl: true, name: 'u'}); // simulates typing ctrl+u (delete line)

console.log('output'); // outputs to console/terminal

rl.on('line', function(line) {
	line = line.trim();
	switch(line) {
		case 'close':
			rl.close(); // similar to: process.stdin.end() // ctrl+d (^D) || ctrl+c (^C)
			break;
		default:
			console.log('echo `' + line + '`');
			break;
	}
	rl.prompt(); // gets realine ready for user input
});

rl.on('close', function() { // fired: rl.close() || process.stdin.end() // ctrl+d (^D) || ctrl+c (^C)
	console.log('Have a great day!');
	process.exit(0);
});

---------------------------------------------
--------------- npm  modules ----------------
---------------------------------------------
// you need to: require('npm_modules'),
// and you need to: npm install npm_modules

-------------------- npm --------------------
// npm = Node Packaged Modules [npmjs.org]
// installed into: /usr/local/bin/npm
// make sure $PATH has /usr/local/bin in it:
// 		echo $PATH
// 		>> ...:/usr/local/bin:...

//---------- once per project ----------//
// first setup git/github
$ npm init // creates package.json via step-by-step guide

//---------- once per computer (if package.json exists) ----------//
// example: just cloned a git repo
$ npm install // installs all package.json dependencies onto this computer (in current directory)

//---------- once per `require('<package>')` ----------//
$ npm install <package> // defaults to: --save (as of npm 5.0)
$ npm install --save <package>	// installs <package> & adds <package> to package.json dependencies & saves a local copy of the package into ./node_modules/<package>/

// npm install options
$ npm install <package>			// installs to current directory
$ npm install -g <package>		// installs globally (entire computer)
$ npm install --save <package>	// installs & adds <package> to package.json dependencies & saves a local copy of the package into ./node_modules/<package>/
$ npm install 					// installs package.json dependencies to current directory
// package.json = actual JSON (Note: "quotes"), NOT object literal (without quotes)
{
	"name": "module-name", 	/* required */
	"version": "10.3.1",		/* required */
	"description": "An example module to illustrate the usage of a package.json",
	"author": "Your Name <you.name@example.org>",
	"contributors": [
		{
			"name": "Foo Bar",
			"email": "foo.bar@example.com"
		}
	],
	"dependencies": { 		/* dependencies */
		"express": "4.2.x",
		"primus": "*",
		"async": "~0.8.0",
		"winston": "git://github.com/flatiron/winston#master",
		"bigpipe": "bigpipe/pagelet",
		"plates": "https://github.com/flatiron/plates/tarball/master"
	},
	"devDependencies": {		/* developer dependencies */
		"vows": "^0.7.0",
		"assume": "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0",
		"pre-commit": "*"
	},
	"bin": {
		"module-name": "./bin/module-name"
	},
	"scripts": {
		"test": "vows --spec --isolate",
		"start": "node index.js",
		"predeploy": "echo im about to deploy",
		"postdeploy": "echo ive deployed",
		"prepublish": "coffee --bare --compile --output lib/foo src/foo/*.coffee"
	},
	"main": "lib/foo.js",
	"repository": {
		"type": "git",
		"url": "https://github.com/nodejitsu/browsenpm.org"
	},
	"bugs": {
		"url": "https://github.com/nodejitsu/browsenpm.org/issues"
	},
	"keywords": [
		"nodejitsu",
		"example",
		"browsenpm"
	],
	"preferGlobal": true,
	"private": true,
	"publishConfig": {
		"registry": "https://your-private-hosted-npm.registry.nodejitsu.com"
	},
	"subdomain": "foobar",
	"analyze": true,
	"license": "MIT"
}

$ npm list|ls 	// list all installed packages (and their dependent packages)



-------------------- express --------------------
var express = require('express');
var app = express();				// app = function = http.createServer(app)
var port = 3002;

//----- parse: req.body --------------------//
// to parse contentType: 'application/json' 				{"a":0,"b":{"c":1}}		$.ajax({contentType: 'application/json'}) 
var bodyParser = require('body-parser');
app.use(bodyParser.json());
// to parse contentType: 'application/x-www-form-urlencoded'  a=0&b[c]=1 			$.ajax({contentType: 'application/x-www-form-urlencoded'})
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// to parse contentType: 'multipart/form-data' 										$.ajax({contentType: 'multipart/form-data'})
var multer = require('multer');
app.use(multer());

//--------- app.use (static server) ---------//
app.use('/', express.static(__dirname)); 		--> res.sendFile(__dirname+'/'+req.path)

//-------------- app.route --------------//
app.route('/user/:id')
	.get( function(req, res) {...}) // get user
	.post(function(req, res) {...}) // create new user
	.put( function(req, res) {...}) // update user

//-------------- app.get|post --------------//
// one callback function
app.get( '/user', /* parser, */ callback); 
app.get( '/user', /* parser, */ function(req, res) {...});

// sequence of callback functions
app.post('/user', /* parser, */ [cb0, cb1, ..., cb3]); // in cb0, next = cb1; in cb1, next = cb2; cb3 has no next() function
app.post('/user', /* parser, */ function(req, res, next) {...; next();}, ..., function(req, res) {...});

// route using: req.params
app.post('/user/:id/photo/:pid',       function(req, res) {...});
	req.params.uid 		--> 219836
	req.params.pid 		--> 8123
app.post('/file/*',         function(req, res) {...});
	req.params[0]       --> "css/style.css"

// pseudo-RegExp [String]
app.get([String],   function(req, res) {...});
app.get('/ab?cd',   function(req, res) {...}); // matches: 'acd' & 'abcd' (optional  'b')
app.get('/(ab)?cd', function(req, res) {...}); // matches:  'cd' & 'abcd' (optional 'ab')
app.get('/ab+cd',   function(req, res) {...}); // matches: 'acd' & 'abcd' & 'abbbbcd' (optional # of b's)
app.get('/ab*cd',   function(req, res) {...}); // matches:         'abcd' & 'abXXXcd' (anything between 'ab' & 'cd')

// [RegExp]
app.get([RegExp], function(req, res) {});
app.get(/a/,      function(req, res) {}); // any route with an 'a' in it
app.get(/.*fly$/, function(req, res) {}); // any route that ends with 'fly'?

//----- app.listen (start server) -------//
app.listen(port);
app.listen(port, callback);
app.listen(port, function() { console.log('listening at http://localhost:'+port); });



//---------- req ----------//
req --> [Stream Object] (Readable)

// require('body-parser') || require('multer')
// 		POST/GET: { "a":0, "b":{"c":1} } 		// JSON encoding   "application/json"
// 		POST/GET: a=0&b[c]=1 					// URL encoding    "application/x-www-form-urlencoded"
req.body
	req.body.a   --> "0" /* URL */   --> 0 /* JSON */
	req.body.b.c --> "1" /* URL */   --> 1 /* JSON */

// GET: a=0&b[c]=1 	// URL encoding
req.query
	req.query.a   --> "0"
	req.query.b.c --> "1"

// GET: http://images.www.url.com:1337/folder/file.html?a=0&b[c]=1
req.protocol 	--> "http"
req.subdomains  --> ["www", "images"]
req.hostname 	--> "url.com"
req.ip 			--> "18.123.204.98" 				// (if "trust proxy" setting is enabled)
req.path 		--> "folder/file.html" 				// url path
req.orginalUrl 	--> "/folder/file.html?a=0&b[c]=1" 	// echos everything after hostname:port

// GET: url.com/user/tylor (routing: /user/:name)
req.params.name --> "tylor"
// GET: url.com/file/js/file.js (routing: /file/*)
req.params[0]   --> "js/file.js"

// other stuff... 
req.route
req.app
req.ips --> ["client", "proxy1", "proxy2"]  // (if "trust proxy" setting is true)
req.baseUrl /* similar to */ app.mountpath
req.secure /* same as */ (req.protocol === 'https')
// req.cookies && req.signedCookies
// req.fresh && req.stale
// req.xhr

//--------------- res ---------------//
res --> [Stream Object] (Writable)

res.end(); // (at the top) sends "empty" response (no data)

res.write();		// streaming response
	res.write('msg');				// String
	res.write(buf); 				/* Buffer */ new Buffer('msg') // (creates Buffer from String)
res.send('msg');	// non-streaming response
	res.send('msg');				// String
	res.send(buf); 					/* Buffer */ new Buffer('msg') // (creates Buffer from String)
	res.send({});					// Object
	res.send([]);					// Array

res.json();


res.attachment('/path/to/filename.jpg');
// HTTP Response Header
//		Content-Disposition: attachment; filename="filename.jpg"
//		Content-Type: image/jpg
res.download('/report-12345.pdf');
res.download('/report-12345.pdf', 'report.pdf');
res.download('/report-12345.pdf', 'report.pdf', function(err){ if (err) {/* so check res.headersSent (response may be partially-sent) */} else {/* decrement a download credit, etc. */} });
// HTTP Response Header
//		Content-Disposition: attachment; filename="report-12345.pdf"
res.sendFile('filename.txt', options, function (err) {if (err) {console.log(err); res.status(err.status).end();} else {console.log('Sent:', fileName);}});
var options = {
	root: __dirname + '/public/',
	dotfiles: 'deny',
	headers: {
		'x-timestamp': Date.now(),
		'x-sent': true
	}
};

res.sendStatus(200); // send HTTP response status 200 (success)

// HTTP Response Header
res.append('field', 'value'); 			// appends field=value to 
	res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>']);
	res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly');
	res.append('Warning', '199 Miscellaneous warning');

res.set('Content-Type', 'text/plain');	// sets field=value
res.set({
	'Content-Type': 'text/plain',
	'Content-Length': '123',
	'ETag': '12345'
})

res.end(); // (at the bottom) closes the response


------------------- request -------------------
// better than http/https:
// 		does both http/https
// 		follows redirects 

var request = require('request');

// request
request('http://url.com', callback) // GET (by default)
request('http://url.com', function(err, res, body) {...})
request(options, callback)
request(options, function(err, res, body) {...})
{ /* options */ 					/* callback */	
	url: 'http://url.com', 			function(err, res, body) {
	method: 'GET',						if (err) console.error(err);
	headers: {...},						else if (res.statusCode === 200) // 200 = "OK" (HTTP success)
	qs: {a:1, b:"y"},						 console.log(body); // (body === res.body) --> <html> from url.com
	...									else console.error('Error Code: '+res.statusCode);
},									}

// GET 
request(options, function(err, res, body) {...})		options = {	url:'http://url.com', method:'GET', qs:{/*data*/} }
request
	.get(options)										options = { url:'http://url.com', qs:{/*data*/} }
	.on('error',    function(err) {...})
	.on('response', function(res) {...})
request
	.get('http://url.com', options)						options = { qs:{/*data*/} }
	.on('error',    function(err) {...})
	.on('response', function(res) {...})
request
	.get('http://url.com')
	.json({/*data*/})
	.on('error',    function(err) {...})
	.on('response', function(res) {...})

// HTTP methods
request
	.post('http://url.com')     |    .post('http://url.com', options)     |    .post(options)
	.get...
	.put...
	.del...
	.patch...

// headers
request...
	.headers({...})

// data
request...
	.form({a=0})  |  options = { form:{a=0} } // Content-type: application/x-www-form-urlencoded  Body: a=0    Querystring:
	.json({a=0})  |  options = { json:{a=0} } // Content-type: application/json                   Body: {a=0}  Querystring:
	.qs({a=0})    |  options = { qs:  {a=0} } // Content-type:                                    Body:        Querystring: ?a=0
	.qs({a=0}) /* same as: */ 'http://url.com/?a=0' // can mix-and-match both apporaches: .qs() & appending to url

// event listeners
request...
	.on('error',    function(err) {...})
	.on('response', function(res) {...})

// pipe
request...
	.pipe(ws)

rs.pipe(ws)

// readstreams
var rs = request.get('http://url.com/file.json')
		 = fs.createReadStream('file.json')
		 = req // request

// writestreams
var ws = request.put('http://url.com/file.json')
		 = fs.createWriteStream('file.json')
		 = res // response



// download files
var request = require('request');
var fs = require('fs');
function download(file, callback) { 		// file = {
	var f = fs.createWriteStream(file.path)	//		path: './file.js'
		.on('error', onerror)				//		url: 'url.com/file.js',
		.on('finish', callback);			//	}
	// var req = request.get(file.url)
	// 	.on('error', onerror)
	// 	.pipe(f);
	try {
		var req = request(file.url)
			.pipe(f);
	} catch(err) {
		onerror(err);
	}
	function onerror(err){
		fs.unlink(file.path/*, callback */); // delete file at file.path, and continue without waiting for unlink's callback
		if (callback)
			callback(err);
		else
			console.error(err);
	}
}

// var http  = require('http' );
// var https = require('https');
// var fs = require('fs');
// function download(file, callback) { // file = {url: 'http://url.com/file.js', path: './file.js'}
// 	var http_;
// 	var protocol = url.parse(file.url).protocol;
// 	if      (protocol === 'http:')
// 		http_ = http;
// 	else if (protocol === 'https:')
// 		http_ = https;
// 	else
// 		callback(new Error("Unexpected protocol '"+protocol+"' (Expected 'http:' or 'https:')"));
// 	// what if 'url.com'? instead of 'http://url.com'?
// 	if (http_) {
// 		var f = fs.createWriteStream(file.path);
// 		f.on('finish', function() {
// 			f.close(callback);  // callback() after f [(Writable) Stream] is closed
// 		});
// 		var req = http_.get(file.url, function(res) {
// 			res.pipe(f);
// 		})
// 		req.on('error', function(err) {
// 			fs.unlink(file.path/*, callback */); // delete file at file.path (no callback)
// 			if (callback) 
// 				callback(err);
// 		});
// 	}
// }
// inspired by: http://stackoverflow.com/a/22907134/2604541



-------------------- socket.io (v 1.3.5) --------------------
/* server */									/* client */
												<script> 
var ns = io.of('/') = io.sockets; 			 		var skt = io.connect('/');		   /* or */ io.connect('http://url.com');
var ns = io.of('/namespace');						var skt = io.connect('/namespace'); /* or */ io.connect('http://url.com/namespace');
skt.emit('custom event', 'msg');					skt.on('custom event', function(msg) {});
skt.emit('custom event',  {}  );					skt.on('custom event', function(obj) {});
skt.on('custom event', function(msg) {});			skt.emit('custom event', 'msg');
skt.on('custom event', function(obj) {});			skt.emit('custom event',  {}  );
skt.on('connection', function(socket) {});			
												</script>

--------------- server API ---------------
	/* socket.io */								/* express */									
												var express = require('express');
												var app = express();
												var http = require('http');
												var server = http.createServer(app);
	var io = require('socket.io')(port);		var io = require('socket.io')(server);
												server.listen(port);

	----- var io --> [Server Object] -----
	// server
	var io = require('socket.io')();		/* same as */ 	var Server = require('socket.io'); var io = new Server();
	var io = require('socket.io')(port);	/* same as */ 	var Server = require('socket.io'); var io = new Server(port);
	var io = require('socket.io')(server);	/* same as */	var Server = require('socket.io'); var server = http.createServer(/*handler function like express app*/) var io = new Server(server);
	// server options (optional)
	var io = require('socket.io')(port, options);
	var io = require('socket.io')(server, options);
		var options = {
			serveClient: false, // (true)|false
			path: '/path/to/...'
		}
	// server options (optional)
	io.attach(port, options)
	io.attach(server, options)
		io.serveClient(true|false);
		io.path('/path/to/...');

	// io object
	io.sockets === io.of('/')          === io.nsps['/']
					 io.of('/namespace') === io.nsps['/namespace']
	io.sockets              --> ['/' Namespace Object]
	io.of('/namespace') 	--> ['/namespace' Namespace Object]
	io.nsps 				--> {'/':['/' Namespace Object], '/namespace':['/namespace' Namespace Object], ... }
	
	io.httpServer
	io.engine	

	----- var io ~~> [Namespace Object] -----
	// io sometimes acts like namespace (io.sockets)
	io.emit() === io.sockets.emit() === io.of('/').emit()
		io.emit('msg')
		io.emit( {}  )
	io.on()   === io.sockets.on()   === io.of('/').on()
		io.on('connection', function(socket) {});
		io.on('custom event', function(msg|obj) {});

	----- var ns --> [Namespace Object] -----
	// namespace = group of sockets 
	var ns = io.of('/namespace') --> ['/namespace' Namespace Object]
	
	ns.emit()					 // sends 'msg'|{} to all ns.sockets' skt.client
		ns.emit('msg')
		ns.emit( {}  )
	ns.on()
		ns.on('connection', function(socket) {});
		ns.on('custom event', function(msg|obj) {});

	ns.name 					 --> '/namespace'
	ns.sockets 					 --> [Array of Sockets]
	ns.connected 				 --> { "uNj7FkNf":[Socket Object], "KNd8gFDo":[Socket Object], ... }
	ns.connected[socket.id] 	 --> [Socket Object]
	ns.ids // same as ns.connected?
	ns.server 	 				 --> [Server Object] = io
	.fns | .acks
	ns.adapter
	ns.use(func) 				 // same as io.use(func)
	

	----- var client --> [Client Object] -----
	// client         = server-side representation of client/connection/browser window
	// client.conn.id = 1 unique id per client/connection/browser window
	// client 		  = creates 1 socket (for default namespace '/'), +1 socket for each additional namespace
	// client.sockets = [Array of Sockets]
	var client = skt.client;

	client.server  	--> [Server Object] = io
	client.conn 	--> [engine.io Socket Object] = { id: 'bdeavLbi5ko6QVA1AAAA' /* same as: skt.id */,server: [Object],upgraded: true,readyState: 'open',writeBuffer: [],packetsFn: [],sentCallbackFn: [],request: [Object],remoteAddress: '::1',checkIntervalTimer: null,upgradeTimeoutTimer: [Object],pingTimeoutTimer: [Object],transport: [Object],_events: [Object] }
	client.sockets 	--> [Array of Sockets]
	client.request
	client.nsps 	--> {'/':['/' Namespace Object], '/namespace':['/namespace' Namespace Object], ... }
	.encoder | .decoder
	.onclose | .ondata | .onerror | .ondecoded
	.connectBuffer

	----- var skt --> [Socket Object] -----
	// socket = every client creates 1 socket (for default namespace '/'), +1 socket for each additional namespace
	//		  = each socket only has 1 client/connection
	//		  = each socket only has 1 namespace, so a client creates a new socket for each namespace

io.on('connection', function(skt) {
	
	skt.id === skt.conn.id === skt.client.conn.id --> "bdeavLbi5ko6QVA1AAAA"  // 1 unique id per client/connection/browser window
	
	skt.emit()				// sends 'msg'|{} to the client-side skt with the same namespace (skt.nsp) through skt.client
		skt.emit('msg')
		skt.emit( {}  )
	skt.on()
		skt.on('disconnect', function() {})
		skt.on('custom event', function(msg|obj) {})

	skt.rooms 	--> [Array of Strings] = ['room1', 'room2', 'socket.id'... ] // by default, a room is created for each socket.conn.id
	skt.join('room')
	skt.join('room', callback)
	skt.leave('room')
	skt.leave('room', callback)
	skt.to('room').emit()
	skt.in('room').emit()

	skt.nsp     --> [Namespace Object] 	// (I think) skt.nsp is the only difference between sockets with same skt.client
	skt.server  --> [Server Object] = io
	skt.client 	--> [Client Object]
	skt.conn === skt.client.conn  --> /* [engine.io Socket Object] */ { id: 'bdeavLbi5ko6QVA1AAAA' /* same as: skt.id */,server: [Object],upgraded: true,readyState: 'open',writeBuffer: [],packetsFn: [],sentCallbackFn: [],request: [Object],remoteAddress: '::1',checkIntervalTimer: null,upgradeTimeoutTimer: [Object],pingTimeoutTimer: [Object],transport: [Object],_events: [Object] }
	skt.connected    --> true  | false
	skt.disconnected --> false | true
	
	skt.adapter
	skt.request
	skt._events --> { disconnect: [Function], 'custom event': [Function] }

});

	----- var adapter --> [Adapter Object] -----
	// adapter???
	var adapter = ns.adapter;

	adapter.nsp 	--> [Namespace Object]
	adapter.rooms	--> { "room1":[??? Object], "room2":[??? Object], <socket.id>:[??? Object], "KNd8g...":[??? Object], ... }
	adapter.sids 	--> /* socket ids? */ { <socket.id>:[Socket? Object], "KNd8g...":[Socket? Object], "uNj7F...":[Socket? Object], ... }
	adapter.encoder --> {} // empty object



------------ client (browser) API -------------
<script src="/socket.io/socket.io.js"></script>	// socket.io serves up "socket.io.js" file (I think)
<script> /* OR (if require is installed) */ require('socket.io-client');
	

	----- var skt --> [Socket Object] -----
	var skt = io() = io.connect() 											var skt = new io.Socket(); skt.connect();
	var skt = io(); // uses url.com/namespace (I think)
	var skt = io('/');		    /* or */ io('http://url.com');
	var skt = io('/namespace'); /* or */ io('http://url.com/namespace');

	skt.emit('custom event to server', str|obj);
	skt.on('custom event from server', function(str|obj) {});

	skt.connect('/namespace');
	skt.disconnect()
	skt.connected    --> true  | false
	skt.disconnected --> false | true
	skt.nsp          --> '/'   | '/namespace'	// each socket only has 1 namespace
	skt.io           --> [Manager Object]

	// Socket-only
	skt.on('error', 			function(err) {});
	// shared with Manager
	skt.on('connect',           function()    {});
	skt.on('disconnect', 		function()    {});
	skt.on('reconnect_attempt', function()    {});
	skt.on('reconnecting',      function(n)   {});		// n-th reconnect attempt
	skt.on('reconnect_error',   function(err) {});
	skt.on('reconnect_failed',  function()    {});		// fires after n = max # attempts (set {reconnectionAttempts: [Number]})
	skt.on('reconnect',         function(n)   {});		// successful reconnection (on n-th attempt)
	

	----- var mgr --> [Manager Object] -----
	// manager = connection to socket.io server
	// similar to server-side skt.client?
	
	var mgr = skt.io --> [Manager Object]									var mgr = new io.Manager(); mgr.connect();

	mgr.emit('custom event to server', str|obj);
	mgr.on('custom event from server', function(str|obj) {});

	mgr.connect('/namespace'); --> [Manager Object]
	mgr.disconnect()
	mgr.connected 	  --> [Array of Sockets]
	mgr.nsps 		  --> {'/':[Socket Object], '/namespace':[Socket Object], ... } // shouldn't [Socket Object] be [Array of Sockets] ?
	mgr.attempts 	  --> [Number]
	mgr.autoConnect   --> (true)  | false
	mgr.skipReconnect --> (false) | true

	// Manager-only
	mgr.on('connect_err',       function(err) {});	// mgr-only
	mgr.on('connect_timeout',   function()    {});	// mgr-only
	// shared with Socket
	mgr.on('connect',           function()    {});
	mgr.on('disconnect', 		function()    {});
	mgr.on('reconnect_attempt', function()    {});
	mgr.on('reconnecting',      function(n)   {});	// n-th reconnect attempt
	mgr.on('reconnect_error',   function(err) {});
	mgr.on('reconnect_failed',  function()    {});	// fires after n = reconnectionAttempts = max # attempts
	mgr.on('reconnect',         function(n)   {});	// successful reconnection (on n-th attempt)
	
	
	// [Emitter Object]

</script>




io.on('connection', function(socket) {
	console.log('a user connected');
	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
		io.emit('chat message', msg);
	});
	socket.on('disconnect', function(){ console.log('user disconnected'); });
});

http.listen(3000, function(){ console.log('listening on *:3000'); });

//---------- client ----------//
<script src="http://cdn.socket.io/socket.io-1.2.0.js"></script>
<script>
	var socket = io();
	$('#form').submit(function(){						// #form .onclick
		socket.emit('chat message', $('#input').val());	// 		send user input to server
		$('#input').val('');							// 		clear user input
		return false;
	});
	socket.on('chat message', function(msg) {
		$('#messages').append($('<li>').text(msg));
	});
</script>

--------------- strftime --------------- 
// format Date & Time string
var strftime = require('strftime');

// usage
strftime('%B %d, %Y %H:%M:%S');		/* implied */ new Date() //???
strftime('%F %T', new Date(1307472705067));

// formatting
	A: full weekday name
	a: abbreviated weekday name
	B: full month name
	b: abbreviated month name
	C: AD century (year / 100), padded to 2 digits
	c: equivalent to %a %b %d %X %Y in en-US (based on locale)
	D: equivalent to %m/%d/%y in en-US (based on locale)
	d: day of the month, padded to 2 digits (01-31)
	e: day of the month, padded with a leading space for single digit values (1-31)
	F: equivalent to %Y-%m-%d in en-US (based on locale)
	H: the hour (24-hour clock), padded to 2 digits (00-23)
	h: the same as %b (abbreviated month name)
	I: the hour (12-hour clock), padded to 2 digits (01-12)
	j: day of the year, padded to 3 digits (001-366)
	k: the hour (24-hour clock), padded with a leading space for single digit values (0-23)
	L: the milliseconds, padded to 3 digits [Ruby extension]
	l: the hour (12-hour clock), padded with a leading space for single digit values (1-12)
	M: the minute, padded to 2 digits (00-59)
	m: the month, padded to 2 digits (01-12)
	n: newline character
	o: day of the month as an ordinal (without padding), e.g. 1st, 2nd, 3rd, 4th, ...
	P: "am" or "pm" in lowercase (Ruby extension, based on locale)
	p: "AM" or "PM" (based on locale)
	R: equivalent to %H:%M in en-US (based on locale)
	r: equivalent to %I:%M:%S %p in en-US (based on locale)
	S: the second, padded to 2 digits (00-60)
	s: the number of seconds since the Epoch, UTC
	T: equivalent to %H:%M:%S in en-US (based on locale)
	t: tab character
	U: week number of the year, Sunday as the first day of the week, padded to 2 digits (00-53)
	u: the weekday, Monday as the first day of the week (1-7)
	v: equivalent to %e-%b-%Y in en-US (based on locale)
	W: week number of the year, Monday as the first day of the week, padded to 2 digits (00-53)
	w: the weekday, Sunday as the first day of the week (0-6)
	X: equivalent to %D in en-US (based on locale)
	x: equivalent to %T in en-US (based on locale)
	Y: the year with the century
	y: the year without the century (00-99)
	Z: the time zone name, replaced with an empty string if it is not found
	z: the time zone offset from UTC, with a leading plus sign for UTC and zones east of UTC and a minus sign for those west of UTC, hours and minutes follow each padded to 2 digits and with no delimiter between them

-------------------- async --------------------
// download files asynchronously (limit: 5 at a time)
var async = require('async');
async.eachLimit(['file01.txt',...,'file99.txt'], 5, function(file, callback) {...}, function(err){...});

-------------------- x-ray --------------------
// web scraping
var Xray = require('x-ray'); // Note: dash ('-')
var xray = new Xray();

xray(url, jQuerySelector, whatToScape).write('/path/to/filename.json')
xray(url, jQuerySelector, whatToScape).(callback)
xray(url, jQuerySelector, whatToScape).(function(err, result) {...})

xray('http://url.com', 'a', 
	[{
		//canBeAnything: 'selector',
		innerHtml: '',
		href: '@href', // grabs 'http://link.com' (the href value) for each <a> element
		class: '@class' // grabs class(es) for each <a> element
	}]	
).write('./results.json')

xray('http://url.com', 'img', 
	[{
		//canBeAnything: 'selector',
		src: '@src',
		width: '@width',
		height: '@height'
	}]	
)(function(err, results) {
	require('fs').writeFile('./results.json', JSON.stringify(results, null, '\t'))
})

xray('http://url.com', '#id', 
	[{
		//canBeAnything: 'selector',
		innerHtml1: '.className', // get contents of html with class="className"
		href: 'div:nth-child(3) a@href'
	}]	
)

-------------------- download --------------------
var Download = require('download');
var download = new Download();

download.dest('/path/to/download/folder')
download.get('http://url1.com');
download.get('http://url2.com');
download.get('http://url3.com');
...
download.run();

-------------------- jquery --------------------
// server-side jQuery

-------------------- coffee-script --------------------
// shorthand javascript

-------------------- underscore --------------------

-------------------- backbone --------------------
// model-view-presenter (MVP) app design

//------------------ css-sprite ------------------ // now called 'sprity'
-------------------- sprity --------------------
// turn many images into one image + .css file

--------------- mongodb --------------- 
// NoSQL database

-------------------- mongoose --------------------

-------------------- sequelize --------------------
// maps js objects to sql (relational database)

