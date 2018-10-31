// Angular = HTML for web apps
// offers:
// 		modularity = module (.js files) + view/templating (.html files)
//		separate model & view
// 		data binding = binds model & view together
// 		controller = function to put all your javascript code into; helps control scope; prevents polluting global namespace
// 		directives = create new html tags & attributes
// 		modules + templates = modularity = modular code
// 		routing = makes single-page-app look like multi-page (for back/forward, bookmarking, history, ...) url.com/#/only/part/after/hash/changes
// 		filters (pipes)
// includes:
// 		jqLite 		 = jQuery-like 					(DOM manipulation)
// 		$q (service) = Q-like 						(promises)
// 		dependencies = require/AMD-like 			(declare dependencies; AMD = Asynchronous Module Definitions)
// 		templates 	 ~ handlebars/mustache-like 	(templating)
// other useful stuff:
// 		underscore/lo-dash
// 		backbone = predecessor to angular
// 		BDD = behavior-driven development
// 		TDD = test-driven development
// Tutorials:
//		50 Examples - github.com/curran/screencasts/tree/gh-pages/introToAngular




//------------------- module -------------------//
// module --> modularity 
// Recommendation:
// 		1 application-level module: (1) imports other modules (2) initializes
// 		a module for each directive, filter, ... (or other reuseable component)
//		a module for each web page feature       (again, so it can be reused)


/* file.html */																	
<html ng-app="miscApp">//--------------.
	<script src="app.js"><script>   |
//                 |                   |
// app.js <--------'                   |
	(function() {// closure            |
		'use strict';//				   |
		// SET 'miscApp' <-------------'
		angular.module('miscApp', [ 'ngRoute', ..., 'myModule', ... ]) // only set once

		//---------- run sequence ----------//
		// 1. app.config(...)
		// 2. app.run(...)
		// 3. directive's code before 'return {...};'
		// 4. directive's compile     'return { compile: function(...){...} }'
		// 5. app.controller(...)
		// 6. directive's link        'return { link:    function(...){...} }' || 'return { compile: function(...){return link;} }'
		
		angular
			.module('miscApp') // GET 'miscApp'
			.config(miscConfig)
		function miscConfig($___Provider, ...) {
			// configure: $routeProvider, ...
		}

		angular
			.module('miscApp') // GET 'miscApp'
			.constant('CONSTANT', value); // var CONSTANT = value;

		angular
			.module('miscApp') // GET 'miscApp'
			.run(miscRun)
		function miscRun($___, ...) {
			// use: constants & provider instances ($log, factories, services, )
		}

		angular
			.module('miscApp') // GET 'miscApp'
			.controller('MiscCtrl', MiscCtrl)
		function MiscCtrl($scope, ...) {

		}

		angular
			.module('miscApp') // GET 'miscApp'
			.controller('MiscCtrl', MiscCtrl)
		function MiscCtrl($scope, ...) {

		}
	})();/* closure */
		




			
			
			
			.directive(...)
			.filter(...)
			...;
// end: app.js

// another-file.js
(function() {/* closure */  // one closure per file
	'use strict';
	// GET 'miscApp'
	var app = angular.module('miscApp');
	app.controller... // get 'miscApp' (without [ ... ])
	app.directive...
	app.filter...
	...
})();/* closure */
// end: another-file.js

//--- Module Dependency Injection (.js files) ---//
(function() {/* closure */
	'use strict';
	angular.module('miscApp', [ ...
		// Angular modules 					// corresponding .js files
		'ngRoute',							<script src="angular-route.js"   ><script>
		'ngAnimate',						<script src="angular-animate.js" ><script>
		'ngCookies',						<script src="angular-cookies.js" ><script>
		'ngMessages',						<script src="angular-messages.js"><script>
		'ngMock',							<script src="angular-mocks.js"   ><script>
		'ngResource',						<script src="angular-resource.js"><script>
		'ngSanitize',						<script src="angular-sanitize.js"><script>
		'ngTouch',							<script src="angular-touch.js"   ><script>
		..., 
		// custom modules
		'app',								<script src="app.js">       --> angular.module('app',      [...])
		'miscApp',							<script src="misc-app.js">  --> angular.module('miscApp',  [...])
		'myModule',							<script src="my-module.js"> --> angular.module('myModule', [...])
		...
	]);
	/* OR */
	
})();/* closure */

