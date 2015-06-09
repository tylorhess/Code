// no 'class' ('object prototypes' instead)
// function() {} = object
//		can hold executable code
//		can be passed as argument/parameter

// distinct features of javascript
//	load-and-go delivery = programs are delivered to the execution site as source code (delivered as text, not .exe)
//	loosely typed = var x; can be any class/type. any variable can receive any value, any value can be returned from a function (NOT an "untyped" language, just "loose")
//	objects as containers = var obj = {key: "value"} = hash table/map (key-value pairs) that can be added-to/modified at any time
//	prototypal inheritance = objects inherit directly from other objects (there are no classes)
//	lambda = functions as first-class objects, like: Array, Date, (Number, Boolean, String) ... ("functional language" like lisp & scheme)
//	linkage through global variables = doesn't have linker because of load-and-go model 
//		compilation units combined in global namespace
//		(bad idea: security problems, reliability problems, and other things...)

// reserved words
// used
	break case catch continue default delete do else false finally for function if in instanceof new; null return switch 
	this throw true try typeof var void while with
// unused
	abstract boolean byte char class const debugger double enum export extends final float goto implements import int interface
	long native package private protected public short static super synchronized throws transient volatile 

// debugger
debugger; // sets a breakpoint in the code, after which you can "resume" or "step"

//---------- Types ----------//
undefined 	// var x; 		 --> undefined // declared, uninitialized (technically, initialized for you (or "defined") as undefined)
null 		// var x = null; --> null      // declared, deliberately initialized (to null)
Boolean
Number 	// Double or Integer
String 	// no char type
Object
	function
	Array
	Date
	RegExp
Error
	Error 		// default
	EvalError
	RangeError
	ReferenceError
	SyntaxError
	TypeError
	URIError
0xD800		// charCode

typeof(x) --> 'undefined'|'boolean'|'number'|'string'|'function'|'object'
	typeof(undefined) 	--> 'undefined'
	typeof(null) 		--> 'object' NOT null 	// no null type
	typeof(true|false) 	--> 'boolean'
	typeof(0|1|NaN) 	--> 'number'
	typeof(""|"text") 	--> 'string'
	typeof(function(){}) --> 'function'
	typeof({}|[]|null|almost anything) --> 'object'
typeof(typeof(x)) --> 'string'

// variables
// 		case sensitive
// 		start with: letter, $, _
// 		contains: letters, digits, $, _
var x;
var x, y, z;
var x = 0,
	y = 1,
	z = x+y;

//---------- undefined vs. null ----------//
var x; 		   --> undefined // declared, uninitialized (technically, initialized for you (or "defined") as undefined)
var x = null;  --> null		 // declared, deliberately initialized (to null)

//---------- Boolean ----------//
Boolean() --> true
Boolean(false|0|""|NaN|null|undefined) --> false
	 !!(false|0|""|NaN|null|undefined) --> false
Boolean(true|"0"|[]|{}|anything else...) --> true
	 !!(true|"0"|[]|{}|anything else...) --> true

// USE: === and !===
0 === "0" --> false // compares value & type (and runs faster)
0 !== "0" --> true	// faster because it doesn't convert to same type

// DO NOT USE: == and !=
0 == "0" --> true
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



//---------- Number ----------//
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


+  -  *  %  /
+= -= *= %= /=		///
x++  x--	// returns value before incrementing/decrementing
++x  --X	// returns value after  incrementing/decrementing


Infinity  -Infinity				// behaves mathematically like positive/negative infinity
isFinite(-Infinity); --> false

parseInt("text"); --> NaN 		// NaN if the first character cannot be converted to a number
NaN + - * / % anything --> NaN 	// any sequence of arithmatic operations involving NaN, result in NaN
isNaN(NaN); --> true
isFinite(NaN); --> false
NaN == NaN --> false 		// NaN does not equal anything
NaN > NaN --> false
NaN < NaN --> false
typeof(NaN) === 'number'


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

