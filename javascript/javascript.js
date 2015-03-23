// no 'class' ('object prototypes' instead)
// function() {} = object
//		can hold executable code
//		can be passed as argument/parameter

// distrinct features of javascript
//	load-and-go delivery = programs are delivered to the execution site as source code (delivered as text, not .exe)
//	loosely typed = any variable can receive any value, any value can be returned from a function (NOT an "untyped" language, just "loose")
//	objects as containers (hash tables that can be added-to/modified at any time)
//	prototypal inheritance = objects inherit directly from other objects (there are no class)
//	lambda = functions as first-class objects
//	linkage through global variables = bad idea: security problems, reliability problem, ...



//---------- Types ----------//
Number 		// (not integer) = 64-bit floating point = Double = 0.1 + 0.2 = 0.30000000000000004
Boolean
String 		// no char type
Object
	function
	Array
	Date
	RegExp
undefined	// var x; 		  --> undefined (declared, uninitialized)
null		// var x = null;  --> null		(declared, deliberately initialized to null)
Error
	Error 		// default
	EvalError
	RangeError
	ReferenceError
	SyntaxError
	TypeError
	URIError
0xD800		// charCode


//---------- Conditionals, etc. ----------//
var x;
var str = x || "default";
var str = (conditional) ? "if true" : "if false";
if (true) {}
else if (false) {}
else {}

for (var i = 0; i < length; i++) {}
for (var i = 0, len = a.length; i < len; i++) {}	// faster, since you don't look up a.length every time
for (var i = 0, item; item = a[i++];) {}			// same thing?
for (var index in arr) {arr[index];}
for (var key in obj) {obj[key];} 		// use obj.hasOwnProperty(key) to avoid properties/keys inherited from parent

while (true) {}
do {} while ()

switch(num) {	// comparisons use === operator
	case 1:
		blah();
		break;
	case 2:
		bla();
		break;
	default:
		bl();
}

switch(str) {	// comparisons use === operator
	case "up":
		blah();
		break;
	case "down":
		bla();
		break;
	default:
		bl();
}

// statements can have labels
label_name: for (var i = 0; i < length; i++) {
	if () {
		break label_name;	// breaks for, not if
	}
}

//---------- scope ----------//

// {blocks} do NOT have scope (a bit of laziness when writing the variable compiler)
// only functions have scope
// 		if you declare a variable ANYWHERE in a function, it's visible EVERYWHERE in that function
//		if you declare the same variable twice in one function, it's only created once (no error)
// 		"implied" global variables = if you create 'foo' and forget to declare it ("var foo"), it's created as a global variable 
// 		global variable = window.foo (browser) = GLOBAL.window.foo (node.js or other server-side javascript)

// global / local scope
(function(){var foo = "bar";})();			// local scope
foo --> ReferenceError: foo is not defined
(function(){window.foo = "bar";})();		// global scope (browser)
(function(){GLOBAL.window.foo = "bar";})();	// global scope (node)
foo --> "bar"
window.foo --> "bar"


//---------- "use strict" ----------//
// 	http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
(function(){var foo = "bar";})();			// local scope
(function(){foo = "bar";})();				// global scope (window.foo = "bar")
(function(){"use strict";foo = "bar";})();	// ReferenceError: foo is not defined


//---------- Boolean ----------//
false = 0, "", NaN, null, undefined
true = everything else

0 == false --> true
1 == true  --> true
false != true --> true

1 === true --> false	// === is faster because it doesn't check across types
( (1 == true) && (typeof(1) == typeof(true)) ) --> false 	// === is exact equality of value AND type

//---------- undefined vs. null ----------//
var x; 		   --> undefined (declared, uninitialized)
var x = null;  --> null		 (declared, deliberately initialized to null)


//---------- Number ----------//
// javascript Numbers are "double-precision 64-bit format IEEE 754 values" 

// NO Integer or int !!!
0.1 + 0.2 == 0.30000000000000004
1 / 2 = 0.5		// no need for `1 / 2.0` or cast 

+  -  *  %  /
+= -= *= %= /=		///
x++  x--	// returns value before incrementing/decrementing
++x  --X	// returns value after  incrementing/decrementing


