//---------- HELLO WORLD ----------//
//console.log("HELLO WORLD");

//---------- BABY STEPS ----------//
//console.log(process.argv);

/*
var args = process.argv; // array
var len = args.length;
var sum = 0;
if (len > 1) {
	for (var i = 2; i < len; i++) {
		sum += Number(args[i]);
	}
}
console.log(sum)
*/

//---------- MY FIRST I/O! ----------//
// similar to: $ cat filename.txt | wc -l 	// count the number of lines
/*
var fs   = require('fs');
var file = process.argv[2]
var buf  = fs.readFileSync(file);
var str  = buf.toString();
var arr  = str.split('\n');
console.log(arr.length-1);
*/

//---------- MY FIRST ASYNC I/O! ----------//
// similar to: $ cat filename.txt | wc -l 	// count the number of lines
/*
var fs = require('fs');
var filename = process.argv[2];
fs.readFile(filename, function doneReading(err, fileContents){
	var str = fileContents.toString();
	var arr = str.split('\n');
	console.log(arr.length-1);	
});
*/

/*
var fs = require('fs');
var filename = process.argv[2];
function fsReadFile(callback) {
	fs.readFile(filename, callback);
}
function doneReading(err, fileContents){
	var str = fileContents.toString();
	var arr = str.split('\n');
	console.log(arr.length-1);	
}
fsReadFile(doneReading);
*/

//---------- FILTERED LS ----------//
/*var fs = require('fs');
var path = require('path');
var dir = process.argv[2];
var ext = process.argv[3]; // 'txt' NOT '.txt'
function readDirectoy(callback){
	fs.readdir(dir, callback);
};
function printFilesWithExt(err, fileList){
	var filename;
	for (var i = 0, len = fileList.length; i<len; i++){
		filename = fileList[i];
		if (path.extname(filename) === "."+ext) {
			console.log(filename)
		}
	}
};
readDirectoy(printFilesWithExt);
// print files in a directory, with given extension
*/

/*
//---------- MAKE IT MODULAR ----------//
// $ node learnyounode.js ./ txt --> filename per line
learnyounode.js

var tym = require('./tymodule');
var dir = process.argv[2];
var ext = process.argv[3]; // 'txt' NOT '.txt'
var filteredFileArray = tym(dir, ext, printFiles);
function printFiles(err, filteredFiles) {
	if (err){
		console.log(err);
	} else {
		filteredFiles.forEach(function(item) {
			console.log(item);
		});
	}
};

────────────────────────────────────────────────────────────────────────────────
tymodule.js

require('module');
var fs = require('fs');
var path = require('path');
module.exports = function(directorypath, extension, callback) { 	// module must export a single function
	fs.readdir(directorypath, filterFiles);
	function filterFiles(err, fileList){
		if (err){
			callback(err);
		} else {
			var filteredFiles = [];
			filteredFiles.forEach(function(item) { if (path.extname(item) === "."+ext) {filteredFiles += [item];}} });
			callback(null, filteredFiles);
		}
	};
};

────────────────────────────────────────────────────────────────────────────────
────────────────────────────────────────────────────────────────────────────────
solution.js:

    var filterFn = require('./solution_filter.js')
    var dir = process.argv[2]
    var filterStr = process.argv[3]
    
    filterFn(dir, filterStr, function (err, list) {
      if (err)
        return console.error('There was an error:', err)
    
      list.forEach(function (file) {
        console.log(file)
      })
    })

────────────────────────────────────────────────────────────────────────────────
solution_filter.js:

    var fs = require('fs')
    var path = require('path')
    
    module.exports = function (dir, filterStr, callback) {
    
      fs.readdir(dir, function (err, list) {
        if (err)
          return callback(err)
    
        list = list.filter(function (file) {
          return path.extname(file) === '.' + filterStr
        })
    
        callback(null, list)
      })
    }
────────────────────────────────────────────────────────────────────────────────
*/

/*
//─────────────── HTTP Client ───────────────//
// $ node learnyounode.js http://www.google.com/
var http = require('http');
var url = process.argv[2];
http.get(url, function(response) {
	response.setEncoding("utf8"); // sets typeof(data) --> string (instead of default: buffer)
	response.on("data", function(data) { console.log(data); });
});

────────────────────────────────────────────────────────────────────────────────
solution.js 

    var http = require('http')
    
    http.get(process.argv[2], function (response) {
      response.setEncoding('utf8')
      response.on('data', console.log)
      response.on('error', console.error)
    })

────────────────────────────────────────────────────────────────────────────────
*/