parseInt("011", 2); --> 3	// base 2 (binary)
parseInt("011", 10); --> 11	// base 10

//---------- Integers & Bitwise Operations ----------//
//  inside javascript: slow (converts Number to Integer, then back into Number = 64-bit Double/Float)
// outside javascript: bitwise operators are fast, primitive action directly supported by the processor (at the level of bits) used to manipulate values for comparisons and calculations



//---------- String ----------//
// sequences of Unicode characters
String(1.2) --> "1.2"

str.length;	// number of 16-characters

str1 = str1 + str2; 		// '+' and '+=' have better performance than str1.concat(str2, str3, ...);
str1 += str2;

'text' === "text" 	// no difference between single & double quotes
// double quotes = JSON standard for all key-value pairs, however JSON.parse() and JSON.stringify() take care of this

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


//---------- Statements ----------//
if, switch, while, do, for, break, continue, return, try/throw

var x = a || default; 	// return "default", if a === (false|0|""|NaN|null|undefined)
var x = a && a.fieldname; 	// return (false|0|""|NaN|null|undefined), instead of halting execution & throwing ReferenceError (undefined) or TypeError (null) or not halting and returning undefined (false|0|""|NaN)

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
	if (obj.hasOwnProperty(key)) { 	// use obj.hasOwnProperty(key) to avoid properties/keys inherited from parent
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



// break
outer_block:{
  inner_block:{
    break;		// only breaks out of inner_block 
    // skipped
  }
  // executed
}
// statements/loops/blocks can be labeled
outer_block:{
  inner_block:{
    break outer_block;	// breaks out of both inner_block and outer_block
    // skipped
  }
  // skipped
}
for () {
	if (true) {
		if (true) {
			break;	// breaks out of all ifs until it encounters first for/while/do loop
			// skipped
		}
		// skipped
	}
	// skipped
}
for () {
	if (true) {
		if (true) {
			continue;	// breaks out of all ifs until it encounters first for/while/do loop (but only for 1 iteration)
			// skipped
		}
		// skipped
	}
	// skipped once
}


//---------- Object ----------//
// objects are unordered key-value pairs
// optional quotes around key: vs. "key":
// values are any type (including other objects)... "every object is a little database"

var obj = new Object() 	--> {}
var obj = {}; 			--> {}	// faster

obj.key 	--> value
obj["key"] 	--> value 	// useful when a key is a reserved word or when accessing key prgrammatically/dynamically

//for (var key in obj) {value=obj[key];}	// don't use
for (var key in obj) {
	if (obj.hasOwnProperty(key)) { 	// use obj.hasOwnProperty(key) to avoid properties/keys inherited from parent
		value=obj[key];
	}
}

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

// Inheritance
// if get new.key fails, tries new.__proto__.key 
// (doesn't work the other way around) never sets: new.__proto__.key = value; instead of: new.key = value;
b.__proto__ = a 	a.key --> 0		b.key --> 0 // = b.__proto__.key
a.key = 1			a.key --> 1		b.key --> 1 // = b.__proto__.key
b.key = 2			a.key --> 1		b.key --> 2 // = b.key
delete b.key 		a.key --> 1		b.key --> 1 // = b.__proto__.key
b.__proto__ === a --> true	// === compares object references, but not values (no .equals method)

// get/set? depreciated?
var o = {
	a: 7, 
	get b() {return this.a + 1;}, 
	set c(x) {this.a = x / 2}
};
o.a --> 7
o.b --> 8
o.c = 50;
o.a --> 25


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
(function(){GLOBAL.window.foo = "bar";})();	// global scope (nodejs)
foo --> "bar"
window.foo --> "bar"

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




//---------- "use strict"; ----------//
// without "use strict";
var foo = "bar"; --> foo = "bar"	// local scope
foo = "bar";     --> foo = "bar"	// global scope: window.foo (browser), GLOBAL.window.foo (nodejs)
// with "use strict";
"use strict";
foo = "bar"; --> ReferenceError: foo is not defined

// http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
(function(){var foo = "bar";})();			// local scope
(function(){foo = "bar";})();				// global scope (window.foo = "bar")
(function(){"use strict";foo = "bar";})();	// ReferenceError: foo is not defined



//---------- function ----------//
// first-class objects (can be passed & returned)... inherits from Object
// scope = a function has access to variables of the function it's contained in ("Static Scoping" or "Lexical Scoping")
//		the parent function's variables/scope persists even after the parent function has returned ("closure")
//			it is NOT the value of the variable at the time the function was create (NOT a copy)
//			it has got a connection to parent's actual variable (still has access to the actual variable)
// arguments are not cast or type checked, nor number of arguments
// if a function is called with too many arguments, the extra arguments are simply ignored (no error)
// 								too few  arguemnts, the left over arguments = undefined
// functions are used as: functions, methods, constructors, classes, modules, blocks (scope)

--------------------------------------------------
---------- Functions (function Objects) ----------
--------------------------------------------------
// functions are first class objects
functionName instanceof Object
> true

// created before any other code is executed
function flyToTheMoon() {alert("Zoom! Zoom! Zoom!");}
flyToTheMoon();

// created at runtime (Anonymous Function)
var flyToTheMoon = function() {alert("Zoom! Zoom! Zoom!");}
flyToTheMoon();

// created at runtime; different external "variable name" (runRun) and internal "function name" (runTwice)
var runRun = function runTwice(firstRun) {
	// do stuff...
	if (firstRun)
		runTwice(!firstRun); // recursion uses internal "function name"
}
runRun(); // call function with external "variable name"

// if (anonymous function only accesses global variables || variables within its own scope)
// 	  function = anonymous function
// else if (anonymous function accesses (non-global) variables outside its scope)
//	  closure = anonymous function + COPY of outside variables/parameters

--------------------------------------------------------
---------------^ Integrate code above ^-----------------
--------------------------------------------------------

// Anonymous function
function() {}
var func = function() {};
function function_name(arg1, arg2, ...) { 	// if (arguments.length > 3), consider passing 1 object
	arg1, arg2, ... 
}

// .apply
function_name.apply(obj, [arg1, arg2, ...]) // obj.function_name(arg1, arg2, ...)

// return
return; --> undefined	// same as: return undefined; (most of the time)
return; --> this		// if constructor, returns new object (this)

// this
obj.func(); /* within func() */		this --> obj
func();		/* within func() */		this --> global object = window /* in browser */, GLOBAL.window /* nodejs */
	/* if you need access to parent obj */ var that = this; // in parent, then access func()'s parent using 'that' variable within func()
new func(); /* within func() */		this --> {} // because "new" applies Constructor Function to new object {}

// Arguments "array"
// array-like list of function's arguments (only available within function) to access function's arguments programmatically
function function_name(arg1, arg2, ...) {
	arguments --> [arg1, arg2, ...] 	
		arguments.__proto__ --> Object.prototype // NOT Array.prototype, NOT an array, DOES NOT have access to Array.function_name
		arguments.length 						 // arguments.length DOES NOT behave the same as Array.length
	// to use arguments.array_function_name
	Array.prototype.slice.apply(arguments, [2]); // arguments.slice(2)	
}

// Example: accept unspecificed number of arguments:
addNumbers(342,643,123,...)
function addNumbers() {
	var sum = 0;
    for (var i = 0, j = arguments.length; i < j; i++) {
        sum += arguments[i];
    }
    return sum;
}

// easily pass items in an array as arguments
addNumbers.apply(null, [342,643,123,...]); /* same as */ addNumbers(342,643,123,...);

//----- Closure -----//           http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html
// (anonymous) closure
( function () {...}() );
( function () {...}   )(); // same
// passing local variables through closure
(function(local_var){...})(local_var);  // globals can always be accessed
// used to store a value at time of call (like in the middle of a for loop), 
//     changing value of i     changing value of i       stored value of i (at time of call)
i = 1  a.func = function(){    a.func = function(){      a.func = function(c){          // outer function gets exectured immediately,
	      return i				  var c = i; return c;      return function() {return c}// a.func = inner function (who only has access to parent's local variables (and all global variables))
	   }					   }                         }(i)                           // c stores the value of i (since outer function already executed)
i = 2  a.func() --> 2          a.func() --> 2            a.func() --> 1
...    ...                     ...                       ...
i = 99 a.func() --> 99         a.func() --> 99           a.func() --> 1


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



//---------- Array ----------//
var a = [];
a[0];		// similar to: obj["0"]

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

.forEach(function(item, index, array) {array[index] = item+"";});
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

//---------- Errors/Exceptions ----------//
Error /* default */ | EvalError | RangeError | ReferenceError | SyntaxError | TypeError | URIError

// Error constructors
throw new Error("Reason error was thrown"); 		--> Uncaught Error: Reason error was thrown
throw new EvalError("Reason error was thrown"); 	--> Uncaught EvalError: Reason error was thrown
throw new RangeError("Reason error was thrown"); 	--> Uncaught RangeError: Reason error was thrown
...

// create your own Error 
throw { 	// this just creates an object with with 2 properties: name, message <-- (Error Object)
	name: ErrorName,
	message: "Reason error was thrown"		--> Uncaught ExceptionName: Reason error was thrown
};

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

//---------- eval ----------//
// compiles & executes a string parameter and returns the result
// browsers use eval to convert HTML (string) to actions
// dangerous, most misused feature of language
// RECOMMENDED: don't use it ever
eval("javascript code;");


//---------- Date ----------//
var date = new Date(); // same as: Date.now();
var date = new Date(819188640000); // represented as milliseconds since "1970-01-01 0:00"
var date = new Date('December 17, 1995 03:24:00');
var date = new Date('1995-12-17T03:24:00');
var date = new Date(1995, 11, 17, 3, 24, 0);

// getters
date.getFullYear()	// 1970-2XXX
date.getMonth()     // 0-11 (starts at 0!)
date.getDate()      // 1-31
date.getHours()		// 0-23
date.getMinutes() 	// 0-59
date.getSeconds()	// 0-59

// setters
date.getFullYear(2015)	// 1970-2XXX
date.getMonth(0)		// 0-11 (starts at 0!)
date.getDate(1)			// 1-31
date.getHours(0)		// 0-23
date.getMinutes(0)		// 0-59
date.getSeconds(0)		// 0-59

// format using date/time library, like:
var strftime = require('strftime');
strftime('%B %d, %Y %H:%M:%S');
strftime('%F %T', date);

//---------- Regular Expression (RegExp) ----------//
/[a-z]*/

//---------- HTML DOM ----------//
<div id="html"></div>
var html = document.getElementById('id'); 	// $('#id');

html.style.anyCSS

html.offsetLeft
html.offsetTop
html.offsetHeight 
html.offsetWidth 
html.offsetParent

html.contentEditable
html.isContentEditable

html.parentNode === html.parentElement 
	// except:
	document.<html>.parentElement; --> null  // "document" is NOT an HTML element
	document.<html>.parentNode; --> document // "document" is a "node"
html.children;		// excludes whitespace html "nodes"
//html.childNodes;	// includes whitespace html "nodes"
html.firstElementChild; //excludes whitespace html "nodes"
//html.firstChild;	// includes whitespace html "nodes"

html.appendChild(html);
html.removeChild(html);

html.className = 'class';

         /* HTML */									/* jQuery */
document.getElementById('id');				=== 	$('#id');		// <div id="id">
//  html.getElementById('id');
document.getElementsByClassName('class');	=== 	$('.class');	// <div class="class">
//  html.getElementsByClassName('class');
document.getElementsByName('name');			=== 	$('[name="elementName"]');	// <input name="elementName">
//  html.getElementsByName('name');
document.getElementsByTagName('div');		=== 	$('div');		// <div>
//  html.getElementsByTagName('div');
document.createElement('div')				===		$('<div></div>')

//---------- HTML Events ----------//
html.onkeypress = 	function(event) {};
// html.addEventListener("click", function() {}, false);	// everywhere except IE
//		"keypress", "click", "mousemove", "focus", ...
// html.attachEvent("onclick", function() {});				// IE only
//		"onkeypress", "onclick", "onmousemove", ...
					function (ev) {
						ev = ev || event; // Moz || IE 
						var target = ev.target || ev.srcElement; // Moz || IE
						...
						// to prevent/suppress browser action associated-with/following event (i.e. - submitting form, following link, etc.)
							ev.returnValue = false;
							if (ev.preventDefault) {
								ev.preventDefault();
							}
							return false;
					}


// Event (all events)
	(ev.target /* all */ || ev.srcElement /* IE6-8 */) --> html element
	ev.type --> "eventname" 

// KeyboardEvent
html.onkeypress
html.onkeydown
html.onkeyup
	var code = e.keyCode || e.which; // recommended online
	ev.key --> "ArrowUp", "Enter", "Escape", ... (string) // Moz
	ev.charCode --> 91, 89, ... (integer) // Chrome, IE
	ev.code, ev.keyCode // depreciated?
	ev.altKey, ev.ctrlKey, ev.metaKey, ev.shiftKey
	ev.isComposing
	ev.location


// MouseEvent
html.onclick
html.click() 		// fires .click() event (as if user clicked html element)
html.onmousedown 	// click or click-and-drag press/hold
html.onmouseup 		// click or click-and-drag release
html.ondblclick 	// double-click
html.oncontextmenu  // right-click
html.onmousemove
html.onmouseover
html.onmouseout
	ev.clientX, ev.clientY  // IE (and Moz?)
	ev.pageX, ev.pageY 		// Moz-only?
	ev.screenX, ev.screenY
	ev.target 			// all (except IE)
	ev.movementX, ev.movementY
	ev.altKey, ev.ctrlKey, ev.metaKey, ev.shiftKey
	ev.button, ev.buttons
	ev.relatedTarget // if (mouseover) target = html entered, relatedTarget = html left; if (mouseout) target = html left, relatedTarget = html entered;
	ev.region // "hit" region (canvas-only?)

// MouseScrollEvent
html.onscroll
	

// FocusEvent
html.onfocus 	// gains focus = "blue halo" from tabbing-into or clicking-onto html element (often form elements: <input>, <select>, <textarea>)
html.onblur 	// loses focus
html.focus()
html.blur()		// .unfocus()
	

html.oninput	// fired when <input>'s value changes
html.onchange 	// fired when <input>, <select>, or <textarea>'s value changes

html.oncopy
html.oncut
html.onpaste

form.onsubmit	// form is submitted


window.onselect
window.onclose
//window.onerror 	// Note: Not useful. Many errors do not trigger window.onerror
window.onload 			 			// fires after HTML + content (images, etc.) load (after $(document).ready)
	$(window).load(function() {}); 		// (same, but jQuery)
	$(document).ready(function() {});	// BETTER: fires sooner: fires after HTML (document) loads without wwaiting for content (images, etc.) 


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

//---------- window / iframe ----------//
// window
//		every window, frame, & iframe has its own unique window object
//		also known as: self, parent, top
// inter-frame communication
//		frames['frameNameAttr'] = child frames & iframes


-----------------------------------------------
-------------------- html5 --------------------
-----------------------------------------------

--------------- localStorage ---------------
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

--------------- sessionStorage ---------------
// same as localStorage, but mapped to session