Infinity  -Infinity				// behaves mathematically like positive/negative infinity
isFinite(-Infinity); --> false

parseInt("text"); --> NaN
NaN + - * / % anything --> NaN 	// any sequence of arithmatic operations involving NaN, result in NaN
isNaN(NaN); --> true
isFinite(NaN); --> false
NaN == NaN --> false 		// NaN does not equal anything
NaN > NaN --> false
NaN < NaN --> false
typeof(NaN) === 'number'

+"342" --> 342				// fastest, but more like parseFloat()
+"2.1" --> 2.1 				// WATCH OUT: +"" --> 0, and more: http://stackoverflow.com/questions/17106681/parseint-vs-unary-plus-when-to-use-which
parseFloat("2.1"); --> 2.1 	// parseFloat("") --> NaN

parseInt("342"); --> 342
parseInt("011"); = parseInt("011", 2); --> 3	// base 2 (binary)
parseInt("011", 10); --> 11						// base 10

//---------- Math ----------/
Math.abs();		// absolute value
Math.floor(); 	// integer (drop decimal)
Math.log(); 	// logarithm
Math.max(); 	// maximum
Math.pow(); 	// raise to a power
Math.random(); 	// random number
Math.round(); 	// nearest integer
Math.sin(); 	// sine
Math.sqrt(); 	// square root

//---------- Integers & Bitwise Operations ----------//
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FOperators%2FBitwise_Operators


//---------- String ----------//
// sequences of Unicode characters
var str = "";

str.length;

str1 = str1 + str2; 		// '+' and '+=' have better performance than str1.concat(str2, str3, ...);
str1 += str2;
(str1 == str2) --> true || false

str.charAt(0);
str.charCodeAt(0);
"tyty".indexOf("ty"); --> 0 || -1	// first occurrance 
"tyty".indexOf("ty", 2); --> 2		// first occurrance (start at index = 2)
"tyty".lastIndexOf("ty"); --> 2 	// last occurrance 
"tyty".match("ty"); --> "ty" || null
str.replace(find, replace);			// only first occurrance
str.search(regexp); --> index || null
"tyty".slice(1); --> "yty"		// inclusive
"tyty".slice(1,3); --> "yt"		// inclusive, exclusive
"tyty".slice(-2); --> "ty"		// last 2 characters
"tyty".slice(1,-1); --> "yt"	// inclusive, exclusive
str.substring() ~= str.slice()
str.substring(start, end);		// inclusive, exclusive
str.substr(start, length);		// inclusive, length
"ty,ty".split(",") --> ["ty","ty"];	
str.toLowerCase();
str.toUpperCase();
" ty ".trim(); --> "ty"


//---------- Object ----------//
// objects are unordered key-value pairs
// optional quotes around key: vs. "key":
// values are any type (including other objects)... "every object is a little database"

var obj = {};
obj.key --> value
obj["key"] --> value

typeof(true) === 'boolean'
typeof(1) === 'number'
typeof(NaN) === 'number'
typeof("") === 'string'
typeof(typeof(1)) === 'string'
typeof(function() {}) === 'function'
typeof({}) === 'object'
typeof([]) === 'object'
typeof(null) === 'object'
typeof(anythingElse) === 'object'
typeof(undefined) === 'undefined'

for (var key in obj) {obj[key];}

// prototypal language that failed to implement the core operator that you'd have in a prototypal language
// can't use object to create an object
function object(o) {
	function F {}
	F.prototype = o;
	return new F();
}							// I don't know what this whole thing means


//---------- function ----------//
// first-class objects (can be passed & returned)... inherits from Object
// scope = a function has access to variables of the function it's contained in ("Static Scoping" or "Lexical Scoping")
//		the parent function's variables/scope persists even after the parent function has returned ("closure")
//			it is NOT the value of the variable at the time the function was create (NOT a copy)
//			it has got a connection to parent's actual variable (still has access to the actual variable)
// arguments are not cast or type checked, nor number of arguments
// if a function is called with too many arguments, the extra arguments are simply ignored (no error)
// 								too few  arguemnts, the left over arguments = undefined

function() {}
var func = function() {};

