/*jshint esnext:true */

// History:
//		1995: (May) Brendan Eich creates "Mocha" in 10 days at Netscape
//				 (Sep) "LiveScript" shipped in Netscape Navigator 2.0 (beta)
//				 (Dec) "JavaScript" Netscape 2.0b3
//		1996: (Aug) Microsoft creates "JScript" (JavaScript clone) for IE 3.0
//		1997: ECMAScript (ES1) standard is established
//		1999: ES3 (baseline for modern JS) and IE5 is all the rage
//		2000: ES4 (attempt 1)
//		2004: E4X (ECMAScript 4 for XML) ("XML as the basis for the web" eventually petered out)
//				 AJAX (XMLHttpRequest) and "Web 2.0" gain popularity: Outlook Web Access (2000), Oddpost (2002), Gmail (2004), Google Maps (2005)
//		2007: ES4 (attempt 2)
//		2008: ES4 abandoned
//		2009: ES5 is "a little clean up of ES3": standard JSON, "use strict", forEach, Object.keys, Object.create (specially for Douglas Crockford)
//		2015: ES6/ECMAScript2015 

// ECMA priorities:
// #1 "don't break the web" (preserve the code already written on the web, mostly unmaintained)
// #2 interoperability

// distinct features of javascript
//		no 'class' ('object prototypes' instead)
//		function() {} = object (can hold executable code; can be passed as argument/parameter)
//		load-and-go delivery = programs are delivered to the execution site as source code (delivered as text, not .exe)
//		loosely typed = var x; can be any class/type. any variable can receive any value, any value can be returned from a function (NOT an "untyped" language, just "loose")
//		objects as containers = var obj = {key: "value"} = hash table/map (key-value pairs) that can be added-to/modified at any time
//		prototypical inheritance = objects inherit directly from other objects (there are no classes)
//		lambda = functions as first-class objects, like: Array, Date, (Number, Boolean, String) ... ("functional language" like lisp & scheme)
//		linkage through global variables = doesn't have linker because of load-and-go model 
//			compilation units combined in global namespace
//			(bad idea: security problems, reliability problems, and other things...)

////////////////////////////////////
////////// reserved words //////////
////////////////////////////////////
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords

///////////////////////////
////////// types //////////
///////////////////////////

undefined 	// var x; 		 --> undefined // declared, uninitialized --> JavaScript auto-initializes (or "defines") to `undefined`
null 		// var x = null; --> null      // declared, initialized (to null) deliberately

Boolean
Number 	// Double or Integer
	0b0101	// binary
	0o1324	// octal
	0xD800	// hex? charCode? 
String 	// no char type
Symbol 
Object
	Array
	Date
	RegExp
	Error|EvalError|RangeError|ReferenceError|SyntaxError|TypeError|URIError
	Promise
	function (){}

typeof(x) --> 'undefined'|'boolean'|'number'|'string'|'function'|'object'
	typeof(undefined) 	--> 'undefined'
	typeof(null) 		--> 'object' NOT null 	// no null type
	typeof(true|false) 	--> 'boolean'
	typeof(0|1|NaN) 	--> 'number'
	typeof(""|"text") 	--> 'string'
	typeof(function(){}) --> 'function'
	typeof({}|[]|null|almost anything) --> 'object'
typeof(typeof(x)) --> 'string'

//////////////////////////////////
////////// declarations //////////
//////////////////////////////////
// case sensitive
// start with: letter, $, _
// contains: letters, digits, $, _
// recommendation: replace all `var` with `let` 
var|let x;
var|let x, y, z;
var|let x = 0, y = 1, z = x+y;

var|let x = a || default; 	  // return `default`, if a === (false|0|""|NaN|null|undefined)
var|let x = a && a.fieldname; // return (false|0|""|NaN|null|undefined), instead of halting execution & throwing ReferenceError (undefined) or TypeError (null) or not halting and returning undefined (false|0|""|NaN)

// const (same as `let` except immutable)
const PI = 3.14159;
const obj = {a:0}; 										   // immutable: cannot re-assign a new value
obj = {b:0} --> TypeError: Assignment to constant variable // only the variable is immutable
obj.a = 1; // this is fine 								   // if const is [Object], can change properties 
														   //                      (properties are mutbale)

////////////////////////////////
////////// Statements //////////
////////////////////////////////
// if, else, for, while, do, switch, break, continue, return, try/throw

var x = (conditional) ? "if true" : "if false";
if (true) {}
else if (false) {}
else {}

for (var i = 0; i < length; i++) {}
for (var i = 0, len = a.length; i < len; i++) {}	// faster, since you don't look up a.length every time
for (var i = 0, item; item = a[i++];) {}			// same thing?
for (var index in arr) {arr[index];}
//for (var key in obj) {value=obj[key];}	// don't use
for (var key in obj) {
	if (obj.hasOwnProperty(key)) { 	// if (key isn't inherited from parent)
		value=obj[key];
	}
}

while (true) {}

do {
} while (true)

switch(num) {	// comparisons use === operator
	case 1|"one"|expression1:
	case 2|"two"|expression2:
		one_or_two();
		break;
	case 3|"three"|expression3:
		three();
		break;
	default:
		other();
}

// block labels
if|for|while (true) label:{ // blocks can be labeled (even if|for|while|do statements?)	
}

// break
for|while|do (true) {
	if (true) {
		break; 		// breaks out of all if statements until first for|while|do
		// skipped
	}
	//skipped
}
if|for|while|do (true) label:{
	if|for|while|do (true) {
		break label;// breaks out of all blocks until (and including) label
		// skipped
	}
	// skipped
}


// continue
for|while|do () {
	if (true) {
		continue;	// breaks out of all if statements until first for|while|do loop (but only for 1 iteration)
		// skipped once
	}
	// skipped once
}


/////////////////////////////
////////// Boolean //////////
/////////////////////////////

Boolean() --> true
Boolean(false|0|""|NaN|null|undefined) --> false
	 !!(false|0|""|NaN|null|undefined) --> false
Boolean(true|"0"|[]|{}|anything else...) --> true
	 !!(true|"0"|[]|{}|anything else...) --> true

// USE: === and !===
0 === "0" --> false // compares value & type (and runs faster)
0 !== "0" --> true	// faster because it doesn't convert to same type

// DO NOT USE: == and !=
0 == "0" --> true 	// converts to same type (if possible)
0 != "0" --> false

// logical "and"
(a && b) --> a // return a, if a === (false|0|""|NaN|null|undefined)
(a && b) --> b // return b, if a !== (false|0|""|NaN|null|undefined)
return a && a.fieldname;  // return a, if a === (false|0|""|NaN|null|undefined), instead of attempting to access a.fieldname:
// prevents:
//		if (a === undefined),       a.fieldname --> fails and throws ReferenceError
//		if (a === null),            a.fieldname --> fails and throws TypeError
// Note: if (a === false|0|""|NaN), a.fieldname --> passes

// logical "or"
(a || b) --> b // return b, if a === (false|0|""|NaN|null|undefined)
(a || b) --> a // return a, if a !== (false|0|""|NaN|null|undefined)
return a || default;  // return default, if a === (false|0|""|NaN|null|undefined)


////////////////////////////
////////// Number //////////
////////////////////////////

// Double (64-bit) or Integer (32-bit, signed)
// cast as a Number
Number("12") == +"12"
	+"2.1" --> 2.1	// Double (Float)
	+"342" --> 342	// Integer
parseFloat("2.1"); --> 2.1
parseInt("342"); --> 342
// WATCH OUT:
	+"" --> 0
	+"text" --> NaN
	parseFloat("") --> NaN
	parseInt("") --> NaN

// Double = 0.1 + 0.2 = 0.30000000000000004 (64-bit floating point)
1 / 2 --> 0.5		// no need for cast as Double or '1 / 2.0'
x = 0.1 + 0.2 --> 0.30000000000000004 != 0.3
	x - 0.3 > 0.000001 // for equality comparison

// Integer (53-bit 2^53 max safely)
cents = 125		// good (preserves equality/integer math)
dollars = 1.25 	// bad


+  -  *  %  / 	///
+= -= *= %= /=	///
x++  x--	// returns value before incrementing/decrementing
++x  --X	// returns value after  incrementing/decrementing


Infinity  -Infinity				// behaves mathematically like positive/negative infinity
isFinite(-Infinity); --> false

parseInt("text"); --> NaN 		// NaN if the first character cannot be converted to a number
NaN + - * / % anything --> NaN 	/// any sequence of arithmatic operations involving NaN, result in NaN
isNaN(NaN); --> true
isFinite(NaN); --> false
NaN == NaN --> false 		// NaN does not equal anything
NaN > NaN --> false
NaN < NaN --> false
typeof(NaN) === 'number'