//------------------------------ ngRoute (Module) Dependency ------------------------------//
(1) use ng-view			<div ng-view><div> // where ever you want to insert /<route|folder>/index.html
(2) add <script>			<script src="angular-route.js"><script> // at bottom of <body> (but after jquery)
						<script src="/js/vendor/angular-route.js"><script> 
						<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.16/angular-route.min.js"><script>
(3) add 'ngRoute' /* (Module) Dependency */ 	var miscApp = angular.module('miscApp', ['ngRoute'/*, $dep2, ... */]); // to main app
(4) configure routes 						miscApp.config(function($routeProvider) {/* ... */});
/* if another .js file */ angular.module('miscApp').config(function($routeProvider) {/* ... */});

miscApp.config(function($routeProvider) {
	// $routeProvider allows us to specify our routes
	$routeProvider.when(path,options) // path = part of url after #
	$routeProvider.otherwise(options) // "else"
	$routeProvider
		.when('/',      {redirectTo: '/notes'}) 							// redirectTo: path
		.when('/notes', {templateUrl: '/templates/pages/notes/index.html'}) // templateUrl: route
		.when('/users', {...})
		.when('/users/:id', {
			
			/* A */ templateUrl: '/path/to/file.html',
			/* B */ template: '<div>...</div>',

			controller:  'MiscCtrl' /* OR */ function($routeParams, ...) {}, 
			controllerAs:'misc'		// name for controller in route's template html
			

			resolve: { // list of promises (things that need to happen) before controller instantiates & template loads
				promise1: function() { return Promise.resolve(); }, // without dependency injection
				promise2: ['$q', ..., function($q, ...) { 			// with    dependency injection
					var defer = $q.defer(); // waits 2 seconds before loading page (controller, template, ...)
					$timeout(function() {defer.resolve();}, 2000); 
					return defer.promise; 
				}], 						// with? without? dependency injection
				promise3: miscCtrl.myFunc 	// somewhere: var miscCtrl = miscApp.controller('miscCtrl')
				promise4: ...,
				...
				// note: promises executed simultaneously
				// $route.locals.promise1 --> whatever inside promise1's resolve(...)
			},

			// routeParams.id --> 928			url.com/users/:id
			// path           --> '/users/928'	url.com/users/928?q=name
			// search.q       --> 'name'		url.com/users/928?q=name
			redirectTo: '/' /* OR */ function(routeParams, path, search) { return '/'; }
		})
		.otherwise({redirectTo: '/'});

});


//------------------------------ Custom (Module) Dependencies ------------------------------//
<script src="my-module.js"><script>
// my-module.js
(function() {/* closure */
	angular.module('myModule',[ ... ])
		.controller(...)
		...;
})();/* closure */

//-------------------- view ---------------------//
// view = <html> + directives + {{curly braces}} + expressions + filters + form control (validation) --> templating, data-binding
<div>{{myVar}}<div>   /* same as: */   <div>{{$scope.myVar}}<div>

// route + view --> modularity (separate .html files)
<div ng-view><div> // inserts "partial" .html file (based on routing)

//----- Angular Expressions -----//
// javascript-like expressions
// there are a lot of things you shouldn't do inside of {{...}}
// keep logic inside {{...}} to a minimum
// can only access objects added to controller: this.myVar (cannot access: myObj)
{{expression}}				// two-way binding 			// can be anything in the model or parent scope
{{::expression}}			// "one-time binding" = evaluated once = first non-undefined/non-null value
<div class="{{expression}}">	// two-way data binding
<div ng-class="expression">		// two-way data binding
<div ng-repeat="expression in expressions"> // two-way binding


//-------------------- model --------------------//
// $scope = object that you store all your data, objects, (function objects) in

// $scope vs. "controller as" (choose one and stick with it)
<div ng-app> 									/* ng-app        */ --> $scope === $rootScope  // ng-app allows multiple, concurrent apps to run on the same page (totally independent scopes)
	<div ng-model="myVar"><div>				/* ng-model      */ --> $scope.myVar
	<div ng-controller="MiscCtrl as misc">	/* ng-controller */ --> misc
		<div ng-model="misc.myVar"><div>	/* ng-model      */ --> misc.myVar
	<div>
<div>