/*
//─────────────── HTTP Collect ───────────────//
// $ node learnyounode.js http://www.google.com/
var http = require('http');
var bl = require('bl');
var url = process.argv[2];
http.get(url, function(response) {
	response.pipe(
		bl(function(err, data){
			if (err)
	          return console.error(err)
			console.log(data.toString().length);
			console.log(data.toString());
		})
	);
	// var charSumData = 0;
	// response.setEncoding("utf8"); // sets typeof(data) --> string (instead of default: buffer)
	// response.on("data", function(data) { charSumData += data.length; });
	// response.on("error", function(err) { console.log(err); });
	// response.on("end", function() { console.log(charSumData); });
});

────────────────────────────────────────────────────────────────────────────────
solution.js

    var http = require('http')
    var bl = require('bl')
    
    http.get(process.argv[2], function (response) {
      response.pipe(bl(function (err, data) {
        if (err)
          return console.error(err)
        data = data.toString()
        console.log(data.length)
        console.log(data)
      }))  
    })

────────────────────────────────────────────────────────────────────────────────
*/


/*
//─────────────── Juggling Async ───────────────//
// $ node learnyounode.js http://www.url1.com/ http://www.url3.com/ http://www.url3.com/
var http = require('http');
var bl = require('bl');

function getNextURL(i) {
	http.get(process.argv[2+i], function (response) {
		response.pipe(bl(function (err, data) {
			if (err)
				return console.error(err);
			data = data.toString();
			console.log(data);
			//console.log(process.argv[2+i]);
		}));
		response.on("end", function() {
			if (i < 2) {
				getNextURL(i+1);
			}
		});
	});
}
getNextURL(0);
// mine:   GETs in series,   console.log in series
────────────────────────────────────────────────────────────────────────────────
// theirs: GETs in parallel, console.log in series
solution.js 

    var http = require('http')
    var bl = require('bl')
    var results = []
    var count = 0
    
    function printResults () {
      for (var i = 0; i < 3; i++)
        console.log(results[i])
    }
    
    function httpGet (index) {
      http.get(process.argv[2 + index], function (response) {
        response.pipe(bl(function (err, data) {
          if (err)
            return console.error(err)
    
          results[index] = data.toString()
          count++
    
          if (count == 3)
            printResults()
        }))
      })
    }
    
    for (var i = 0; i < 3; i++)
      httpGet(i)

────────────────────────────────────────────────────────────────────────────────
*/

/*
//─────────────── Time Server ───────────────//
// $ node learnyounode.js 8000
var net = require('net');
var strftime = require('strftime');
var port = process.argv[2];
var server = net.createServer(function(socket) {
	socket.write(strftime('%Y-%m-%d %H:%M'+'\n')); // i.e. - "2013-07-06 17:42\n"
	socket.end();
});
server.listen(port);
*/

/*
//–––––––––––––––––––– Http File Server ––––––––––––––––––––//
// $ node learnyounode.js 1234 
var http = require('http');
var fs = require('fs');
var port = process.argv[2];
var filepath = process.argv[3];
var filestream = fs.createReadStream(filepath);
var server = http.createServer(function(req, res) {
	filestream.pipe(res)
});
server.listen(port);
────────────────────────────────────────────────────────────────────────────────
    var http = require('http')
    var fs = require('fs')
    var server = http.createServer(function (req, res) {
      res.writeHead(200, { 'content-type': 'text/plain' })
      fs.createReadStream(process.argv[3]).pipe(res)
    })
    server.listen(Number(process.argv[2]))
────────────────────────────────────────────────────────────────────────────────
*/

//–––––––––––––––––––– Http File Server ––––––––––––––––––––//
// $ node learnyounode.js 1234 
var http = require('http');
var map = require('through2-map');
var port = +process.argv[2];
var server = http.createServer(function (req, res) {
	res.writeHead(200, { 'content-type': 'text/plain' })
	req.pipe(map(function (chunk) {
		return chunk.toString().toUpperCase();
	})).pipe(res)
});
server.listen(port)

