// Synchronous 
function compute() {
	return syncFunc();
}
var result = compute();
str += result --> "result"  // (1st)
str += "!"    --> "result!" // (2nd)

// Asynchronous
function compute(callback) {
	callback(asyncFunc());
}
compute(function(result) {
	str += result; --> "!result" // (2nd)
});
str += "!"; 	   --> "!" 		 // (1st)

// Asynchronous Promises (Deferred Objects)
function compute() {
	return asyncFunc();
}
compute().done(function(result) {
	str += result; --> "!result" // (2nd)
}).fail(function() {/* handle failure */});
str += "!"; 	   --> "!"  	 // (1st)

// -------------------- Asynchronous Code Design -------------------- //
// http://blog.shinetech.com/2011/08/26/asynchronous-code-design-with-node-js/

// Synchronous
var fs = require('fs');
var filenames = fs.readdirSync(".");
for (var i = 0; i < filenames.length; i++) {
	console.log(filenames[i]);
}
console.log("last line");

// Asychronous 
var fs = require('fs');
fs.readdir(".", function(err, filenames) {
	for (var i = 0; i < filenames.length; i++) {
		console.log(filenames[i]);
	}
});
console.log("first line");


my_object.later(1000, "erase", true);
Object.prototype.later = function(msec,method) {
	var that = this;
	var args = Array.prototype.slice.apply(arguments, [2]);
	if (typeof(method) === 'string') {
		method = that[method];
	}
	setTimeout(function() {
		method.apply(that, args);
	}, msec);
	return that;
}

for (i ...) {
	var div_id = divs[i].id;
	divs[i].onmouseover = function() {
		show_element_id(div_id);
	}
} // div_id = last id, b/c function has reference to (not copy of) div_id variable due to closure
for (i ...) {
	var div_id = divs[i].id;
	divs[i].onmouseover = function(id) {
		return function() {
			show_element_id(id);
		};
	}(div_id);
} // now, id = copy of div_id