//----------------- controller ------------------//
// controller = function that you put all your javascript code in
// 			  = (constructor) function used to augment $scope
// avoid: manipulating DOM 			instead: manipulate model --> view)
// avoid: formatting user input 	instead: use angular form controls
// avoid: sorting/filtering 		instead: use angular filters
// avoid: controller doing too much instead: use angular services to share code/states between controllers
// can have multiple instances of the same controller running simultaneously (unlike services = singletons)

// file.html
<div ng-controller="MiscCtrl as misc">
	// can only access 'misc' from within this <div>
<div>

// file.js
angular.module('miscApp').controller('MiscCtrl', [
	'$scope', ..., 'myService', ..., 				 // dependency injection
	function MiscCtrl($scope, ..., myService, ...) { // named function MiscCtrl(...) helps with debugging later

		// "this" refers to: $scope.____ = new MiscCtrl();
		// it's nice to name it the same as on frontend...
		var misc  = this;      // <div ng-controller="MiscCtrl as misc"> 
		//var miscCtrl = this; // <div ng-controller="MiscCtrl as miscCtrl"> 
		//var ctrlr    = this;
		//var ctrl     = this;
		//var self     = this;
		//var that     = this;
		//var vm       = this; // vm = "View Model"

		// public controller variables
		misc.myVar  = 1;                /* same as */ $scope.misc.myVar = 1; // assuming: <div ng-controller="MiscCtrl as misc"> 
		misc.myFunc = function() {...}; /* same as */ $scope.misc.myFunc = function() {...};

		// private controller variables
		var myVar = 1;
		function myFunc() {...};
	}
])


//---------- Angular Directives ----------//
// teaches HTML new <tags> and <tag attributes>
// directives can be used for:
//		expressing complex ui 	  (see: Custom Directives)
//		reusing common components (see: Custom Directives, or Include File)
//		calling events and registering event handlers (???)
ng-show			<span ng-show="misc.isValid">/* if (misc.isValid)  {display this span} */<span> // Note: undefined --> false
ng-hide			<span ng-hide="misc.isValid">/* if (!misc.isValid) {display this span} */<span>
ng-src			<img ng-src="{{misc.image.thumb}}" /> 			// misc.image.thumb = '/images/image001-thumb.jpg'
ng-click		<a href ng-click="newVar = value">{{newVar}}<a> 	// onclick event
	$event // ng-click="ev = $event"    {{ev.pageX}}
ng-init			<div ng-init="myVal = defaultValue"><div>			// used to set initial values (initialization & configuration should go inside controller)
ng-class		<div ng-class="className:myVal === 1"><div>		// if (myVal === 1) {add class "className" to div} 
ng-submit		<form name="formName" ng-submit="misc.myFunc()">
ng-href 		<a ng-href="#/users/{{user.id}}"><a>
ng-if 			<div ng-if="misc.error">{{misc.error}}<div>
ng-repeat		<div ng-repeat="item in [...]|{...}">{{item}}<div> // $index = item's index
ng-repeat		<div ng-repeat="(index, item) in [...]">{{index}}:{{item }},<div>
ng-repeat		<div ng-repeat="(key,  value) in {...}">{{ key }}:{{value}},<div>
ng-repeat-start	<div ng-repeat-start="item in data">{{item}}<div> // Note: </div>
					{{item}} // anything in here gets repeated per item
ng-repeat-end	<div ng-repeat-end>{{item}}<div> // Note: </div> && sibling of ng-repeat-start

//---------- Include File ----------//
ng-include		<div ng-include="filenameStr"> 	// insert (append?) html into <div>...</div>
				<div ng-include="'file.html'"> 	// Note: double + single quotes (filenameStr = 'file.html')

//---------- Custom Directives ----------//           https://docs.angularjs.org/api/ng/service/$compile
// 'camelCase' --> <dashed-words></dashed-words>
			  'myElement' --> <my-element my-attr="..."><my-element>
