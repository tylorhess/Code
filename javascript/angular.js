// angular.js
//		2-way binding = binds html + javascript object (+ server?)
// recommended: 
// 		BDD = behavior-driven development
// 		TDD = test-driven development


//------------------------------ filename.html ------------------------------//
<!doctype html>
// Module
<html ng-app="applicationName"> 				/* appends to filename.html: */ var app = angular.module('applicationName', [...]);
	<head>
	</head>
	<body>
		//---------- Controller ----------//
		// controllers = give app behavior (via functions & values), initialize/configure, help get data onto the page (from javascript objects) 
		// limited scope: can only access miscCtrl ("alias") from inside <div>...</div>
		<div ng-controller="MiscController as miscCtrl"> 	/* appends to div: */ app.controller('MiscController', function() {...});

			//---------- Model ----------//
			ng-model="miscCtrl.myVar"
				<select                ng-model="miscCtrl.myVar"> 	/* 2-way binding: */ miscCtrl.myVar = $('select').val();
				<input type='checkbox' ng-model="miscCtrl.myVar"> 	/* 2-way binding: */ miscCtrl.myVar = $('input').val();
				<input type='radio'    ng-model="miscCtrl.myVar"> 	/* 2-way binding: */ miscCtrl.myVar = $('input').val();
				<textarea></textarea>

			//---------- other directives ----------//
			// directive = html attribute triggers pseudo-javascript & 2-way data binding
			ng-show			<span ng-show="miscCtrl.isValid">/* if (miscCtrl.isValid)  {display this span} */</span> // Note: undefined --> false
			ng-hide			<span ng-hide="miscCtrl.isValid">/* if (!miscCtrl.isValid) {display this span} */</span>
			ng-repeat		<div ng-repeat="item in miscCtrl.array">{{item.myProp}}</div>
			ng-src			<img ng-src="{{miscCtrl.image.thumb}}" /> 			// miscCtrl.image.thumb = '/images/image001-thumb.jpg'
			ng-click		<a href ng-click="newVar = value">{{newVar}}</a> 	// onclick event
			ng-init			<div ng-init="myVal = defaultValue"></div>			// used to set initial values (initialization & configuration should go inside controller)
			ng-class		<div ng-class="className:myVal === 1"></div>		// if (myVal === 1) {add class "className" to div} 
			ng-submit		<form name="formName" ng-submit="miscCtrl.myFunc()">

			//---------- insert file.html ----------//
			// include file
			ng-include		<div ng-include="filenameVar"> 	// insert (append?) html into <div>...</div>
							<div ng-include="'file.html'"> 	// Note: double + single quotes (filenameVar = 'file.html')
			// html element directive
			<custom-tag></custom-tag> // template-expanding directive (can include Controller logic)
			//				\/  Note: custom-tag --> customTag  (dashed-words --> camelCase)
			app.directive('customTag', function() {
				return {
					restrict: 'E'|'A', // type of directive ('E' = hmtl element, 'A' = html element's attribute)
					templateUrl: filenameVar, // filenameVar = 'file.html'
					controller: function() {

					},
					controllerAs: 'miscCtrl', // MiscController's alias
					... 
				};
			})

			// directives can be used for:
			//		expressing complex ui (see: custom directives)
			//		calling events and registering event handlers
			//		reusing common components

			//---------- 2-way data binding ----------//
			// expressions {{myVal}} keep track of whether myVal changes
			// if myVal changes, it'll update the html element
			<a href ng-click="newVar = value">{{newVar}}</a>

			//---------- expressions ----------//
			// how values get displayed on a page
			// there are a lot of things you shouldn't do inside of {{...}}
			// keep logic inside {{...}} to a minimum
			// can only access objects added to controller: this.myVar (cannot access: myObj)
			{{ miscCtrl.myVar }} 
			// filters
			{{ miscCtrl.data | filter:options }} // data --pipe--> filter  OR  filter(data, options)
				{{ '1388123412321' | date:'MM/dd/yyyy @ h:mma'}}
				{{ 'string' | uppercase }} --> 'STRING'
				{{ 'String' | lowercase }} --> 'string'
				{{ 'string' | limitTo:3 }} --> 'str' 					// string.length = 3 (limits the number of characters in string)
				<li ng-repeat="item in miscCtrl.array | limitTo:3">	// array.length  = 3 (limits the number of items in array)
				<li ng-repeat="item in miscCtrl.array | orderBy:'prop'">	// sort by miscCtrl.array.prop (ascending order)
				<li ng-repeat="item in miscCtrl.array | orderBy:'-prop'">	// sort by miscCtrl.array.prop (decending order)
				{{ miscCtrl.price | currency }} 

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
				<div>reviewForm is {{reviewForm.$valid}}.</div>	// .$valid = built-in angular property of auto-created form object
			</form>
			

		</div>
	</body>
</html>


//------------------------------ filename.js ------------------------------//
// include: <script src="filename.js"></script>
(function() { // closure 	// best practice = wrap entire file in closure
	//---------- modules ----------//
	// stores controller, objects, and other components of application
	var app = angular.module('applicationName', ['applicationName-dependency' /*, more dependencies... */]);

	//---------- controllers ----------//
	// initialization & configuration should go inside controller
	app.controller('MiscController', function() {
		this.myVar = myObj;
		this.myFunc = function(num) { this.myVar=num; };
	});
	// controller with services (dependency injection)
	app.controller('MiscController', ['$http', '$log', function($http, $log) {
		this.myVar = myObj;
		this.myFunc = function(num) { this.myVar=num; };

		// built-in angular "services"
		var that = this;
		$http(options) 	// fetch json 
			$http({
				method:'GET', // 'GET'|'POST'|'OPTIONS'|'PATCH'|'TRACE'
				url:'/products.json'
			});
		$http.get('/products.json', {apiKey: 'myApiKey'})
			.success(function(data) { that.myVar = data; })
			.error(function() {...});
		$http.post('/path/to/resource.json', { param1:'val1', ... });
		$http.put()
		$http.delete('/path/to/resource.json');

		$log 	// console.log();
		$filter // filter array
	}]);

	//---------- directives ----------//
	app.directive('customDir', function() {
		return {
			restrict: 'E'|'A', // type of directive ('E' = hmtl element, 'A' = attribute)
			templateUrl: filenameVar, // filenameVar = 'file.html'
			... 
		};
	})

	var myObj = {...};
})();

//------------------------------ dependency.js ------------------------------//
// group modules by functionality (new dependency for each functionality)
// include: <script src="dependency.js"></script>
(function() {
	var app = angular.module('applicationName-dependency',[]);
	...
	app.controller('...Controller', function() {...});
	...
	app.directive('customDir', function() { return {...}; });
	...
	var myObj = {...};
	...
})();