//---------- Math ----------/
Math.abs();		// absolute value
Math.ceil();	// round up
Math.floor(); 	// round down
Math.log(); 	// logarithm
Math.max(); 	// maximum
Math.pow(); 	// raise to a power
Math.random(); 	// random number
Math.round(); 	// nearest integer
Math.sin(); 	// sine
Math.sqrt(); 	// square root

parseInt("011", 2); --> 3	// base 2 (binary)
parseInt("011", 10); --> 11	// base 10

// custom round 					// place = -1  278.387--> 278.4
function roundPlace(num, place) {	// place =  0  278.387--> 278
	place = place || 0; 			// place = +1  278.387--> 280
	return Math.round(num*Math.pow(10,-place))/Math.pow(10,-place);
}

//---------- Bitwise Operations ----------//
// (before ES6?) don't use bitwise operations
// javascript: bitwise operations are slow (because they convert Number to Integer, then back into Number = 64-bit Double/Float)
// other languages: bitwise operators are fast, primitive action directly supported by the processor (at the level of bits) used to manipulate values for comparisons and calculations

//----- binary -----//
0b111110111 === 503 			  // ES6+
parseInt("111110111", 2) === 503; // ES5-

//----- octal -----//
0o767 === 503				// ES6+
parseInt("767", 8) === 503; // ES5-

////////////////////////////
////////// String //////////
////////////////////////////

// sequences of Unicode characters
String(1.2) --> "1.2"

str.length;	// number of 16-characters

str1 = str1 + str2; 		// '+' and '+=' have better performance than str1.concat(str2, str3, ...);
str1 += str2;

'str' === "str" !== `str` // (single quote) same as: (double quote) different from: (back-tick|grave accent|template literals)

// template literals (back-tick or grave accent)
var lines = 			  // multiline: [return] interpretted as `\n`
`line 1: \`${str}\`
line2: \`${str.trim()}\`` // variables & expressions interpolated using: `${expression}`
'`' === `\``			  // escape back-tick using: backslash (\`)

var a = 1, b = true;
var ab = func`a:${a} b:${b}`;		strings --> ['a:', ' b:', '']
function func(strings, ...values) { values  --> [1, true]
 	return ''; // same as: var ab = ''
}


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

//----- spread operator (...) -----//
[...'tyty']     /* same as: */ ['t','y','t','y']
func(...'tyty') /* same as: */ func('t','y','t','y')

//----- .toString() -----//
(undefined).toString()--> TypeError
(null).toString()	  --> TypeError
(true).toString()	  --> "true"
(17).toString()		  --> "17"
([1,true]).toString() --> "1,true"
(/az/).toString()	  --> "/az/"
({}).toString()		  --> "[object Object]"
(function(){'code';}).toString()--> "function (){'code';}"
(new Error('msg')).toString()	--> "Error: msg"
(new Date()).toString()			--> "Mon Dec 21 2015 08:51:31 GMT-0500 (EST)"

// overwrite .toString() (for easy debugging)
>> function ClassName() { this.a = true; }
>> ClassName.prototype.toString = function() {return '<insert Class>: '+JSON.stringify(this,null,'  ');}; // indents json with two spaces ('  ')
>> var className = new ClassName();
>> className.toString(); --> "ClassName: {a:true}" // instead of: "[object Object]"

.toString(2-36)
	// binary (0-1)
	(2).toString(2) --> "10"
	// hexidecimal (0-9, a-f)
	(0|15).toString(16)  --> "0"|"f"
	(0|255).toString(16) --> "0"|"ff"
	// alphanumberic (0-9, a-z) 		// doesn't go any higher than 36 (can't get capital letters)
	(0|35).toString(36)   --> "0"|"z"
	(0|1295).toString(36) --> "0"|"zz"
	// pseudo-random string (unique identifier)
	Math.random().toString(36) --> "0.j1zwxmzs56x0f6r"
				  ...substr(2)   --> "j1zwxmzs56x0f6r"
	              ...substr(2,5) --> "j1zwx"

// pseudo-random string (better unique identifier? fewer repeat occurrences? plus capital letters)
function randChars(length) {
	var text = "";
	var choice = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for(var i=0; i<length; i++)
		text += choice.charAt(Math.floor(Math.random() * choice.length));
	return text;
}