// arguments
// array-like list of arguments passed to the function (only available within function)
// not an actual array
function myAdder() {
    var sum = 0;
    for (var i = 0, j = arguments.length; i < j; i++) {
        sum += arguments[i];
    }
    return sum;
}
myAdder(342,643,123);

// easily pass items in an array as arguments
anyFunction.apply(null, [a,b,c,...]); = anyFunction(a,b,c,...);		// when running anyFunction
myAdder.apply(null, [342,643,123]); = myAdder(342,643,123);

return;		// return; = return undefined; (except in a construction, when it returns a new object)

// this
obj.func();		// within func() { this = obj }
func();			// within func() { this = global object = window (in browser) }
new func(); 	// within func() { this = {} (because "new" creates new/empty object to use as constructor: this.first = ...; this.last = ...; ...) }

//---------- Class ----------//
// Note: There is no `class Person() {}`
// To make a class, simply make the constructor (function) for the class
function Person(first, last) {		// this is the constructor method for class Person
	this.first = first;
	this.last = last;
	//fullName = function() {	return this.first+" "+this.last;};			// BAD: every new Person creates a brand new function object
}
Person.prototype.fullName = function() {return this.first+" "+this.last;};	// GOOD: 1 fullName() function shared with every instance of Person
var person = new Person("Tylor", "Hess");

// overwrite .toString() method (for easy debugging)
person --> [object Object]
Person.prototype.toString = function() {return '<Person: '+this.fullName()+'>';};
person --> "<Person: Tylor Hess>"

// extend (add variables/properties and functions to) built-in classes
String.prototype.reverse = function() {var r="";for(var i=this.length-1;i>=0;i--){r+=this[i];}return r;};
"Tylor".reverse(); --> "rolyT"

// understanding classes
function Class(name) {
	this.name = name;
}
Class.prototype.toString = function() {return "<Class name:"+this.name+">";};
var inst = new Class(); = new(Class());		// where Class() is a (constructor) function
function new(classConstructor) {
	var obj = {};
	classConstructor.apply(obj, arguments)	// special `arguments` = [arg1, arg2, ...] (functions only)
	return obj;
}



//---------- Array ----------//
var a = [];
a[0];

a.length;

// modifies array (doesn't simply return)
[1,2] + [3,4,10] --> [1,2].toString() + [3,4,10].toString() --> "1,2"+"3,4,10" --> "1,23,4,10"
.pop();						// removes & returns last item in array
.shift();					// removes & returns first item in array
.push(item3, item4, ...);	// adds items to the end of the array
.unshift(item3, item4, ...);// adds items to the beginning of the array
.reverse();					// modifies array (doesn't simply return reversed array)
.sort();					// sort item.toString() (alphabetical order)
.sort(function(a,b) {return a-b;});	// a = first, b = second, if a<b (correct order) return negative (-1); else if a>b return positive (1); else (a=b) return 0;
.splice(index, numItemsRemoved, item3, item4, ...);		// returns items removed
[1,2,3,4].splice(1, 2, "a", "b", "c"); --> return: [2,3] 	new array: [1,"a","b","c",4]

// "accessor" (returns without modifying array)
.toLocaleString();	 		// ???
[1,2].toString(); --> "1,2"
.join(delimiter);
[1,2].join(','); --> "1,2"
.concat(arr);
[1,2].concat([3,4]); --> [1,2,3,4]	// array
.concat(item3, item4, ...);
[1,2].concat(3, 4); --> [1,2,3,4]	// items (multiple arguments)
[1,2].concat([3,4], [5,6]); --> [1,2,3,4,5,6] 	NOT [1, 2, [3,4], [5,6]]
.slice(start, end);		// inclusive, exclusive
[1,2,3,4].slice(1); --> [2,3,4]
[1,2,3,4].slice(-1); --> [4]
[1,2,3,4].slice(1,3); --> [2,3]
[1,2,3,4].slice(1,-1); --> [2,3]
.indexOf(item);
["a","b"].indexOf("b") --> 1
.lastIndexOf(item);
["a","a","c"].lastIndexOf("b") --> 1