app.directive('myElement', function() {
	// any code here (before 'return') runs at compile time
	return {
		//name: '',
		//priority: 1,
		//terminal: true,

		restrict: ('EA')|'C'|'M'|'EACM'|..., // default: 'EA' (element or attribute)
			'E' /* element   */	<my-element>					'C' /* class   */  <tag class="my-class: expression;">
			'A' /* attribute */	<div my-attr="expression">		'M' // comment //  <!-- directive: my-comment expression -->	
		
		scope: falsy,// no scope = (defailt) directive has no scope; (controller/parent's) $scope === scope (directive's link: function) 
		scope: true, // child scope = inherits (prototypically) from parent (like javascript inheritance) = uses parent's unless/until it has its own
		scope: {},   // isolate scope = each directive has its own individual scope, independent from its parent and other directives
		scope: {	 // isolate scope, and ...
			myAttr: --> <my-element my-attr="..."><my-element> /* in linkFn: */ scope.myAttr /* in controller */ $scope.myAttr
			attr1: '=', // two-way binding [Object]
						<my-element attr1="myVar">			scope.attr1 === myVar  // scope.attr1 is the same as myVar
						// one-way binding [Object] (one-time two-way binding)
						<my-element attr1="::myVar">		scope.attr1 = myVar;   // sets scope.attr1 = myVar's first truthy value
						// one-way binding [Function] 
						<my-element attr1="::myFunc">		scope.attr1 = myFunc;  // use if function definition never changes
						// two-way binding [Function]
						<my-element attr1="myFunc">			scope.attr1 === myFunc // use if function definition changes

			attr2: '@', // one-way binding [String]: when myId changes, scope.attr2 updates (not the other way around)
						/* 						same as: */ scope.attr2 = attrs.attr2.toString()
						// parent scope						// inside link: function() {}
						<my-element attr2="string">      	scope.attr2 --> 'string'
						<my-element attr2="{{myId}}">    	scope.attr2 = myId.toString()    --> '20931208'
						<my-element attr2="{{getId()}}"> 	scope.attr2 = getId().toString() --> '20931208'
			
			attr3: '&', // weird binding [Function]: when getId() changes or the result of getId() changes
						// Note:           [Function] --> [weird Function] --> [Function]
						<my-element  attr3="getId()">       scope.attr3    ~=    getId    --> function getId() {...} // actually: function (a){return h(c,a)}
															scope.attr3()  ~=    getId()  --> 8
						<my-element  attr3="setId(id)">     scope.attr3    ~=    setId    --> function setId() {...} // actually: function (a){return h(c,a)}
														<-- scope.attr3({id:9})  setId(9) // Note: {id:9} vs. 'id'
						// Note:            [Object]  --> [weird Function] --> [Object]
						<my-element    attr3="myId">        scope.attr3()  -->   myId   --> 9
						<my-element    attr3="myObj">       scope.attr3()  -->   myObj  --> {...}
		},
		
		/* A */ templateUrl: 'filename.html' /* OR */ function(templateElement, templateAttrs), 
		/* B */ template:   '<div>...<div>' /* OR */ function(templateElement, templateAttrs), 
		templateNamespace: ('html')|'svg'|'math', // use 'svg'|'math' if template root node(s) are <svg>|<math> (excluding <math>|<svg>)
		transclude: (false)|true, // false = "component" (default) = ignores any html inside directive
								  // true  = "container" =  copy/pastes html inside directive into <div ng-tranclude> in template
								  //         (takes directive's inner html and appends to element in template containing ng-tranclude attribute)
		/* DEPRECATED */ replace: (false)|true, // (default) false = places template inside <my-directive>...</my-directive>
												// true = reaplces <my-directive></my-directive> with template

		// $scope   = controller's scope
		// $element = <my-directive>
		// $attrs   = <my-directive custom="a">   attrs.custom --> 'a'
		// $transclude = function([scope], cloneLinkingFn, futureParentElement) {...}
		/*  A  */ controller: 'MiscCtrl', 
		/*  B  */ controller: [/*'$scope',*/ function(/* $scope */) {...}] /* ?which? */ function($scope, $element, $attrs, $transclude, otherInjectables) {...}, 
		/*  C  */ require: 'directiveName', // access controller via link function // link: function(..., controller)
		/*  D  */ require: [ 'sameElementDir', '^elementOrParentsDir', '^^parentsDir', ...], // link: function(..., controllers = [Array] of controllers, in order provided when require:'ed
		/*  D  */ require: ['?sameElementDir','?^elementOrParentsDir','?^^parentsDir', ...], // '?' = optional = if controller not found, returns 'null' (instead of default: throw error)
		controllerAs: 'misc', // name for controller in directive's template html
		bindToController: (false)|true, // (default) false
										// if (bindToController = true && controllerAs && scope = isolate)
										//		directive's scope = controller's $scope?


		// (compile) element = <my-directive>  (safe to modify element & children, not parent?)
		// (link)    element = <my-directive>  (only in postLink is it safe to modify element & children)
		// attrs      = <my-directive custom="a">   attrs.custom --> 'a' // always a [String] because it retrieves contents of html
		// scope      = directive's scope
		// controller = directive's own controller, or another 'required' directive's controller (or controllers, if [Array])
		// (compile) transclude = [DEPRECIATED] function(scope, cloneLinkingFn) {...}
		// (link)  transcludeFn = (same as controller's $transclude)
		/* A */ compile: function compile(element, attrs, transclude) {
					var link = /* B */||/* C */;
					return link;
				},
		/* B */ link: function postLink(scope, element, attrs, controller[s], transcludeFn) { ... }
		/* C */ link: {
					pre:  function preLink(...) { ... },
					post: function postLink(...) { ... }
				}
		// manipulating DOM, put in link function(s)

	};
}); 
// <my-element my-attr="misc.myFunc()">
// directive shorthand (often used with attribute/class/comment directives)
app.directive('myAttr', function() {
	return function(...) {     /* same as: */	return {
		...											link: function(...) {...}
	};											};
});

