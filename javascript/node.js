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

--------------- console (stdout) ---------------
console.log('msg');
console.error(err); // err = Error object

-------------------- process --------------------
// access command-line arguments
$ node /path/to/filename.js arg1 arg2 arg3
> process.argv --> ['node', '/full/path/to/filename.js', 'arg1', 'arg2', 'arg3']	// full path, even if you didn't enter it

// process id
$ ps | grep node --> 28285 ttys000    0:00.14 node
> process.pid --> 28285

--------------- global variables ---------------
__dirname  --> "/Users/tylor"
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

-------------------- util --------------------
var util = require('util');			// can NOT simplify to: require('util').inherits(New, Old);
var NewClass = function() {...};	// (constructor)
util.inherits(NewClass, OldClass);	// place immediately after constructor 
// NewClass inherits from OldClass


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
	e.code --> MODULE_NOT_FOUND
}

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





---------------------------------------------
--------------- core modules ----------------
---------------------------------------------



---------------- fs (file system) ----------------
var fs = require('fs');

// Synchronous = wait until done before executing next line of javascript
// 		Note: read/write to file/harddrive is ~10,000 times slower than read/write to memory/RAM
var buf = fs.readFileSync('/path/to/filename.txt') --> [Buffer Object]

// Asynchronous = execute in parallel with next line of javascript 
fs.readFile('/path/to/filename.txt', function(err, fileContents){ fileContents --> [Buffer Object] });
fs.readdir('/path/to/directory/', function(err, filelist){ filelist --> [Array of Strings] });

fs.writeFile('./file.txt', 'line1');
fs.writeFile('./file.txt', 'line1', function(err) {if (err) throw err;});

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
		url_obj.search 	  -->                                '?id=3219&pin=5542'
	url_obj.query  		  --> 								{id:'3219',pin:'5542'}


---------------- child_process ----------------
// execute bash|shell|Terminal command

//  exec (for simple commands)
var exec = require('child_process').exec;
var cmd = exec('cat *.js bad_file | wc -l', function (error, stdout, stderr) {
	console.log('stdout: ' + stdout);
	console.log('stderr: ' + stderr);
	if (error !== null) {console.log('exec error: ' + error);}
});

//  spawn (for more complex commands)
var spawn = require('child_process').spawn;
var cmd = spawn('ls', ['-la', '/Users/tylor']);
cmd.stdout.on('data', function(data) { console.log("stdout: "+data) });	// stdout's  "on data"  event
cmd.stderr.on('data', function(data) { console.log("stderr: "+data) });	// stderr's  "on data"  event
cmd.on('close', function(code) { if (code!==0) console.log("exit code: "+code); });	// command's "on close" event
cmd.stdin.write(data);






---------------------------------------------
--------------- npm  modules ----------------
---------------------------------------------

-------------------- npm --------------------
// npm = Node Packaged Modules [npmjs.org]
// installed into: /usr/local/bin/npm
// make sure $PATH has /usr/local/bin in it:
// 		echo $PATH
// 		>> ...:/usr/local/bin:...

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



-------------------- jquery --------------------
// server-side jQuery

-------------------- sequelize --------------------
// maps js objects to sql (relational database)

-------------------- mongoose --------------------
var mongoose = require('mongoose');
mongoose.connect();

-------------------- coffee-script --------------------
// shorthand javascript

-------------------- backbone --------------------
// model-view-presenter (MVP) app design

--------------- css-sprite --------------- 
// turn many images into one image + .css file

--------------- mongodb --------------- 
var mongoClient = require('mongodb').MongoClient;

var port = 27017;
var host = "localhost";
var database = "ticker";
var collName = "ticker";
var url = "mongodb://"+host+":"+port+"/"+database;


mongoClient.connect(url, function(dbErr, db){
	if (dbErr)
		console.log(dbErr); 
	
	db.collection(collName, {w:1}, function(collErr, collection) {
		if (collErr)
			console.log(collErr);
		
		collection.find().toArray(function(findErr, items) {
			if (findErr)
				console.log(findErr);
			//for (object in items)
			for (var i = 0; i < 10 && i < items.length; i++)
				console.log(items[i]);
		});
	});
});

-------------------- express --------------------
var express = require('express');
var app = express();				// app = function = http.createServer(app)

// static file server (app.configure)
var express = require('express');
var app = express();
app.configure(function(){
	app.use('/', express.static(__dirname));
	//app.use('/public', express.static(__dirname+'/public'));
		--> appurl.com/filename.html 	<-- ./filename.html
		--> appurl.com/folder/file.html <-- ./folder/file.html
});
app.listen(1337); // listening on: http://localhost:1337/