.forEach(function(item, index, array) {item == array[index]});
.forEach(function(item) {...});
.filter(function(item, index, array){return array[index] > 0;});	// returns positive subset of original array
.filter(function(item){return item > 0;});							// same
.every(function(item, index, array) {return array[index] > 0;});	// returns true of ALL items in array are positive
.every(function(item) {return item > 0;});							// same
.some(function(item, index, array) {return array[index] > 0;});		// returns true of SOME items in array are positive
.some(function(item) {return item > 0;});							// same
.map(function(item, index, array) {...});		// return new array with function applied to every item
.map(function(item) {...});						// same
.reduce(function(item, index, array) {...});		// Apply a function simultaneously against two values of the array (from left-to-right) as to reduce it to a single value.
.reduce(function(item) {...});						// same
.reduceRight(function(item, index, array) {...});	// Apply a function simultaneously against two values of the array (from right-to-left) as to reduce it to a single value.
.reduceRight(function(item) {...});					// same

for (var i = 0, len = a.length; i < len; i++) {}	// faster, since you don't look up a.length every time

//---------- Errors ----------//
throw new Error(reason); 	// name: 'Error' (default)
throw {
	name: ExceptionName,	// name: 'Error' (default)
	message: reason
};

try {
	...
} catch (e) {
	switch (e.name) {
		case 'Error':
			...
			break;
		default:
			throw e;
	}
}

//---------- eval ----------//
// compiles & executes a string parameter and returns the result
// browsers use eval to convert HTML (string) to actions
// dangerous, most misused feature of language
// RECOMMENDED: don't use it ever
eval("javascript code;");


//---------- Date ----------//

//---------- Regular Expression (RegExp) ----------//
/[a-z]*/

//---------- DOM ----------//
document.getElementById('id');			= $('#id');		// <div id="id">
document.getElementsByClassName('class')= $('.class');	// <div class="class">
document.getElementsByName('name');		= $('[name="elementName"]');	// <input name="elementName">
document.getElementsByTagName('div');	= $('div');		// <div>
	node.getElementsByTagName('div');	// node = element within document
node.parentNode;
node.childNodes;	// includes whitespace nodes
node.children;		// excludes whitespace nodes
node.firstChild;	// includes whitespace nodes
node.firstElementChild; //excludes whitespace nodes
node.appendChild(node);
node.removeChild(node);

node.className = 'class';

// window
//		every window, frame, & iframe has its own unique window object
//		also known as: self, parent, top
// inter-frame communication
//		frames['frameNameAttr'] = child frames & iframes


DOM videos of Douglas Crockford has more...

//---------- events ----------//
// mouse
click
dblclick
mousedown	// 1st half of a mouse click
mouseup		// 2nd half of a mouse click
mousemove
mouseout
mouseover
// (keyboard) input
focus		//  = form (or html) element "gains focus" ('tab' pressed, or mouse clicked inside <input> text box)
blur // defocus = form (or html) element "loses focus" ('tab' pressed, or mouse clicked elsewhere on page)
change		// form element value changes
keypress
keydown		// 1st half of a key press
keyup		// 2nd half of a key press
reset		// form is reset (uncommon?)
submit		// form is submitted

// event listeners
// 		node = DOM node (above)
//		type = "click", "focus", ... (above)
node["on"+type] = function() {};
node.attachEvent("on"+type, function() {});			// IE only
node.addEventListener(type, function() {}, false);	// evenywhere except IE

// event handlers
function (ev) {
	ev = ev || event;
	var target = ev.target || ev.srcElement;
	
	...

	// to prevent a browser action associated with event (i.e. - submitting form, following link)
	ev.returnValue = false;
	if (ev.preventDefault) {
		ev.preventDefault();
	}
	return false;
}

//---------- DOM methods ----------//
alert(text);			// avoid using with ajax because it breaks the asynchronous model
confirm(text);			// avoid using with ajax because it breaks the asynchronous model
prompt(text, default);	// avoid using with ajax because it breaks the asynchronous model
setTimeout(function() {}, time);	// time = number in milliseconds
setInterval(function() {}, time);	// time = number in milliseconds 
open();		// new window 

//---------- JavaScript Object Notation (JSON) ----------//
JSON.parse(""); --> {}
JSON.stringify({}); --> ""