// <my-element my-attr="misc.myFunc()">
app.directive('myAttr', function() {
	return {
		...,
		scope: {
			myAttr: '&',
		}
		...,
	};
});

// directives compile sequence:
// 		compile (parent)							// all compiles parent-to-child, top-to-bottom
// 			compile (child 1)
// 				compile (grandchild 1a)
// 			compile (child 2)
// 				compile (grandchild 2a)
// 				compile (grandchild 2b)
// 		(parent) controller/preLink 				// comtroller, preLink, <enter children>, <exit children>, postLink
// 			(child 1) controller/preLink 
// 				(grandchild 1a) controller/preLink 
// 				(grandchild 1a) postLink
// 			(child 1) postLink 
// 			(child 2) controller/preLink 
// 				(grandchild 2a) controller/preLink 
// 				(grandchild 2a) postLink
// 				(grandchild 2b) controller/preLink
// 				(grandchild 2b) postLink
// 			(child 2) postLink 
// 		(parent) postLink 



//----- Controller Dependency Injection -----//

//---------- $scope ----------//
// inherits (prototypically) from parent (like javascript inheritance): 
//		ng-controller, ng-view, ng-repeat, ng-include, ng-switch, or
//		custom directive with {scope: true || transclude: true}
// "isolate" scope; scope = {}; scope does not inherit from parent 
//		custom directive with {scope: {...} || falsy}
$scope.myVar  = 1;  			  // use misc.myVar  instead
$scope.myFunc = function() {...}; // use misc.myFunc instead

// $scope.$watch   // "watches" for 'onchange' event
$scope.$watch('myObj',    function(myObj, oldObj) {...}); // watches: $scope.myObj    // not deep
$scope.$watch('myObj.id', function(   id, oldId ) {...}); // watches: $scope.myObj.id // need a new watch for each property you want to watch, since .$watch doesn't check deeply

// if you change anything outside of the "context of Angular" (d3.js, jQuery, DOM events):
	/*  error  */ $scope.myVar='val'; $scope.$apply();     /* if executed during a $digest cycle: */ "Error: $rootScope:inprog (Action Already In Progress) [$digest already in progress]"
	/* fastest */ $scope.myVar='val'; $scope.$evalAsync(); // appends to end of $digest cycle
	/* popular */ $timeout(function(){$scope.myVar='val'}) // adds to next $digest cycle
	/* "no no" */ $scope.myVar= 'val'; if(!$scope.$$phase) // if digest is NOT already in progress
									   {$scope.$apply();}  // $apply() (else: it doesn't apply!!!)
	/*  also   */ $scope.$apply(function(){$scope.myVar='val'});

// $scope.$digest() = alternative to $scope.$apply()?

// $scope.$parent ($parentScope doens't exist)
$scope.$parent.<controllerAs>.myVar
$scope.$parent.<controllerAs>.myFunc								// in html template
/* within controller */ 											<div ng-controller="ParentCtrl as par">
app.controller('ChildCtrl', function ChildCtrl($scope) {				<div ng-controller="ChildCtrl as chi">
	$scope.$parent.par.myVar 												{{par.myVar}}
});																		<div>
																	<div>