function htmlEscape(str) {
	return str.replace(/&/g, '&amp;' )	// must be before everything else
			  .replace(/"/g, '&quot;')
			  .replace(/'/g, '&#39;' )
			  .replace(/</g, '&lt;'  )
			  .replace(/>/g, '&gt;'  )
			  .replace(/\//g,'&#47;' )
			  .replace(/\\/g,'&#92;' )
			  .replace(/\r\n/g,'<br>')	// must be before \r and \n
			  .replace(/\r/g  ,'<br>')
			  .replace(/\n/g  ,'<br>')
			  .replace(/\s/g,'&nbsp;');	// must be after \r\n, \r, and \n (and any other whitespace characters)
}
// function htmlUnescape(value){
// 	return String(value)
// 		.replace(/&quot;/g, '"')
// 		.replace(/&#39;/g, "'")
// 		.replace(/&lt;/g, '<')
// 		.replace(/&gt;/g, '>')
// 		.replace(/&amp;/g, '&');
// }

////////////////////////////
////////// Symbol //////////
////////////////////////////
// unique, immutable (unchangeable) data type
const sym = Symbol();
const sym = Symbol('description'); // optional
sym             --> 'Symbol(description)' // there's no way to see the unique identifier in a human-readable form
sym.toString()  --> 'Symbol(description)' // there's no way to see the unique identifier in a human-readable form

// used as a unique [Object] key (unique identifier)
let obj = {};
obj[sym]  =  'value';
obj[sym] --> 'value'

// guaranteed never to clash with existing [Object] keys (because it's not a [String])
typeof(sym) --> 'symbol' // NOT a [String]

// guaranteed never to clash with other [Symbols] because every [Symbol] is unique
const sym1 = Symbol('desc');
const sym2 = Symbol('desc');
(sym1 === sym2) --> false // every [Symbol] is unique

// [Symbols] are NOT keys
Object.keys(obj) --> []
Object.getOwnPropertyNames(obj)   --> []
Object.getOwnPropertySymbols(obj) --> [sym]
JSON.stringify(obj) --> '{}' // [Symbols] are NOT stringified to JSON

// What is `.for()` used for? Alternative to description?
const sym = Symbol.for('app.xxx'); // optional
Symbol.keyFor(sym) --> 'app.xxx'

////////////////////////////
////////// Object //////////
////////////////////////////
// objects are unordered key-value pairs
// optional quotes around key: vs. "key":
// values are any type (including other objects)... "every object is a little database"

var obj = new Object() 	--> {}
var obj = {}; 			--> {}	// faster

var obj = {
	alpha        : 1,
	"beta"       : 2,
	['gam'+ma()] : 3, // ES6
	func         : function() {},
	*genFunc     : () => {} // ES6 generator function
}

obj.key 	--> value
obj["key"] 	--> value 	// useful when a key is a reserved word or when accessing key prgrammatically/dynamically

// Object.keys
Object.keys(obj) --> ['a','b'] // for obj = {a:1, b:2}
Object.keys(obj).forEach( (key) => {var value = obj[key];} ); // ES6

// new [Object] shorthand
var x, y;						var x, y;
var obj = {x,y}; /* same as: */ var obj = {x:x,y:y}

// destructuring
var {a,b} = obj; 	 /* same as: */	var a = obj.a
									var b = obj.b
var {a=1,b=2} = obj; /* same as: */	var a = obj.a
									var b = obj.b
var {i,u:{n}} = obj; /* same as: */ var i = obj.i
							// NOT: var u = obj.u
									var n = obj.u.n
var {x1:x,y1:y}=obj; /* same as: */ var x = obj.x1
									var y = obj.y1

//----- Classes -----//
// ES6							//ES5
class Shape {					
    constructor(id,x,y) {		var Shape = function(id,x,y) {			// alternatively, you can put:
        this.id = id;				this.id = id;						// `this.move = function(x,y) {...}`
        this.move(x,y);				this.move(x,y); 					// inside of [Shape] (constructor) function 
    }							};										// but every [Shape] instance makes a new [Function] 
    move(x,y) {					Shape.prototype.move = function(x,y) {	// using `Shape.prototype.move = function(x,y) {...}`
        this.x = x;					this.x = x;							// creates 1 instance of .move() [Function]
        this.y = y;					this.y = y;							// and reuses it in every instance of [Shape]
    }							};
}
class Circle extends Shape {	
	constructor(id,x,y,r) {		var Circle = function(id,x,y,r) {
		super(id,x,y);				Shape.call(this,id,x,y); // calls parent's constructor [Function]
		super.move(x,y);			Shape.prototype.move.call(this,x,y); // calls parent's .move() [Function]
		this.r = r;					this.r = r;
	}							}
}								Circle.prototype = Object.create(Shape.prototype);	// same as: `extends Shape`
								Circle.prototype.constructor = Circle;				// same as: `extends Shape`

// ES6														// ES5
class Rectangle {
	constructor (width, height) {							var Rectangle = function() {
		this._width  = width;									this._width  = width;
		this._height = height;									this._height = height;
	}														}
															Rectangle.prototype = {
	set width  (w) { this._width = w                 }			set width  (w) { this._width = w                 },
	get width  ()  { return this._width              }			get width  ()  { return this._width              },
	set height (h) { this._height = h                }			set height (h) { this._height = h                },
	get height ()  { return this._height             }			get height ()  { return this._height             }
	get area   ()  { return this._width*this._height }			get area   ()  { return this._width*this._height }
}															}
var r = new Rectangle(1,1);									var r = new Rectangle(1,1);
r.area --> 1												r.area --> 1
r.width = 3; r.height = 7;									r.width = 3; r.height = 7;
r.area --> 21												r.area --> 21
r.area = 5; /* does nothing: no setter */					r.area = 5; /* does nothing: no setter */
r.area --> 21												r.area --> 21

//----- static method -----//
// ES6							// ES5
class Math {					
	constructor() {				var Math = function() {
	}							};
	static random() {			Math.random = function() {
	}							};
}
Math.random() --> 0.795... 		Math.random() --> 0.795...
var m = new Math();				var m = new Math();
m.random() --> TypeError		m.random() --> TypeError

// ES5 setters & getters & object 'onchange' event
var obj = {
	onchange: undefined,
	_key: undefined,    // obj._prop required, otherwise infinite loop with: `set prop(value) { this._prop = value; }`
	get key() { return this._key; },
	set key(value) { this._key = value; this.onchange(); }					// Backbone
};																			var obj = new Backbone.Model({key:undefined});
obj.onchange = function() {...};		obj.key --> undefined				obj.on('change:key', onchange); // 'onchange' function/event
obj.key = 1; /* fires obj.onchange() */	obj.key --> 1 						obj.set('key', value); // fires onchange();


// Constructor = function designed to be used with "new"
// every object has a .constructor object
// find the class of an object using .constructor because the name of the constructor function is ClassName
(3).constructor   === Number  --> true
'abc'.constructor === String  --> true
true.constructor  === Boolean --> true
({}).constructor  === Object  --> true
[].constructor    === Array   --> true
(function(){}).constructor === Function --> true
inst.__proto__.constructor === CustomClass --> true

// instanceof (checks the entire inheritance chain)
{} instanceof Object --> true // Object
[] instanceof Array  --> true // Array <-- Object
[] instanceof Object --> true // Array <-- Object
function(){} instanceof Function --> true // Function <-- Object
function(){} instanceof Object   --> true // Function <-- Object
3     instanceof Number  --> false // DOES NOT work with primitives
'abc' instanceof String  --> false // DOES NOT work with primitives
true  instanceof Boolean --> false // DOES NOT work with primitives
new Number(3)     instanceof Number  --> true // unless you use "new" operator (NOT recommended)
new String('abc') instanceof Number  --> true // unless you use "new" operator (NOT recommended)
new Boolean(true) instanceof Boolean --> true // unless you use "new" operator (NOT recommended)


// Prototype
var func = function(){}
func.prototype; // every function has .prototype object
func.prototype.constructor; // every .prototype object has a .constructor object
func.prototype.constructor === func;

// ClassName is a constructor function object 
var ClassName = function(){}; // capitalize constructor names
ClassName.prototype.key = value; // can add variables to any functions
ClassName.prototype.fnct = function(){}; // can add functions to any functions
// objects created using the "new" operator have links to (not copies of) variables & functions added to ClassName.prototype
var inst = new ClassName();

// Prototype/Inheritance Chain
// inst inherits from ClassName.prototype (inherits from OldClass.prototype, inherits from Object.prototype, inherits from null)
inst.__proto__                --> ClassName.prototype   <-- OldClass.prototype <-- Object.prototype <-- null
ClassName.prototype.__proto__ --> OldClass.prototype
OldClass.prototype.__proto__  --> Object.prototype
Object.prototype.__proto__    --> null

(function(){}).__proto__   --> Function.prototype       <-- Object.prototype <-- null
([]).__proto__             --> Array.prototype          <-- Object.prototype <-- null
({}).__proto__             --> Object.prototype         <-- null
Object.prototype.__proto__ --> null


// Douglas Crockford (~2006)          Mozilla (pre-2006)               ECMAScript 5                              ECMAScript 6
   /* hidden */                       a.__proto__        /* same as */ Object.getPrototypeOf(a)    /* same as */ a.[[Prototype]]
ClassName.prototype = new OldClass()  b.__proto__ = a    /* same as */ Object.setPrototypeOf(b, a) /* same as */ b.[[Prototype]] = a
b={}; b=object(a)       /* same as */ b={}; b.__proto__=a/* same as */ obj = Object.create(a)      /* same as */ b={}; b.[[Prototype]]=a
//        _||_
//        \  /
//         \/
function object(o) { // creates a new object from an old object, preserving inheritance 
	//function F() {}; ???
	function F {}    // F = function(){}                F.prototype.constructor === F             --> true
	F.prototype = o; // F = constructor for object (o)  F.prototype.constructor === o.constructor --> true
	return new F();  // return a new object created using o's constructor
}

// Prototypal/Prototypical Inheritance
// GET child.key:  try {GET child.key} else try {GET parent.key}	// parent.key === child.__proto__.key
// SET child.key = value
child.__proto__ = parent 	parent.key --> 0	/* === */	child.key --> 0 // child.key === parent.key === child.__proto__.key
parent.key = 1				parent.key --> 1	/* === */	child.key --> 1 // child.key === parent.key === child.__proto__.key
child.key  = 2				parent.key --> 1	/* !== */	child.key --> 2 // child.key === child.key
delete child.key 			parent.key --> 1	/* === */	child.key --> 1 // child.key === parent.key === child.__proto__.key
child.__proto__ === parent --> true	// === compares object references, but not values (no .equals method)

// SET child.obj.key = value
child.__proto__ = parent 	parent.obj --> {a:0}			child.obj --> {a:0}	// child.obj === parent.obj === child.__proto__.obj
parent.obj.a = 1			parent.obj --> {a:1}			child.obj --> {a:1}	// child.obj === parent.obj === child.__proto__.obj
child.obj.a  = 2			parent.obj --> {a:2}			child.obj --> {a:2}	// child.obj === parent.obj === child.__proto__.obj
delete child.obj.a 			parent.obj --> {}				child.obj --> {} 	// child.obj === parent.obj === child.__proto__.obj
							parent.obj.a --> undefined 		child.obj.a --> undefined






//---------- Object Psuedo-Classes ----------//
// Douglas Crockford (2006 & 2014)
// No Classes (does not use "new" operator)
// No Inheritance (.prototype and .constructor won't work)
function new_ClassName(args) { 	// <-- this is the constructor function
// args = object (can be JSON), can access properties by name, order doesn't matter, don't have to know # arguments, can change over time
	
	// Psuedo-Inheritance
	//var that = {};					// No Inheritance
	var that = new_OldClass(spec);		// parasitic inheritance
	
	// Private Variables & Functions
	var private_var = args.key || default;
	var private_func = function() {};	// uses more memory than prototypes (Method 1), but who cares?
	
	// Public Variables & Functions
	that.public_var = args.key || default;
	that.public_func = function() {};	// uses more memory than prototypes (Method 1), but who cares?
	// Public Functions can access public/private variables/functions due to closure

	return that; // mandatory
}
var inst = new_ClassName({args}); // No "new" operator
// "inst" can only access private variables/functions indirectly through public functions

// shared secrets (min ~35)
// super methods

//---------- Object Classes (Method 1) ----------//
// Method 1: original Netscape implementation & Douglas Crockford (~2007)

// Declare, Instantiate, Initialize
//    Date d = new Date()  // java
//     var d = new Date()  // javascript
    var inst = new ClassName(arg1, arg2, ...);

// Declare: [Class/Type] [var_name];
//			int i;  // java 
//			var i;  // javascript (loosely typed = any variable can be any type/class forever)
            var inst;	// same as: var person = undefined;
            // javascript declares, instantiate (allocates memory), and initializes (defines) as 'undefined'

// Instantiate: new [Class/Type Constructor Function];
//              new Date()  // java (I think: "new" allocates memory)
//              new Date()  // javascript
                new ClassName() /* same as */ new(ClassName())
                							  function new(className)
											  { var obj = {};	// creates a new object ({})
												className.apply(obj, arguments)	// obj.className(arguments), so "this" refers to "obj" within "className"
												return obj; // returns an object with a link to ClassName.prototype
											  }

// Initialize:   [Class/Type Constructor Function]		// "constructor" = functions designed to be used with "new"
//               Date()  // java
//               Date()  // javascript
                 ClassName(arg1, arg2, ...)  // constructor function

function ClassName(args) { // <-- this is the constructor function
// spec = can be JSON, can access properties by name, order doesn't matter, don't have to know # arguments, can change over time

	// Private Variables & Functions
	var private_var = args.key || default;
	var private_func = function() {};	// Note: creates new function object with every new instance of ClassName
	
	// Public Variables & Functions
	this.public_var = args.key || default;
	this.public_func = function() {};	// Note: creates new function object with every new instance of ClassName

	return this; // optional
}
// Inheritance                           ClassName.prototype.constructor --> ClassName.constructor
ClassName.prototype = new OldClass(); // ClassName.prototype.constructor --> OldClass.constructor
// Optional: Public Functions (saves memory by creating one function object shared across all instances of ClassName)
ClassName.prototype.public_func = function() {something w/ this.key1, this.key2, ...; return;}; // adds .public_func() function to the ClassName constructor function object
var inst = new ClassName();

//---------- Object Classes (Method 2) ----------//
// Method 2: New (ECMAScript 6)
class Square extends Rectangle {
	constructor(sideLength, RGB)
	{	super(sideLength, sideLength)
		this.color = RGB
	}
	get sideLength()
	{	return this.height;
	}
	set sideLength(newLength)
	{	this.height = newLength;
		this.width = newLength;
	}
} 

// Example: overwrite .toString() method (for easy debugging)
ClassName.prototype.toString = function() {return '<ClassName: '+this.arg1+'>';};
>> inst; --> "<ClassName: arg1>" /* instead of */ [object Object]

// Example: extend (add variables/properties and functions to) built-in classes
String.prototype.reverse = function() {var r="";for(var i=this.length-1;i>=0;i--){r+=this[i];}return r;};
"Tylor".reverse(); --> "rolyT"



///////////////////////////////
////////// singleton //////////
///////////////////////////////

// module: has private variables (only visible inside module) <-- functions are the only way to limit scope
// singleton: restricts the instantiation of a class to one object.
var singleton = {};  /* same as */  var singleton = {
										public_var: value,
										public_func: function(args) {},
										...
									};
var singleton = function() {
	var private_var;
	var private_func = function(args) {};
	return {
		public_var: value,
		public_func: function(args) {},
		...
	}
}(); // must invoke function to return singleton object


// export module (Douglas Crockford calls "singleton")
var MODULE = (function() {
	var private_var;
	var private_func = function() {...};
	...
	return {
		public_var: value,
		public_func: function() {...},
		...
	};
})();
// augment (append to) existing module (without private variables/functions)
EXISTING_MODULE.public_var;
EXISTING_MODULE.public_func = function() {...};
// augment (append to) existing module (with private variables/functions)
var EXISTING_MODULE = (function(mod) {
	var private_var;
	var private_func = function() {...};
	...
	mod.public_var;
	mod.public_func = function() {...};
	mod.existing_var = ...; // overrides existing variable
	...
	return mod;
})(EXISTING_MODULE || {}); // use EXISTING_MODULE if it exists, otherwise default to {} (create new object)

///////////////////////////
////////// Array //////////
///////////////////////////
var arr = [1,true,'a'];
arr[0] --> 1

var [num,bool,str] = arr;
[0,...arr] --> [0,1,true,'a']

arr.length;

// "modifier" functions (modifies original array, does NOT simply return a new array)
[1,2] + [3,4,10] --> [1,2].toString() + [3,4,10].toString() --> "1,2"+"3,4,10" --> "1,23,4,10"
.pop();						// removes & returns last item in array
.shift();					// removes & returns first item in array
.push(item3, item4, ...);	// adds items to the end of the array
.unshift(item3, item4, ...);// adds items to the beginning of the array
.reverse();					// modifies array (doesn't simply return reversed array)
.sort();					// sort item.toString() (alphabetical order)
.sort(function(a,b) {return a-b;});	// a = first, b = second, if a<b (correct order) return negative (-1); else if a>b return positive (1); else (a=b) return 0;
.splice(index, lengthRemoved)
.splice(index, lengthRemoved, injectItem1, injectItem2, ...); // inserts items
	var arr = [1,2,3,4,5];
	arr.splice(2,2) 		/* removes/returns: */ [3,4]                        /* modifying: */ arr = [1,2,5]
	arr.splice(2,2,'a','b')	/* removes/returns: */ [3,4] /* injects: */ 'a','b' /* modifying: */ arr = [1,2,'a','b',5]
	arr.splice(2,0,'a','b')	/*         returns: */ []    /* injects: */ 'a','b' /* modifying: */ arr = [1,2,'a','b',3,4,5]

.forEach(function(item, index, array) {item === array[index];}); // applies function to every item in array
.forEach(function(item) {item.count+=1;}); // modifying item modifies array
Object.keys(obj).forEach( (key) => {var value = obj[key];} ); // ES6

// "accessor" functions (returns new array, without modifying original array)
.toLocaleString();	 		// ???
[1,2].toString(); --> "1,2"
.join(delimiter);	// .join() === .join(',') === default delimiter (use: .join("") for no delimiter)
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
["a","a","c"].lastIndexOf("a") --> 1
.map(function(item, index, array) {...});		// return new array with function applied to every item
.map(function(item) {...});						// same
.filter(function(item, index, array){return array[index] > 0;});	// returns positive subset of original array
.filter(function(item){return item > 0;});							// same
.every(function(item, index, array) {return array[index] > 0;});	// returns true if ALL  items in array are positive
.every(function(item) {return item > 0;});							// same
.some(function(item, index, array) {return array[index] > 0;});		// returns true if SOME items in array are positive
.some(function(item) {return item > 0;});							// same
.reduce(function(firstItem, secItem, index, array) {...});			// run function (n-1) times (n = array.length)
.reduce(function(firstItem, secItem) {...});							// same
.reduceRight(function(prevItem, lastItem, index, array) {...});		// same as .reduce(...), except opposite direction
.reduceRight(function(prevItem, lastItem) {...});					// same

[1,2,3,4].reduce(function(prevItem, thisItem) { return prevItem + thisItem; })
[1,2,3,4] --> [(1+2),3,4] --> [3,3,4] --> [(3+3),4] --> [6,4] --> (6+4) --> 10	// n = 4 
//			    1st run 				   2nd run 				 3rd run 		// runs = n-1 = 3
[1,2,3,4].reduceRight(function(prevItem, thisItem) { return prevItem + thisItem; })
[1,2,3,4] --> [1,2,(3+4)] --> [1,2,7] --> [1,(2+7)] --> [1,9] --> (1+9) --> 10

//----- spread operator (...) -----//
var arr = [3,4]
[1,2,...arr] /* same as: */ [1,2,3,4]
func(...arr) /* same as: */ func(3,4)

//////////////////////////
////////// Date //////////
//////////////////////////
var date = new Date(); // same as: Date.now();
var date = new Date(819188640000); // represented as milliseconds since "1970-01-01 0:00"
var date = new Date('December 17, 1995 03:24:00');
var date = new Date('1995-12-17T03:24:00');
var date = new Date(1995, 11, 17, 3, 24, 0);

// getters
date.getFullYear()	// 1970-2XXX
date.getMonth()     // 0-11 (starts with 0)
date.getDate()      // 1-31
date.getHours()		// 0-23
date.getMinutes() 	// 0-59
date.getSeconds()	// 0-59

// setters
date.setFullYear(2015)	// 1970-2XXX
date.setMonth(0)		// 0-11 (starts at 0!)
date.setDate(1)			// 1-31
date.setHours(0)		// 0-23
date.setMinutes(0)		// 0-59
date.setSeconds(0)		// 0-59

// format using date/time library, like:
var strftime = require('strftime');
strftime('%B %d, %Y %H:%M:%S');
strftime('%F %T', date);

/////////////////////////////////////////////////
////////// Regular Expression (RegExp) //////////
/////////////////////////////////////////////////
/[a-z]*/


///////////////////////////////////////
////////// Errors/Exceptions //////////
///////////////////////////////////////
Error /* default */ | EvalError | RangeError | ReferenceError | SyntaxError | TypeError | URIError

// Error constructors
throw new Error("Reason error was thrown"); 		--> Uncaught Error: Reason error was thrown
throw new EvalError("Reason error was thrown"); 	--> Uncaught EvalError: Reason error was thrown
throw new RangeError("Reason error was thrown"); 	--> Uncaught RangeError: Reason error was thrown
...

// lazy way to create custom Error (not actually an [Error] object, just a normal [object])
throw {
	name: 'ErrorName',
	message: 'Reason error was thrown'
}; // --> Uncaught {name:'ErrorName', message: 'Reason error was thrown'}

// try/catch
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

/////////////////////////////////////
////////// Promise (.then) //////////
/////////////////////////////////////
// promise = asynchronous/deferred [Object] that eventually equals: return value (or Error)
//								resolved:
// promise state: pending __,--> fulfilled (Success)
//						    `--> rejected  (Error)
// Angular's $q is inspired by Kris Kowal's Q: https://github.com/kriskowal/q ($ npm q)

promise.then(onFulfilled, onRejected)
promise.then(
	function(...) {...}, 
	function(err) {...}
)
promise
	.then(function(...) {...})    /* same as: */   .then(function(...) {...}, null)
	.catch(function(err) {...})   /* same as: */   .then(null, function(err) {...})


var promise = new Promise(function(resolve, reject) { // "executor" = function(resolve, reject) {...}
	if (success)
		resolve( value|func() );	--> .then(function( value|return ) {})
	else if (error)
		reject('error message');	--> .catch(function(err) {})
});
promise
	.then(function( value|return ) {})
	.catch(function(err) {})


var promise = Promise.resolve( value|func() );	// "static" resolve = turns a  value into a (resolved) promise
var promise = Promise.reject('error message');	// "static" reject  = turns an error into a (rejected) promise
var promise = Promise.all( [promise, func(), value] ) // resolves only after all promises/functions/values resolve
	promise.then(function(values) {...}) // values = [resolved, return, value]
var promise = Promise.race( [prom1, prom2] )
	promise.then(function(value) {...}) // value = return value of first promise to resolve

// .then(...) takes a function, async#(), NOT a promise
// value# is the previous promise's resolved value
// async#() returns a promise (or does not return)
var async1 = function() { return prom1|value1; }	/* same as: */	var async1 = function()       { return prom1|value1;  }
																	var async2 = function(value1) { return prom2|value2;  }
																	var async3 = function(value2) { return prom3|value3;  }
																	var sync   = function(value3) { value3; }
async1()															async1()
	.then(function(value1) { return prom2|value2;  })				//	.then(async2)
	.then(function(value2) { return prom3|value3;  })				//	.then(async3)
	.then(function(value3) { value3; })								//	.then(sync)
	.catch(function(err) {...})										//	.catch(onErr)

// nested = useful if you need to access 'id' && 'user' (the output of previous promises)
getIdPromise()
	.then(function(id) { 
		return getUser(id)
			.then(function(user) { /* do something with user */ })
	})

// chained
getIdPromise()
	.then(function(id)   { return getUser(id);          })
	.then(function(user) { /* do something with user */ })


//----- Pattern 1: One-time Events -----//
// window.onload = init    ---promisify---> onloadPromise().then(init)
function onloadPromise(){
	return new Promise(function(resolve, reject) {
		window.onload = resolve;
	});
}

//----- Pattern 2: Normal Callback(s) -----//
// asyncCallback(..., success, fail)    ---promisify---> asyncPromise(...).then(success).catch(fail)
function asyncPromise(...){
	return new Promise(function(resolve,reject) {
		asyncCallback(...,resolve,reject);
	});
}

//----- Pattern 3: Options Callback(s) -----//
// asyncOptions({         ---promisify---> asyncPromise(...).then(success).catch(fail)
//    complete: success,
//    error:    fail
// })
function asyncPromise(...){
	return new Promise(function(resolve,reject) {
		asyncOptions({
			... :     ..., 
			complete: resolve,
			error:    reject,
			... :     ...
		});
	});
}	

//----- Pattern 4: "Nodeback", Solution 1: Manually -----//
// "nodeback" = node-style callback = last argument is function callback(err, data)
// asyncNodeback(..., callback)    ---promisify---> asyncPromise(...).then(success).catch(fail)
function asyncPromise(...){
	return new Promise(function(resolve,reject) {
		asyncNodeback(...,function(err,data) {
			if(err !== null) reject(err);
			/* else? */ resolve(data);
		});
	});
}

//----- Pattern 4: "Nodeback", Solution 2: BlueBird's Promise.promisifyAll() -----//
// creates new, promisified version of all functions; adds 'Async' suffix; doesn't need the last callback argument
// asyncNodeback(..., callback)    ---promisify---> asyncNodebackAsync(...).then(success).catch(fail)
var fs = Promise.promisifyAll(require("fs")); 
fs.readFileAsync("myfile.js").then(...)

//----- Pattern 4: "Nodeback", Solution 3: BlueBird's Promise.promisify() (individual functions) -----//
// asyncNodeback(..., callback)    ---promisify---> asyncPromise(...).then(success).catch(fail)
var readFilePromise = Promise.promisify(require("fs").readFile);
readFilePromise("myfile.js").then(...)

// Patterns inspired by: http://stackoverflow.com/questions/22519784/how-do-i-convert-an-existing-callback-api-to-promises

// http://www.mattgreer.org/articles/promises-in-wicked-detail/
// build Promises from scratch
// starting with something like:
function doSomething() {
	// do something...
	var promise = {
		then: function(resolve, reject) {
			if (err)
				reject(err)
			else
				resolve(value);
		}
	};	
	return promise;
}
var prom = doSomething().then(function onSuccess() {...}, function onFail() {...})

////////////////////////////////////////
////////// Generators (.next) //////////
////////////////////////////////////////
function* oneTwo() {
	yield 1; 	 // 1st .next().value
	yield* ab(); // 2nd & 3rd .next().value
	yield 2;	 // 4th .next().value
}
function* ab() {
	var a = yield 'a';	 // 2nd .next().value
	console.log('a:',a);
	yield 'b';	 // 3rd .next().value
}

var iterator = oneTwo(); // [Iterator] has .next()
iterator.next() --> {value:1,         done: false}
iterator.next() --> {value:'a',       done: false}
iterator.next() --> {value:'b',       done: false}
iterator.next() --> {value:2,         done: false}
iterator.next() --> {value:undefined, done: true}

////////////////////////////////////
////////// Function Types //////////
////////////////////////////////////
// [1] Function Declatation
// [2] Function Expression: Anonymous Function
// [3] Function Expression: Anonymous Function: Arrow Function (ES6/2015)
// [4] Generator Function

//----- [1] Function Declaration -----//
function func(param1, param2, ...rest) {...}

//----- [2] Function Expression: Anonymous Function -----//
var func = function(param1, param2, ...rest) {...};
let func = function(param1, param2, ...rest) {...};
obj.func = function(param1, param2, ...rest) {...};
return     function(param1, param2, ...rest) {...};

// can have different `external` and `internal` references
var external = function internal(runTwice) {
	if (runTwice)
		internal(!runTwice); // recursion uses `internal` reference
}
external(true); // call with `external` reference

//----- [3] Function Expression: Anonymous Function: Arrow Function (ES6/2015) -----//

// parameters
() => {...}						// takes 0 parameters (parenthesis REQUIRED)
param1 => {...}					// takes 1 parameter  (parenthesis optional: w/o parenthesis)
(param1) => {...} 				// takes 1 parameter  (parenthesis optional: w/  parenthesis)
(param1,param2,...rest) => {...}// takes N parameters (parenthesis REQUIRED)

// return
(param1,param2,...rest) => { return true; } //
(param1,param2,...rest) => true 			// same as above: `{return true;}`
(param1,param2,...rest) => ({a:true})		// return [Object] literal requries parenthesis 
//(param1,param2,...rest) => return true;  --> SyntaxError: Unexpected token return
//(param1,param2,...rest) => true;         --> SyntaxError: Unexpected token ;

// `this` is parent's `this` (only for [3] Arrow Function) 
var parents_this = this;
var func = () => this === parents_this
func() --> true // arrow function's `this` === parent function/scope's `this`

/////////////////////////////////////////
////////// Function Properties //////////
/////////////////////////////////////////
// [1] [Function] is an [Object]
// [2] 2-pass read 
// [3] run-to-completion
// [4] functions are used for: functions, methods, constructors, classes, modules, objects, (scope with `var`)

// [1] [Function] is an [Object]
(function(){}) instanceof Object --> true 	// [Function] inherits from [Object]
var callback = function() {...};			// functions are objects
onSuccess(callback); 						// functions can be passed
function getCallback() {return callback;} 	// functions can be returned

// [2] 2-pass read 
// 		1st pass (not called "parse time") = collects all Function Declarations [1]
// 		2nd pass (not called "runtime")    = executes the code

// Function Declaration 							// Function Expression
// `func` is created before any code is executed	 
func();												func(); --> Error: "ReferenceError: func is not defined"
function func() {...} 								var|let func = function() {...}; // `func` is created at runtime

// [3] run-to-completion = once a function starts running, it will always run to completion before any other JS code can run
// 		exception: ES6 yeild (http://davidwalsh.name/es6-generators)

//----- "argument" vs. "parameter" -----//
func('arg1','arg2',...); 				// "argument"  = "the actual value" (the [Object] passed into the function)
function func(param1, param2, ...) {	// "parameter" = "the reference to the argument" (or variable name defined in the function)
	// code...
}

//----- arguments -----//
// too many arguments --> no error
func(1,2);
function func(x) {
	x --> 1
	arguments[1] --> 2
}

// too few arguments --> undefined arguments = `undefined`
func();
function func(x) {
	x --> undefined
}

// `arguments` array-like [Object] 
// array-like list of function's arguments (only available within function) to access function's arguments programmatically
func('ag1','ag2')
function func(param1, param2) {
	arguments --> ['arg1', 'arg2']				// `arguments` is similar to an [Array], but is NOT an [Array]
	arguments.length 							// `arguments.length` exists (but not the same as [Array].length?)
	arguments.__proto__ --> Object.prototype 	// `arguments` inherits from [Object], not [Array]
	arguments.forEach() --> TypeError 			// `arguments` does NOT have [Array]'s functions
	Array.prototype.slice.apply(arguments,[2]); // to use [Array]'s functions, use .apply():
	// effectively: arguments.slice(2)	
}

// spread operator (...)
func(...[3,4]) /* same as: */ func(3,4)
func(...'str') /* same as: */ func('s','t','r')

//----- parameters -----//
// parameters are not cast
// parameters are not type checked

// `...rest` = subset of `arguments` array-like [Object]
var func = function(param1, param2, ...rest) {
	rest.length
	rest[index]
}

// destructuring parameters 
function func({a,b}) {...}	/* same as: */ 	function func(obj) { var a = obj.a,  b = obj.b;  }
function func([a,b]) {...}	/* same as: */ 	function func(arr) { var a = arr[0], b = arr[1]; }

// default parameter values
function func(x = 1) {
	/* same as: */ if (x === undefined) x = 1;
	// NOT: x = x || 1; // which is same as (below)
	// NOT: if (x === false|0|""|NaN|null|undefined) x = 1;
}


//----- return -----//
return; --> undefined	// same as: return undefined; (most of the time)
return; --> this		// if constructor, returns new object (this)


//----- this -----//
obj.func(); /* within func() */		this --> obj
func();		/* within func() */		this --> global object = window /* in browser */, GLOBAL.window /* nodejs */
	/* if you need access to parent obj */ var that = this; // in parent, then access func()'s parent using 'that' variable within func()
new func(); /* within func() */		this --> {} // because "new" applies Constructor Function to new object {}


//----- .apply -----//
func.apply(obj, [arg1, arg2, ...]) // obj.func(arg1, arg2, ...)


///////////////////////////
////////// scope //////////
///////////////////////////

// "Lexical Scoping" or "Static Scoping":
//		anything outside of scope is available inside of scope (via closure)
//		anything inside of scope is NOT avaialble outside of scope

this                        this --> window   // outer-most scoope
function func()           { this --> window }
var|let func = function() { this --> window };
obj.func     = function() { this --> obj    };

var a = 7;                     window.a --> 7
let a = 7;                     window.a --> undefined
function func() {var|let a=7;} window.a --> undefined
...             {var|let a=7;} window.a --> undefined


(function(){var foo = "bar";})();			// local scope
foo --> ReferenceError: foo is not defined
(function(){window.foo = "bar";})();		// global scope (browser)
(function(){GLOBAL.window.foo = "bar";})();	// global scope (nodejs)
foo --> "bar"
window.foo --> "bar"



/////////////////////////////
////////// closure //////////
/////////////////////////////
// JavaScript closure = a [Function] that maintains a reference to a variable that's in its outer scope (that's outside its own/inner scope)
// (generic)  closure = something stores variables from outside its scope (stores the "outer state")

// simple example: Public variable (technically closure, colloquially not closure)
var x = 0;				// `x` is outside the scope of add() (`x` is in its outer scope)
var add = function() {	// `x` is NOT passed as an argument/parameter
	x++;			 	// `x` is accessed from inside the scope of add() (inner scope) 
};						// `x` is actually a reference to `x` (NOT a copy of `x`)
...
add();	// add() maintains a reference to `x`, even after outer state/scope executes
		// this reference "stores" the variable (prevents JavaScript from garbage collecting it)

// better example: Private variable 
var add = (function() {		  // `x` is in the inner scope of the outer function
	var x = 0;				  // `x` is in the outer scope of the inner function
	return function() {x++;}  // `x` is NOT passed as an argument/parameter into the inner function
})();						  // `x` is accessed from within the inner function
...
add();	// add() maintains a reference to `x`, even after the outer function executes

// PROBLEM: var i; is hoisted
// var i; // hoisted
var arr = [];
for (var i=0;i<3;i++) {
    arr[i]=function(){
    	return i;
    };
}
arr[0]() --> 3
arr[1]() --> 3
arr[2]() --> 3

// NOT A SOLUTION: anonymous function ("closure")
var arr = [];
for (var i=0;i<3;i++) {
	arr[i]=(function() {
		return function(){
			return i;
		};
	})();
}
arr[0]() --> 3
arr[1]() --> 3
arr[2]() --> 3

// SOLUTION: Closure: Private variable
var arr = [];							var arr = [];
for (var i=0;i<3;i++) {					for (var i=0;i<3;i++) {
	arr[i]=(function() {					(function() {
		var eye = i;							var eye = i; // var i = i; // doesn't work because same as: var i; i = i; i --> undefined
		return function(){						arr[i] = function(){
			return eye;								return eye;
		};										};
	})();									})();
}										}
arr[0]() --> 0							arr[0]() --> 0
arr[1]() --> 1							arr[1]() --> 1
arr[2]() --> 2							arr[2]() --> 2

// SOLUTION: Closure: Parameter
var arr = [];							var arr = [];
for (var i=0;i<3;i++) {					for (var i=0;i<3;i++) {
	arr[i]=(function(eye) {					arr[i]=(function(i) { // i = i; works as a parameter, but is confusing IMHO
		return function(){						return function(){
			return eye;								return i;
		};										};
	})(i);									})(i);
}										}
arr[0]() --> 0							arr[0]() --> 0
arr[1]() --> 1							arr[1]() --> 1
arr[2]() --> 2							arr[2]() --> 2

// SOLUTION: `let` declaration
var arr = [];
for (let i=0;i<3;i++) {
    arr[i]=function(){return i;};
}
arr[0]() --> 0
arr[1]() --> 1
arr[2]() --> 2 


//////////////////////////////////////////////
////////// Generator Function (ES6) //////////
//////////////////////////////////////////////
function* generator(param1, param2, ...rest) {...}
var|let|obj.generator = function*(param1, param2, ...rest) {...}
// can't use arrow functions

function* generator(i) { // declare generator [Function]
	let a = yield 1; // let a = 'a'; // 'a' comes from .next('a') below
	let b = yield 2; // let b = 'b'; // 'b' comes from .next('b') below
} // invoking generator [Function] --returns--> iterator [Object]
let iterator = generator(); // iterator can step through generator [Function], pausing at `yield` statements
// 1st  .next()    -->           --> runs generator() until 1st `yield` statement
iterator.next()    --> {value:1,done:false} // iteration.value = 1 (or whatever comes after 1st `yield`)
// 2nd  .next('a') --> let a='a' --> runs generator() until 2nd `yield` statement
iterator.next('a') --> {value:2,done:false} // iteration.value = 2 (or whatever comes after 2st `yield`)
// last .next('b') --> let b='b' --> runs generator() to completion
iterator.next('b') --> {value:undefined,done:true} // iteration.done = true

iterator.throw(new Error('msg'))

// Example: iterative 						// Example: recursive
function* range(start,end,step=1) {			function* range(start,end,step=1) {
	while (start <= end) {						
		yield start;							yield start;
		start += step;							start += step;
	}											if (start <= end) {
}													yield* range(start,end,step); // use `yield*` to call itself 
												}								  // or other generators 
											}
											let iterator = range(0,2);
for (let i of range(0,2) ) { /* --> 0 */	do {								 // --> 0
							 /* --> 1 */		var iteration = iterator.next(); // --> 1
	console.log(i);			 /* --> 2 */		console.log(iteration.value);	 // --> 2
}											} while (!iteration.done)			 // --> undefined

// control flow with coroutine (typically use library, like: `co` or `Bluebird`)
co(function*(id) {
	let user   = yield asyncGetUser(id);
	let parent = yield asyncGetUser(user.parent.id);
	return parent;
});

/////////////////////////////////
////////// var vs. let //////////
/////////////////////////////////
//---------- var ----------//								//---------- let ----------//
// 1) allows repeat declarations 							// 1) NO repeat declarations
// 2) function-level scope 									// 2) block scope
// 3) `var` at global scope adds to global object 			// 3) `let` at gloabl scope does NOT add to global object
// 4) forgetting `var` adds it to global object 			// 4) forgetting `let` assumes `var`
// 5) hoisted & defined as `undefined` (accessible) 		// 5) effectively NOT hoisted (hoisted, but NOT defined, thus NOT accessible)

var x;														let x;
var x, y, z;												let x, y, z;
var x = 0, y = 1, z = x+y;									let x = 0, y = 1, z = x+y;

////////////////////////////////
//// 1: repeat declarations ////
////////////////////////////////
// allows repeat declarations 								// NO repeat declarations
var x = 5;													let x = 5; /* OR */ var x = 5; /* OR */ x = 5;
...															...
var x = 10; /* ignores second `var` */ 						let x = 10; --> TypeError: Identifier 'x' has already been declared


//////////////////
//// 2: scope ////
//////////////////
// function-level scope 									// block scope
function () {												function|if|for|while|do (...) {
	// scope 													// scope
}															}

(function() { /* closure (outer) */							{ // block scope (outer)
	var foo = function() {return 1;};							function foo() {return 1;}
	foo() --> 1													foo() --> 1
	(function() { /* closure (inner) */							{ // block scope (inner)
		var foo = function() {return 2;};							function foo() {return 2;}
		foo() --> 2													foo() --> 2
	})();		  /* closure (inner) */							} // block scope (inner)
	foo() --> 1													foo() --> 1
})();		  /* closure (outer) */							} // block scope (outer)

var callbacks = [];											let callbacks = [];
for (var i=0;i<3;i++) {										for (let i=0;i<3;i++) {
    (function(i) {	// closure
    	callbacks[i]=function(){return i+0.5;};					callbacks[i]=function(){return i+0.5;};
    })(i);			// closure
}															}
callbacks[0]() --> 0.5										callbacks[0]() --> 0.5
callbacks[1]() --> 1.5										callbacks[1]() --> 1.5
callbacks[2]() --> 2.5										callbacks[2]() --> 2.5

// without closure (for reference)
var callbacks = [];
for (var i=0;i<3;i++) {
    callbacks[i]=function(){return i+0.5;};
}
callbacks[0]() --> 3.5
callbacks[1]() --> 3.5
callbacks[2]() --> 3.5


//---------- global scope ----------//
// global object = `window` (browser), `GLOBAL.window` (Node.js)
// global scope  = highest level scope = not inside any function(){} 

//----- anonymous function, executed in-line -----//
// avoids polluting the global/outer namespace/scope (avoids: a=0|var a=0 --> window.a=0) 
// sometimes called "closure" or "anonymous closure", but may or may not techincally be a closure
(function(){
	// code...
})();
// breakdown:
/* 1 */   function() {...}       // [1] an anonymous function
/* 2 */ ( function() {...}  )    // [2] [Function] object
/* 3 */ ( function() {...}  )(); // [3] executed in-line (same)
        ( function() {...}());   //     executed in-line (same)


//////////////////////////////////////
//// 3: declaring at global scope ////
//////////////////////////////////////
// `var` at global scope adds to global object 				// `let` at gloabl scope does not add to global object
if (this === window) { /* if at global scope */ 			if (this === window) { /* if at global scope */
	var x = 1;													let x = 1;
	window.x --> 1 												window.x --> undefined
	this.x   --> 1												this.x   --> undefined
}															}


/////////////////////////////////////////////
//// 4: initializing undeclared variable ////
/////////////////////////////////////////////
// forgetting `var` adds it to global scope 	SAME AS: 	// forgetting `let` assumes `var`
x = 1; /* same as: */ window.x = 1;							x = 1; /* same as: */ window.x = 1;

// allows for: 									SAME AS:	// allows for:
a = 5;		 /* window.a --> 5  // global */ 				a = 5;		 // window.a --> 5  // global
var a = 2*a; /* a        --> 10 // local  */				let a = 2*a; // a        --> 10 // local

// 'use strict'; prevents ^this^ (prevents adding undeclared variable to global scope)
// Recommendation: 'use strict'; at highest level: at top of: file.js, <script>, function(){}, module, ... 
function() { /* function-level scoping */					{ // block scoping NOT available for 'use strict';
	'use strict';												// 'use strict'; // NOT scoped with blocks
	x = 1 --> ReferenceError: x is not defined
}															}

////////////////////
//// 5: hoisted ////
////////////////////
// hoisted & defined as `undefined` (accessible) 			// effectively NOT hoisted (hoisted, but NOT defined, thus NOT accessible)

/* var a; thus same as: */	var a;							// effectively not hoisted
doSomething();				doSomething();					doSomething();
var a = 1;					a = 1;							let a = 1;

/* var i,j; thus same as: */var i,j;						// effectively not hoisted
for(var i=0;i<3;i++){		for(i=0;i<3;i++){				for (let i=0;i<3;i++){
	var j = i*i;				j = i*i;						let j = i*i;
}							}								}

// PROBLEM: var i; is hoisted 								// SOLUTION: `let` declaration
// var i; // hoisted
var arr = [];												var arr = [];
for (var i=0;i<3;i++) {										for (let i=0;i<3;i++) {
    arr[i]=function(){											arr[i]=function(){
    	return i;													return i;
    };															};
}															}
arr[0]() --> 3												arr[0]() --> 0
arr[1]() --> 3												arr[1]() --> 1
arr[2]() --> 3												arr[2]() --> 2

//////////////////////////
////////// JSON //////////
//////////////////////////
// JavaScript Object Notation (JSON)
JSON.parse('{"a":1}'); --> {a:1}		// Note: JSON requires double quotes (NOT single quotes)
JSON.stringify({a:1}); --> '{"a":1}'
JSON.stringify(obj, null, '  '); // indents json with two spaces ('  ')
JSON.stringify(obj, null, '\t'); // indents json with tab character ('\t')
// Note: JSON.stringify(obj) removes functions from objects

/* valid   JSON: */ null
/* invalid JSON: */ undefined, NaN, Infinity, -Infinity, [Function], [Date], [RegExp], [Symbol]

// deep clone, duplicate, copy
var copy = JSON.parse(JSON.stringify(obj)); // removes:  [Functions], [Symbols], prototype
											// converts: [Date]   --> [String]
											// converts: [RegExp] --> {} (empty [Object])

// deep clone/copy (recursively)
var copy = $.extend(true, {}, obj);

// shallow clone/copy
var copy = $.extend( {}, obj );

// merge objects
var both = $.extend(true, obj1, obj2); // deep/recursively
var both = $.extend(obj1, obj2);

///////////////////////////////////
////////// import/export //////////
///////////////////////////////////
// ES6 														// ES5
// export (piMath.js)										// export
/* exporting modules prevents polluting global namespace */	piMath = {}; /* OR: */ (GLOBAL.)window.piMath = {};
export default function() {}
export function sum(x,y) { return x+y; }					piMath.sum = function(x,y) { return x+y; };
export var pi = 3.141593;									piMath.pi  = 3.141593;
// import													// import
import * as piMath from "piMath" // piMath.js							
piMath.sum(piMath.pi, piMath.pi) --> 2π 					piMath.sum(piMath.pi, piMath.pi) --> 2π
// OR:
import { sum, pi } from "piMath" // piMath.js
sum(pi, pi) --> 2π

import defaultFunc from "piMath" // piMath.js

////////////////////////////
////////// eval() //////////
////////////////////////////
// compiles & executes a string parameter and returns the result
// browsers use eval to convert HTML (string) to actions
// dangerous, most misused feature of language
// RECOMMENDED: don't use it ever
eval("javascript code;");

///////////////////////////////////
////////// console/debug //////////
///////////////////////////////////

// console
// commas: (con,cat,en,ate)
console.log('msg'|obj);		//     black  text
console.warn('msg'|obj);	// /!\ yellow background
console.info('msg'|obj);	// (i) black  text
console.error('msg'|err); 	// (x) red    background
console.debug('msg'|obj);	//     blue   text
console.___('str:%s, int:%i|%d, float:%f, object:%o', 'string', 3|7, 3.2, {a:1}); 

// debugger (breakpoint) (browser-only?)
debugger; // sets a breakpoint in the code, after which you can "resume" or "step"

const DEBUG = true|false;
DEBUG && console.log('msg');

/////////////////////////////////
////////// setTimeout  //////////
////////// setInterval //////////
/////////////////////////////////
setTimeout(function() {}, time);	// time = [Number] in milliseconds
setInterval(function() {}, time);	// time = [Number] in milliseconds 

//////////////////////////////
////////// HTML DOM //////////
//////////////////////////////
<div id="div_id"><div>
var div = document.getElementById('div_id'); 	// $('#div_id');

div.style.anyCSS

div.offsetLeft
div.offsetTop
div.offsetHeight 
div.offsetWidth 
div.offsetParent

div.contentEditable
div.isContentEditable

div.parentNode === div.parentElement 
	// except:
	document.<div>.parentElement; --> null  // "document" is NOT an HTML element
	document.<div>.parentNode; --> document // "document" is a "node"
div.children;		// excludes whitespace html "nodes"
//div.childNodes;	// includes whitespace html "nodes"
div.firstElementChild; //excludes whitespace html "nodes"
//div.firstChild;	// includes whitespace html "nodes"

div.appendChild(div);
div.removeChild(div);

div.className = 'class';

         /* HTML */									/* jQuery */
document.getElementById('id');				=== 	$('#id');		// <div id="id">
//  div.getElementById('id');
document.getElementsByClassName('class');	=== 	$('.class');	// <div class="class">
//  div.getElementsByClassName('class');
document.getElementsByName('name');			=== 	$('[name="elementName"]');	// <input name="elementName">
//  div.getElementsByName('name');
document.getElementsByTagName('div');		=== 	$('div');		// <div>
//  div.getElementsByTagName('div');
document.createElement('div')				===		$('<div></div>')

//---------- HTML Events ----------//
div.onclick = myclick; // = function(ev) {...};		// can only add 1 event listener function
$(div).on('click', myclick);							// (jQuery) can add multiple event listener functions
$(div).one('click', myclick);							// (jQuery) only runs once (then removes itself)
$(div).off('click', myclick);							// (jQuery) removes event listener function
div.addEventListener("click", myclick, false);			//
// div.attachEvent("onclick", function() {});			// IE <=8
//		"onkeypress", "onclick", "onmousemove", ...

function myclick(ev) {
	ev = ev || event; // all || IE <=8?
	var target = ev.target || ev.srcElement; // all || IE <=8
	ev.type --> 'click' /* all */ || 'onclick' /* IE <=8 */
	...

	// to prevent/suppress browser action associated-with/following event 
	// (i.e. - submitting form, following link, spacebar scroll, ...)
	ev.returnValue = false;
	if (ev.preventDefault) { ev.preventDefault(); }
	return false;
}
	 

// KeyboardEvent
div.onkeydown	= function(ev) {};	/* key pressed */ 							'keydown'
div.onkeypress	= function(ev) {};	/* key pressed && character inserted */		'keypress'
div.onkeyup	= function(ev) {};	/* key released */							'keyup'
	var code = ev.keyCode || ev.which; // recommended online
	ev.key --> "ArrowUp", "Enter", "Escape", ... (string) // Moz
	ev.charCode --> 91, 89, ... (integer) // Chrome, IE
	ev.code, ev.keyCode // depreciated?
	ev.altKey, ev.ctrlKey, ev.metaKey, ev.shiftKey --> true|false
	ev.isComposing
	ev.location


// MouseEvent
div.onclick 	   = function(ev) {}; /* click */ 								'click'
	div.click() 		// fires "click" event (as if user clicked div element)
div.onmousedown   = function(ev) {}; /* click or click-and-drag press/hold */	'mousedown' 
div.onmouseup 	   = function(ev) {}; /* click or click-and-drag release */		'mouseup'
div.ondblclick    = function(ev) {}; /* double-click */						'dblclick'
div.oncontextmenu = function(ev) {}; /* right-click */							'contextmenu'
div.onmousemove   = function(ev) {}; /* mouse moves */							'mousemove'
div.onmouseover   = function(ev) {}; /* mouse hover over */					'mouseover'
div.onmouseout    = function(ev) {}; /* exits hover over */					'mouseout'
	ev.clientX, ev.clientY  // IE (and Moz?)
	ev.pageX, ev.pageY 		// Moz-only?
	ev.screenX, ev.screenY
	ev.target /* all */ || ev.srcElement /* IE6-8 */   // returns the html element that triggered the event 
	ev.movementX, ev.movementY
	ev.altKey, ev.ctrlKey, ev.metaKey, ev.shiftKey
	ev.button, ev.buttons
	ev.relatedTarget // if (mouseover) target = html entered, relatedTarget = html left; if (mouseout) target = html left, relatedTarget = html entered;
	ev.region // "hit" region (canvas-only?)
// MouseScrollEvent
div.onscroll = function(ev) {};	'onscroll'


// FocusEvent
div.onfocus = function(ev) {};		'focus' // when element gains focus ("blue halo" from tabbing-into or clicking-onto html element... often form elements: <input>, <select>, <textarea>)
	div.focus() 	// fires 'focus' event
div.onblur  = function(ev) {}; 	'blur'  // (unfocus) when element loses focus ("blue halo")
	div.blur()	 	// fires 'blur' (unfocus) event
	

div.oninput	// fired when <input>'s value changes
div.onchange 	// fired when <input>, <select>, or <textarea>'s value changes

div.oncopy
div.oncut
div.onpaste

form.onsubmit	// form is submitted

window.onresize
window.onselect
window.onclose
//window.onerror 	// Note: Not useful. Many errors do not trigger window.onerror
window.onload 			 			// fires after HTML + content (images, etc.) load (after $(document).ready)
	$(window).load(function() {}); 		// (same, but jQuery)
	$(document).ready(function() {});	// BETTER: fires sooner: fires after HTML (document) loads without waiting for content (images, etc.) 
window.onhashchange // url.com/#hash

//window.location = url;		// don't use (didn't work in an old version of IE, but works in every other browser since JavaScript 1.0)
window.location.href = url; 	// redirects to url [String]
window.location.replace(url);	// redirects to url (without saving to history = no [<- Back] button)
window.location.hash = '#hash'	// can set or get

//---------- DOM methods ----------//
alert(text);			// avoid using with ajax because it breaks the asynchronous model
confirm(text);			// avoid using with ajax because it breaks the asynchronous model
prompt(text, default);	// avoid using with ajax because it breaks the asynchronous model
open();		// new window 

//---------- window / iframe ----------//
// window
//		every window, frame, & iframe has its own unique window object
//		also known as: self, parent, top
// inter-frame communication
//		frames['frameNameAttr'] = child frames & iframes


///////////////////////////
////////// html5 //////////
///////////////////////////

//----- img -----//
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement
var img = new Image(); /* HTML5  */			|| document.createElement('img');	--> <img>
var img = new Image(width, height); /* optional width & height */ 				--> <img width="571" height="851">
$('body').append(img); /* jQuery */			|| document.body.appendChild(img);
img.onload = function() {...};
img.src = 'http://i.imgur.com/RXLXWfE.jpg'; // fires: img.onload(); (event)
img.naturalWidth  --> 571
img.naturalHeight --> 851

//----- localStorage -----//
// persists through page refresh

localStorage.key = "value";					// "value" must be a string
// localStorage['key'] = "value";			// "value" must be a string
// localStorage.setItem('key', 'value');	// "value" must be a string
var myValue = localStorage.key;
//			= localStorage['key'];
// 			= localStorage.getItem('key');

localStorage.length;

delete localStorage.key;
// delete localStorage['key'];
// localStorage.removeItem('key');

// localStorage only supports storing strings, so use these functions (JSON) to store objects
Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}
Storage.prototype.getObject = function(key) {
    return JSON.parse(this.getItem(key));
}

//----- sessionStorage -----//
// same as localStorage, but mapped to session

//////////////////////////////////////////////
////////// Server-sent Events (SSE) //////////
//////////////////////////////////////////////
// NOT supported by: IE, Edge (there are polyfills)
// automatically reconnects/resumes, reuses connections to the same URL, avoids blocking other HTTP traffic

// client
let eSource = new EventSource('url.com/sse'); // opens a persistent connection to an HTTP server
eSource.onmessage = function(e) {  // `text/event-stream` events
	let obj = JSON.parse(e.data);
};
eSource.close(); // connection remains open until closed
// server (Node.js)
res.writeHead(200, {
	"Content-Type":"text/event-stream", // `text/event-stream` events
	"Cache-Control":"no-cache", // prevents caching of event data (unneccessary?)
	"X-Accel-Buffering":"no" // disable buffering (if not, 90 byte msg waits in buffer for more data)
});							 // alternatively: nginx: proxy_buffering off (default: 8KB) 
res.write("data: "+JSON.stringify(obj)+"\n\n"); // \n\n = end of message
// ... 											// can keep sending messages that end with \n\n


// client
let eSource = new EventSource('url.com/sse'); // opens a persistent connection to an HTTP server
eSource.addEventListener('eventName', function(e) {  // `text/event-stream` events
	let obj = JSON.parse(e.data);
});
eSource.close(); // connection remains open until closed
// server (Node.js)
res.writeHead(200, {
	"Content-Type":"text/event-stream", // `text/event-stream` events
	"Cache-Control":"no-cache", // prevents caching of event data (unneccessary?)
	"X-Accel-Buffering":"no" // disable buffering (if not, 90 byte msg waits in buffer for more data)
});							 // alternatively: nginx: proxy_buffering off (default: 8KB) 
res.write("event: eventName\n");
res.write("data: "+JSON.stringify(obj)+"\n\n"); // \n\n = end of message
// ... 											// can keep sending messages that end with \n\n


res.write("key1: value1\n");	// (optional) can use custom fields 
res.write("key2: value2\n");	// (optional) remember \n because messages are parsed line-by-line
res.write("id: uniqueId\n");	// (optional) incrementing message count is often a useful id
res.write("event: eventName\n");// (optional) eSource.addEventListener('eventName', e => { ... });
res.write(":comment\n");		// (optional) lines that start with colon are ignored
res.write("retry:1000\n");		// (optional) lightens server load, Node.js can handle ~10,000 connections, PHP/Apache & Ruby much less
res.write("data: "+JSON.stringify(obj)+"\n\n"); // in other languages, need to: .flush()
