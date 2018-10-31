var app = angular.module('fbAuth');

app.constant('FIREBASE_URL', 'https://torrid-inferno-9741.firebaseio.com');

app.service('authService', ['FIREBASE_URL', function(FIREBASE_URL){
	var ref = new Firebase(FIREBASE_URL);

	this.user = ref.getAuth();

	var saveNewUser = function(userObj) {
		ref.child('users').child(userObj.id).set(userObj); // firebaseio.com/users/<user.id> = <user>
	};

	var isLoggedIn = function() {
		return !!ref.getAuth();
	};
}]);