// get scope in javascript console
angular.element($0).scope() 

//-------- $rootScope --------//
// the top-level (application-level) $scope
// $scope inherits/descends from $rootScope (directly, if it has no parent $scope)

// (placed in root controller)
$rootScope.$on('$routeChangeError'  , function(event, current, previous, rejection) {...}); // rejection --> msg, from: defer.reject(msg); fired when a $routeProvider's resolve: promise1 is defer.reject()'ed
$rootScope.$on('$routeChangeStart'  , function(event, current, previous) {...}); // the path has already changed
$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {...});


//---------- $log ----------//
// commas: (con,cat,en,ate)
$log.log('msg',obj,...);//     black  text
$log.warn('msg',obj);	// /!\ yellow background
$log.info('msg',obj);	// (i) black  text
$log.error('msg',err); 	// (x) red    background
$log.debug('msg',obj);	//     blue   text

// in app.config(...)
$logProvider.debugEnabled( (true)|false ); // true  = by default, $log.debug('message') outputs to console
										   // false = suppresses: $log.debug('message')

//---------- $http ----------//
$http(options) 	// fetch json 
	$http({
		method:'GET', // 'GET'|'POST'|'OPTIONS'|'PATCH'|'TRACE'
		url:'/products.json',
		//data: {}   // (optional)
	});
$http.get('/products.json', {apiKey: 'myApiKey'})
	.success(function(data) { ctrlr.myVar = data; })
	.error(function() {...});
$http.post('/path/to/resource.json', { param1:'val1', ... });
$http.put()
$http.delete('/path/to/resource.json');

//------- $routeParams -------//
$routeParams.country --> 'USA' 		// url: url.com/#/map/:country/:state/:city
$routeParams.state   --> 'MA'		// path: 		 /map/USA/MA/Boston
$routeParams.city    --> 'Boston'

//-------- $location --------//
$location.path('/new/path');

// $q
var nextStep = function (options) {...}
var defer = $q.defer();
defer.promise
	 .then(nextStep)
var opts = {a:1,b:2}
defer.resolve(opts); /* calls nextStep */ /* OR */ defer.reject(err);


function wait2() { // waits 2 seconds before loading page (controller, template, ...)
	var defer = $q.defer(); 
	$timeout(function() {defer.resolve(opts);}, 2000); 
	return defer.promise; 
}
wait2.then(nextStep)

//-------- $timeout --------//
$timeout(function() {...}, milliseconds)

