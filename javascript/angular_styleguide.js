// one component per file = set module/controller/factory
// 		app.module.js, player.controller.js

// one closure per component/file

// avoid: 
var app = angular.module('app', []);
app.controller(...);

// instead:
// file: app.module.js
(function() {/* closure */
    'use strict';
	angular
		.module('app', [ // set app dependencies only once, then use getters
			'ngRoute',
			...
			'app.custom'
		]);
})();/* closure */

// file: misc.controller.js
(function() {/* closure */
	'use strict';
	angular
		.module('app')
		.controller('MiscCtrl', MiscCtrl);
	/* @ngInject */ /* OR, manually: */ 
	MiscCtrl.$inject=['$location','$routeParams', ... ];
	function MiscCtrl( $location , $routeParams , ... ) {
		// private variables
		var ___ = ...;
		var miscCtrl = this;

		// public/bindable variables/functions
		miscCtrl.variableName = variableName;
		miscCtrl.functionName = functionName;

		// put all start-up logic in an activate function
		activate();

		// all functions (private and public/bindable)
		function activate() {
			// when possible, use: $routeProvider resolve: promise, instead of activate()
		}
		function functionName() {...}

	}
})();/* closure */

// file: misc.directive.js
// <misc-dir misc-attr></misc-dir>
(function() {/* closure */
	'use strict';
	angular
		.module('app')
		.directive('miscDir', miscDir); // REMEMBER: camelCase --> dashed: <misc-dir misc-attr></misc-dir>
	/* @ngInject */
	miscDir.$inject=['$timeout', ... ]; // omit this line, when using /* @ngInject */ 
	function miscDir( $timeout , ... ) {
		// private variables
		var directive = {
			restrict: 'E',
			scope: {
				miscAttr: '=' // REMEMBER: camelCase --> dashed: <misc-dir misc-attr></misc-dir>
			},
			compile: compileFn
		};

		return directive;

		// all functions (private and public/bindable)
		function compileFn(element, attrs, transclude) {
			return linkFn;
		}
		function linkFn(scope, element, attrs, controller) {
			// private variables
			var a = true;

			// public/bindable variables/functions
			scope.variableName = initialValue;
			scope.functionName = functionName;

			// put all start-up logic in an activate function
			activate();

			// all functions (private and public/bindable)
			function activate()     {...}
			function functionName() {...}
		}
	}
})();/* closure */


// use controllerAs (over $scope)
// 

// directives should clean up after themselves. Use:
element.on('$destroy', ...) /* OR */ scope.$on('$destroy', ...)

// file: misc.factory.js
(function() {/* closure */
	"use strict";
	
	angular
		.module('app')
		.factory('misc', Misc);
	
	Misc.$inject=[];
	function Misc() {
		// private factory variables

		// public service object (returned by factory)
		var misc = {};

		// factories (singletons) always return the same instance of service object 
		return misc;

		// all functions (private & public)
		
	}
})();/* closure */