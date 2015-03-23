sudo apt-get install -y nodejs

// node.js file (first 4 lines)
1 #!/usr/bin/env node
2 
3 var tylor = require('awesome');		// $ npm install awesome
4 var taylor = require('./girlfriend');	// loads ./girlfriend.(js|json|node) in that order (.node = compiled)
5 // javascript code here...


// executing server-side javascript (SSJS) (i.e. - node.js)
node market-research.js

chmod 777 market-research.js	// need to be able to execute the file
./market-research.js

node
> var mr = require('./market-research.js');
> mr.marketResearch();
> .exit

node -e "var mr = require('./market-research.js'); mr.marketResearch();"

---------- console.log ----------
console.log('msg');

---------- Objects ----------
// var rufus = new Object();
var rufus = {
	name: "rufus";
};
rufus.species = "cat";
rufus["hello"] = "miaow";
rufus.hello;
> "miaow"

// Object methods are properties that contain functions (function Objects)
rufus.hello = function() {alert("hiss");};
rufus.hello();
> [The page at url.com says: miaow]

// Object constructor (same as new Object except "this")
function Pet(name, species, hello) 
{	this.name = name;
	this.species = species;
	this.hello = hello;
	this.alertHello = function() {alert(this.hello);}
}
var rufus = new Pet("Rufus", "cat", "miaow");
rufus.alertHello();

// javascript idiom for setting default values
var school = schoolName || "mit"; // default = "mit" (if schoolName not set)

---------- Functions (function Objects) ----------
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



html5boilerplate.com