//-------- $provide --------//
// Provider = anything that can be injected into a controller, directive, factory, service, filter, ...
$provide.provider('testProvider', ['testService', function(testService) {
	return {
		$get: function() {
			return testService||{...};
		}
	}
});
// same as:
$provide.provider('testFactory', ['testService', function(testService) {
	return testService||{...};
});
$provide.service(...) /* same as: */ app.service(...)
$provide.factory(...) /* same as: */ app.factory(...)


//-------- $filter --------//









//--------------- factory vs. service ---------------//
// factory OR service is a chunk of javascript, which can be injected into any Angular component: controller, directive, factory, service, filter, ...
//		injecting a factory|service includes its javascript into the Angular component (like html/php include, but for .js)
// a factory returns an object with optional: public/private variables/functions, getter/setter methods, ... (the object could be a function)
//		this object is a singleton = a factory returns the same object to every Angular component that depends on it
//		AngularJS only ever generates one instance of the singleton object
//		the object is only instantiated if it's depended on (if an Angular component depends on it)
// a service is a Constructor Function
//		var service = new Service()
// don't (can't?) use $scope inside of a factory|service|provider

// 'helloService' (or any service) can be instantiated multiple times
// 'helloFactory' returns the same instance of 'helloService' to every Angular component that depends on it
app.service('helloService', [ ..., function(...) { 
	// 'helloService' returns a new HelloService() each time it's injected
	var helloService = this;
	helloService.myVar  = 1;							  /* OR */ this.myVar  = 1;
	helloService.myFunc = function() { return "hello"; }; /* OR */ this.myFunc = function() { return "hello"; };
}]);
app.factory('helloFactory', ['helloService', function(helloService){ // var helloService = new HelloService(); 
    // 'helloFactory' returns the same helloService each time it's injected
    return helloService;
}]);

// usually, we just use factories...
app.factory('helloFactory', [ ..., function(...) {
    return {
        myVar: 1,
        myFunc: function() {
            return "hello";
        }
    }
}]);

// Example: a factory that returns an object
miscApp.factory('factory_obj', function() {
	return { key: 'value' };
});
// Example: a factory that returns a function (which is an object)
miscApp.factory('factory_func', ['$http', function($http) {
	return function(callback) {
		$http.get('data.json').success(callback);
	};
}]);

// using factories & services
miscApp.controller('MiscCtrl', ['factory_obj', 'factory_func', 'service_obj', function(factory_obj, factory_func, service_obj) {
	factory_obj --> // instance shared across all Angular components
	service_obj --> // new instance
	factory_func(callback); var callback = function(data) { $scope.data = data; }
}])

// a factory is a specific type of provider
// can use app.provider(...) instead of app.factory(...)
// see: $provider


//---------- Filters ----------//
// add filters to any angular expression
// (input) --pipe--> (filtered output)
{{ $scope.population | number }}	// 98109000 [Number] --> 98,109,000 [String]
{{ $scope.price | currency }} 		// 1420.892 [Number] --> $1,420.89  [String]
{{ $scope.date | date:'MM/dd/yy' }}	// [Date] --> [String] formatted to date
{{ '1388123412321' | date:'MM/dd/yyyy @ h:mma'}} 	
{{ obj | json }}					// [Object] --> [String] 		// {name:'Tylor'} [Object] --> "{name:'Tylor'}" [String]
{{ 'string' | uppercase }} --> 'STRING'
{{ 'STRING' | lowercase }} --> 'string'
{{ 'string' | limitTo:3 }} --> 'str' 				// first 3 characters in 'string'
<li ng-repeat="item in misc.myArray | limitTo: 3">	// first 3 items in myArray
<li ng-repeat="item in misc.myArray | limitTo:-3">	// last  3 items in myArray
<li ng-repeat="item in misc.myArray | orderBy:'myVar'  ">// sort by myArray.myVar (ascending order)
<li ng-repeat="item in misc.myArray | orderBy:'-myVar' ">// sort by myArray.myVar (decending order)
// 'myVar' --> item.myVar   ||   myVar (w/o quotes) --> $scope.myVar
<li ng-repeat="item in misc.myArray | filter:query ">// omni-search for $scope.query [String] in item.anything
// if query       = 'tylor', returns any item        = ...+'tylor'+... OR item.anyVar = ...+'tylor'+...
// if query.myVar = 'tylor', returns any item.myVar  = ...+'tylor'+...
// if query.$     = 'tylor', returns any item.anyVar = ...+'tylor'+...

//---------- Custom Filter ----------//
miscApp.filter('myFilter', function() {
	return function(input, optional1, optional2) {
		var output;
		// do filter work here
		return output;
	}

});
miscApp.filter('encodeURI', function() {		<a href="#/{{link | encodeURI}}">{{link}}<a>		
return window.encodeURI;
});


//---------- 2-way Binding ----------//
// bind to model
<html ng-app>
	// ...
		<input type='text' ng-model="myVar"/> 			/* 2-way binding: */   $scope.myVar // === $('input').val();
	// ...
<html>

// bind to controller
<div ng-controller="MiscCtrl as misc"> 	/* appends to div: */ app.controller('MiscCtrl', function() {...});
	<select                ng-model="misc.myVar"/> 	/* 2-way binding: */ misc.myVar // === $('select').val();
	<input type='text' 	   ng-model="misc.myVar"/> 	/* 2-way binding: */ misc.myVar // === $('input').val();
	<input type='radio'    ng-model="misc.myVar"/> 	/* 2-way binding: */ misc.myVar // === $('input').val();
	<input type='checkbox' ng-model="misc.myVar"/> 	/* 2-way binding: */ misc.myVar // === $('input').val();
	<textarea><textarea>
<div>



//---------- run sequence ----------//
// 1. app.config(...)
// 2. app.run(...)
// 3. directive's code before 'return {...};'
// 4. directive's compile     'return { compile: function(...){...} }'
// 5. app.controller(...)
// 6. directive's link        'return { link:    function(...){...} }' || 'return { compile: function(...){return link;} }'

//---------- app.run() ----------//
app.run(
	[       '$rootScope','$log', 
	function($rootScope,  $log) {
		$rootScope.$log = $log; // makes $log available as: $log (anywhere in html), $scope.$log, $rootScope.$log
	}]
);


//---------- form validation ----------//
<form name="reviewForm"	// angular auto-creates "reviewForm" javascript object
	  ...
	  ng-submit="reviewCtrl.submit()"
	  novalidate> 		// novalidate = turns off browser's default form validation
	// required
	<select   ... required>
	<input    ... required>
	<textarea ... required>
	...
	<input type="email" ...>	// built-in email validation
	<input type="url" ...>		// built-in url validation
	<input type="number" min="1" max="9" ...>	// built-in number validation
	<div>reviewForm is {{reviewForm.$valid}}.<div>	// .$valid = built-in angular property of auto-created form object
<form>

//---------- element ---------//
//---------- jqLite ----------//
var el = angular.element('') || $('')
el.addClass('className');
el.removeClass('className');

//---------- events (jQuery) ----------//
.on(...)	// add event listener
.one(...)	// add event listener that only runs once
.off(...)	// remove event listener

function onclick(ev) {...}
$(html).on( 'click', onclick);
$(html).off('click', onclick);

angular.element($window).on('resize', function($event) {...});
angular.element($window).on('keydown keypress', function($event) {...}); // bind to multiple events


























//------------ two-way data binding -------------//
// 		1st binding:  user input -------controller------> model <--backend-as-a-service--> server
// 		2nd binding:  user <---sees--- view <---updated-by--'
// e.g - form elements, ng-model (to a primitive: Number, String, Boolean)


// MVC
// 		view 			html templates				view visualizes model (user sees view)
// 		model 			objects (json/javascript) 	model represents view (model is an abstraction of the view)
// 		controller 		javascript functions 		controller updates model (based on user input/behavior/interaction)

//–––––––––– MV* (Model View *) –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
<!doctype html>
<html ng-app> //-- MODEL --// var $scope = {};
	<head>
		<meta charset="utf-8">
		<title>Angular.js Example<title>
		// css
	<head>
	<body>
		// 2nd data binding: user <-- view <-- model
		Hello World, {{name}}.	//-- VIEW --// auto-updates when model ($scope.name) changes 
		// $scope:   {{name}} === {{$scope.name}}

		// 1st data binding: (user input) --> (model)
		Name:<input ng-model="name" type="text"/> // $scope.name = input.val();
		
		// two-way binding:  (user input) --updates--> $scope.name (model) --updates--> (view)
		//									 [1st]							  [2nd]

		<script src=/* jquery */><script>
		<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.16/angular.min.js"><script>
	<body>
<html>

//–––––––––– MVC (Model View Controller) –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
<!doctype html>
<html ng-app> //-- MODEL --//
	// ...
	<body ng-controller="MiscCtrl as misc">	  //     ng-controller="MiscCtrl"
		Hello {{name}}.				  //-- VIEW --//                 \/
		Name:<input ng-model="myVar" type="text"/>// user input --controller--> model
		
		// javascript
		<script>
			function NameCtrl($scope) {	//-- CONTROLLER --// global function pollutes global namespace
				$scope.name = "Tylor";	// initializes $scope.name
			}
		<script>
	<body>
<html>

//–––––––––– MVC –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
<!doctype html>
<html ng-app="miscApp"> //-- MODEL --// loads "miscApp" model <-----------------------------.
	// ...																					^
	<body ng-controller="MiscCtrl as misc">	  //       ng-controller="MiscCtrl" <----.	|
		Hello {{name}}. //-- VIEW --//				                 	^				 |	|
		Name:<input ng-model="name" type="text"/> // user input --controller--> model 	 |	|
		//																^				 |	|
		// javascript 													'----------------+	|
		<script>//																		 |	|
			var app = angular.module('miscApp', []); //-- MODEL --// --------------------+->'
			app.controller('MiscCtrl', function($scope) { //-- CONTROLLER --// --------->' 
				$scope.name = "Tylor";	// local namespace (avoids polluting global namespace)
			});
		<script>
	<body>
<html>





