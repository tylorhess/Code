// borrowed from: http://www.sandersdenardi.com/readable-writable-transform-streams-node/
// (was more helpful than documentation, but had errors and didn't cover Duplex)

//---------- ReadStream constructor ----------//
// ReadStream (class) = custom Readable stream
var obj_json = require('./obj.json');
var Readable = require('stream').Readable;
var util = require('util');

var ReadStream = function() {	// ReadStream constructor function
	Readable.call(this, {objectMode: true}); // objectMode: true --> stream objects (instead of buffers or strings)
	this.obj_arr = obj_json;
	this.curIndex = 0;
};
util.inherits(ReadStream, Readable); // must go after var ReadStream = function() {...}; before ReadStream.prototype...
ReadStream.prototype._read = function() {
	if (this.curIndex === this.obj_arr.length)
		return this.push(null);
	var cur_obj = this.obj_arr[this.curIndex++];
	console.log('read:         '+JSON.stringify(cur_obj));
	this.push(cur_obj);		// .push() outputs chunk, fires .on('data', ...) event
};
ReadStream.prototype.toString = function() {return '[readStream ReadStream]'};

//---------- WriteStream constructor ----------//
var Writable = require('stream').Writable;
var util = require('util');

var WriteStream = function() {		// WriteStream constructor function
	Writable.call(this, {objectMode: true});
};
util.inherits(WriteStream, Writable);
WriteStream.prototype._write = function(chunk, encoding, callback) {
	console.log('write:        '+JSON.stringify(chunk));
	callback();
};
WriteStream.prototype.toString = function() {return '[writeStream WriteStream]'};

//---------- DuplexStream constructor ----------//
var Dupable = require('stream').Duplex;
var util = require('util');

var DuplexStream = function() {		// DuplexStream constructor function
	Dupable.call(this, {objectMode: true});
	this.reservoir = [];
};
util.inherits(DuplexStream, Dupable);
DuplexStream.prototype._write = function(chunk, encoding, callback) {
	console.log('write:        '+JSON.stringify(chunk));
	this.reservoir.push(chunk);
	callback();
};
DuplexStream.prototype._read = function() {
	if (this.reservoir.length === 0)
		this.push(null);
	else
	{	// get 'data' (from "reservoir")
		var data = this.reservoir.shift();
		console.log('read: '+data);
		this.push(data); // outputs 'data' = fire .on('data', ...) event
	}
};
DuplexStream.prototype.toString = function() {return '[duplexStream DuplexStream]'};


//---------- Transform constructor ----------// 
var Transform = require('stream').Transform;
var util = require('util');

var TransformStream = function() {
	Transform.call(this, {objectMode: true});
}
util.inherits(TransformStream, Transform);
TransformStream.prototype._transform = function(chunk, encoding, callback) {
	chunk.value++;
	console.log('transformed:  '+JSON.stringify(chunk));
	this.push(chunk); 	// outputs transformed chunk
	callback();			// reads in untransformed chunk
};
TransformStream.prototype.toString = function() {return '[transStream TransformStream]';};



/*
//---------- implement ReadStream ----------//
var readStream = new ReadStream();
//readStream.on('readable', function() {while (null !== (record = readStream.read())) {console.log('received: '+JSON.stringify(record));}});
readStream.on('data', function(record) {console.log('data read:    '+JSON.stringify(record));});
readStream.on('end', function() {console.log('read end');});

//---------- implement WriteStream (+ ReadStream) ----------//
var writeStream = new WriteStream();
writeStream.on('finish', function() {console.log('write finish');});
writeStream.on('pipe', function(src) {console.log(src+' --pipe--> '+this);});

//readStream.pipe(writeStream);

//---------- implement TransformStream (+ WriteStream + ReadStream) ----------//
var transStream = new TransformStream();
transStream.on('pipe', function(src) {console.log(src+' --pipe--> '+this);});
transStream.on('finish', function() {console.log('transform finish');});
transStream.on('end', function() {console.log('transform end');});

readStream.pipe(transStream).pipe(writeStream);


//---------- implement DuplexStream (by itself) ----------//
var output = new DuplexStream();
output.on('pipe', function(src){console.log(src+' --pipe--> '+this);});
var input = new DuplexStream();

input.pipe(output);
input.write('car');
input.write('coke');
*/


//---------- modulize ----------//
require('module');
module.exports.ReadStream = ReadStream;
module.exports.WriteStream = WriteStream;
module.exports.DuplexStream = DuplexStream;
module.exports.TransformStream = TransformStream;

// var DuplexStream = require('./node_streams.js').DuplexStream;
// var ds = new DuplexStream();