// POST/GET request (app.post/app.get)
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // to parse: a=0&b[c]=1 			$.ajax({contentType: 'application/x-www-form-urlencoded'})
app.use(bodyParser.json()); 						// to parse: {"a":0,"b":{"c":1}}	$.ajax({contentType: 'application/json'}) 
var multer = require('multer'); 
app.use(multer()); 									// to parse: "multipart/form-data"

 app.post('/user', /* parser, */ function(req, res) {
//app.get('/user' , /* parser, */ function(req, res) {
	
	---------- req ----------
	req --> [Stream Object] (Readable)

	// require('body-parser')
	// POST/GET: a=0&b[c]=1 				// URL encoding    "application/x-www-form-urlencoded"
	// POST/GET: { "a":0, "b":{"c":1} } 	// JSON encoding   "application/json"
	req.body
		req.body.a   --> "0" /* URL */   --> 0 /* JSON */
		req.body.b.c --> "1" /* URL */   --> 1 /* JSON */

	// GET: a=0&b[c]=1 	// URL encoding
	req.query
		req.query.a   --> "0"
		req.query.b.c --> "1"

	// GET http://images.www.url.com:1337/folder/file.html?a=0&b[c]=1
	req.protocol 	--> "http"
	req.subdomains  --> ["www", "images"]
	req.hostname 	--> "url.com"
	req.ip 			--> "18.123.204.98" 				// (if "trust proxy" setting is enabled)
	req.path 		--> "folder/file.html" 				// url path
	req.orginalUrl 	--> "/folder/file.html?a=0&b[c]=1" 	// echos everything after hostname:port
	
	// GET url.com/user/tylor (routing: /user/:name)
	req.params.name --> "tylor"
	// GET url.com/file/js/file.js (routing: /file/*)
	req.params[0]   --> "js/file.js"

	// other stuff... 
	req.route
	req.app
	req.ips --> ["client", "proxy1", "proxy2"]  // (if "trust proxy" setting is true)
	req.baseUrl /* similar to */ app.mountpath
	req.secure /* same as */ ('https' == req.protocol)
	// req.cookies && req.signedCookies
	// req.fresh && req.stale
	// req.xhr

	--------------- res ---------------
	res --> [Stream Object] (Writable)

	res.end(); 			// sends "empty" response (no data)
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
	//		Content-Disposition: attachment; filename
	//		Content-Type: 

	res.append('field', 'value'); // appends field=value to HTTP Response Header
		res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>']);
		res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly');
		res.append('Warning', '199 Miscellaneous warning');
	res.set

});
app.listen(1337); // listening on: http://localhost:1337/


// manually create
app.get('/file/:name', function (req, res, next) {
	var options = {
		root: __dirname + '/public/',
		dotfiles: 'deny',
		headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}
	}
	var fileName = req.params.name;
	res.sendFile(fileName, options, function (err) {
		if (err) {
			console.log(err);
			res.status(err.status).end();
		}
		else {
			console.log('Sent:', fileName);
		}
	});

});


--------------- body-parser ---------------
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

// JSON encoding [POST/GET]
// 		$.ajax({
//			"contentType": "application/json", "data":{"user":"tylor"}})
url.com/api/users + JSON encoding = 

app.post('/api/users', bodyParser.json(), function (req, res) {
  if (!req.body) return res.sendStatus(400)
  // create user in req.body 
})

// URL encoding [POST/GET]
// 		url.com/login?user=tylor&pass=P@$$  (URL encoding: "application/x-www-form-urlencoded")
app.post('/login', bodyParser.urlencoded({extended:false}), function (req, res) {
	if (!req.body) 
		return res.sendStatus(400)
	res.send('welcome, ' + req.body.user)
})


-------------------- socket.io (v 1.3.5) --------------------

---------- socket.io (server API) ----------
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



----------- socket.io (browser API) -----------
<script src="/socket.io/socket.io.js"></script>	// socket.io serves up "socket.io.js" file (I think)
<script> OR require('socket.io-client');
	

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



----------- socket.io (server vs. browser) ----------
/* server */									/* client */
												<script> 
var ns = io.of('/') = io.sockets; 			 		var skt = io.connect('/');		   /* or */ io.connect('http://url.com');
var ns = io.of('/namespace');						var skt = io.connect('/namespace'); /* or */ io.connect('http://url.com/namespace');
skt.emit('custom event', 'msg');					skt.on('custom event', function(msg) {});
skt.emit('custom event',  {}  );					skt.on('custom event', function(obj) {});
skt.on('custom event', function(msg) {});			skt.emit('custom event', 'msg');
skt.on('custom event', function(obj) {});			skt.emit('custom event',  {}  );
skt.on('connection', function(socket) {});			






io.sockets




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

-------------------- phantomjs --------------------

var page = require('webpage').create();
var system = require('system');

// Route "console.log()" calls from within the Page context to the main Phantom context (i.e. current "this")
page.onConsoleMessage = function(msg) {
    console.log(msg);
};

// Open http://www.homelessshelterdirectory.org/cgi-bin/id/opensearch.cgi?city=Boston&state=MA
page.open(encodeURI("http://www.homelessshelterdirectory.org/cgi-bin/id/opensearch.cgi?city=Boston&state=MA"), function (status) {
    // Check for page load success
    if (status !== "success") {
        console.log("Unable to access network");
    } else {
        // Execute some DOM inspection within the page context
        page.evaluate(function() {
            var list = document.querySelectorAll('a.marker span.tabT');
            for (var i = 0; i < list.length; ++i) {
                console.log((i + 1) + ": " + list[i].innerText);
            }
        });
    }
    phantom.exit();
});

