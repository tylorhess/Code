//----------------- Web ----------------//
<script src="https://cdn.firebase.com/js/client/2.2.9/firebase.js">//</script>
//----------------- Node ---------------//
$ npm install firebase --save // `--save` adds to package.json
var Firebase = require("firebase");

//--------------- Firebase --------------//
//-------- references --------//
// creates a reference to the Firebase database
// DOES NOT connect to server or download data until a read/write/CRUD command is invoked
var ref  = new Firebase("https://torrid-inferno-9741.firebaseio.com/...");
var root = new Firebase("https://torrid-inferno-9741.firebaseio.com");
var john = new Firebase("https://torrid-inferno-9741.firebaseio.com/users/john");
		 = root.child('users/john');
		 = root.child('users').child('john');
// child string (i.e. - 'users/john')
//		max: 32 levels
//		max: 768 bytes/characters (UTF-8 = 1-6 bytes per character, but most western characters are 1 byte)

//---------- [Array] ---------//
// only use arrays when:
//		- to modify keys, modify entire array
//		- one clients writes at a time (no concurrent writes)
// 		- careful when referencing array index

// Arrays stored as Objects with numeric, sequential keys
['red', 'pink', 'blue']  ---stored-as->  {0:'red', 1:'pink', 2:'blue'} // numeric, sequential keys
['red', 'pink', 'blue']  <-returned-as-  {0:'red', 1:'pink', 2:'blue'} // numeric, sequential keys
{0:'red', 2:'blue'}      <-returned-as-  {0:'red', 2:'blue'} 		   // NOT sequntial

// Objects that look like Arrays are returned as Arrays
{0:'red', 1:'pink', 2:'blue'}  ---stored-as->  {0:'red', 1:'pink', 2:'blue'} // numeric, sequential keys
['red', 'pink', 'blue']        <-returned-as-  {0:'red', 1:'pink', 2:'blue'} // numeric, sequential keys


//------- .set (create) ------//
loc.set(data, callback);
			  callback = function(err) {...}
loc.set({						  /* like: */	location = {				// replaces location
	city: "Cambridge"								city: "Cambridge"
	state: "MA"										state: "MA"
	zip: 02139										zip: 02139
});												};
loc.child('city').set("Boston")	  /* like: */	location.city = "Boston" 	// replaces location.city

//--- .push (create unique) --//
// creates unique, chronological id
var users = ref.child('users')
var user = users.push({
	username:'tylor', 			'users/<unique-user-id>/username'
	age: 27 					'users/<unique-user-id>/age'
});
user.key() --> '<unique-user-id>'


//---------- update ----------//
// only "updates" 1st level, anything deeper is "set"
loc.update(data, callback);
				 callback = function(err) {...}
loc.update({
	city: "Boston"	// updates: loc.city = "Boston"
	zip: 02215		// updates: loc.zip  = 02215
	//state: "MA"   // (kept from previous)
});

//---- concurrent updates ----//
ref.child("count").transaction(function(currentValue) {
	return (currentValue || 0) + 1;
});

//----- .remove (delete) -----//
loc.child('zip').remove(); // deletes 'zip' from 'location'
loc.child('zip').remove(callback);
						callback = function(err) {...}

//----------- read -----------//
ref.once('value', onValueChange, onErr); // fires once (immediately)
ref.on('value', onValueChange, onErr);   // fires immediately (with initial value), then again each time the database changes
				onValueChange        = function(snapshot) { snapshot.val(); }
							   onErr = function(err) {...}
ref.off('value', onValueChange, onErr);  // removes onValueChange listener

//-------- read events -------//
ref.on('value', ...)
ref.on('child_added',   ...)
ref.on('child_changed', ...)
ref.on('child_removed', ...)
ref.on('child_moved',   ...)

//----------- order/sort -----------//
// improve production performance by using .indexOn rule in "Security and Rules"
// can't chain .orderBy...
var list = ref.child('list') --> 
	{
		key1: "value1",
		key2: "value2",
		key3: "value3", 
		key4: "value4"
	}
list.orderByKey()	// order: [Number], [String]   	// (Numbers are Strings that can be parsed as Numbers)
list.orderByValue()	// order: null, false, true, [Number], [String], [Object]

var bros = ref.child('users') --> 
	{
		ryan:  {age: 29, ...}, 
		tylor: {age: 27, ...}, 
		kyle:  {age: 25, ...}, 
		mike:  {age: 23, ...} 
	}
bros.orderByChild('age') // order: null, false, true, [Number], [String], [Object]

bros.orderByPriority() // order: no priority (default), [Number], [String]   // if same priority (incl. no priority), sorted by key

//---------- filter ----------//
{
	JzGX16y29RK5_wczY1o: {id:1,active:true,...},
	H8KnfU8HiL9VfewJl8n: {id:2,active:false,...},
	...
}
ref.orderByKey()
	.equalTo('JzGX16...')	// key === 'JzGX16y29RK5_wczY1o'
	.on('value', ..., ...)
ref.orderByValue()
	.equalTo({id:2,...}) 	// value === {id:2,...}
	.on('value', ..., ...)
ref.orderByChild('active')
	.equalTo(true)			// obj.active === true
	.on('value', ..., ...)


//----------- limit ----------//
ref.orderBy...limitToFirst(3)
ref.orderBy...limitToLast(3)
ref.orderBy...startAt('ryan')
red.orderBy...endAt('mike')
ref.orderBy...startAt('c').endAt('c~') // all that start with 'c' ('~' = char code 126 = after all regular ASCII characters)

//----- Security & Rules -----//
".read":  true  // all can read
".write": false // none can write
".validate": "newData.isString() && newData.val().length < 100"

// Example:
{
  "rules": {
    "users": {
      ".validate": "auth != null && newData.val() === auth.uid" // only the currently logged in user's unique ID is written to /user/
      "$user_id": {
        ".write": "$user_id === auth.uid" // grants a user write access on /users/<auth.uid>/ to user with $user_id === auth.id
      }
    }
  }
}

//----------- Authentication -----------//
// only whitelisted domains are allowed to initiate authentication
var auth = $firebaseAuth(ref); // populated after user authenticates
	auth --> null // unauthenticated (not signed in)
	auth.uid --> simplelogin:<uid> 		// unique user id (unique across all providers)
	auth.provider --> "password"|"anonymous"|"facebook"|"github"|"google"|"twitter"|...

authData // from callback (different than auth)
	authData --> null // user signed out
	authData.auth --> auth // var auth = $firebaseAuth(ref);
	authData.uid --> simplelogin:<uid> 		// unique user id (unique across all providers)
	authData.provider --> "password"|"anonymous"|"facebook"|"github"|"google"|"twitter"|...
	authData.token --> "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
	authData.expires --> 1437069407 // var expDate = new Date(authData.expires*1000)
	authData.password.email --> "tylor@mit.edu"
	authData.password.isTemporaryPassword --> true|false 
	authData.password.falseprofileImageURL --> "https://secure.gravatar.com/avatar/a811ccf924d011d2ed4a115df75d4c92?d=retro"


auth.$createUser({ email: $scope.email, password: $scope.password })
	.then( function(userData) { $log.log("User created with uid: ", userData.uid); })
	.catch(function(error)    { $log.error(error);                                 });
auth.$removeUser({ email: $scope.email, password: $scope.password })
	.then( function()      { $scope.message = "User removed"; })
	.catch(function(error) { $scope.error = error;            });

// Password (+Email)
auth.$authWithPassword({ email: "my@email.com", password: "mypassword" })
	.then( function(authData) { $log.log("Logged in as:", authData.uid);     })
	.catch(function(error)    { $log.error("Authentication failed:", error); });
// <provider> = "facebook", "github", "google", "twitter"
auth.$authWithOAuthPopup("<provider>")
	.then( function(authData) { $log.log("Logged in as: ", authData.uid  ); })
	.catch(function(error)    { $log.log("Authentication failed: ", error); });
// Anonymous = generates unique identifier for each user that lasts as long as their session
auth.$authAnonymously()
	.then( function(authData) { $scope.authData = authData; })
	.catch(function(error)    { $scope.error = error;       });

// log out
ref.unauth(); /* fires: */ .onAuth() /* where: */ authData --> null

// authentication listeners
ref.onAuth(callback)  // fired when authentication changes
ref.offAuth(callback)
(ref.getAuth().uid === $scope.authData.uid) // checks 

//------------- AngularFire -------------//

// .js files
<!-- AngularJS -->	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.1/angular.min.js">	//</script>
<!-- Firebase -->	<script src="https://cdn.firebase.com/js/client/2.2.4/firebase.js">					//</script>
<!-- AngularFire --><script src="https://cdn.firebase.com/libs/angularfire/1.1.2/angularfire.min.js">	//</script>

// inject angularfire.js file (Module Dependency)
var app = angular.module("miscApp", ["firebase"]); // creates services: $firebaseObject, $firebaseArray, $firebaseAuth

app.controller("MiscCtrl", ["$firebaseAuth", "$firebaseObject", "$firebaseArray", ..., function($firebaseAuth, $firebaseObject, $firebaseArray, ...) {
	//-------------- Firebase --------------//
	var ref = new Firebase("https://torrid-inferno-9741.firebaseio.com");

	// can use normal Firebase + ($scope.$apply || $timeout)
	ref.set...
	ref.push...
	ref.update...
	ref.transaction...
	ref.remove...
	ref.on("value", function(snapshot) {
		$timeout(function() {	// $scope.$apply()
			$scope.data = snapshot.val();
		});
	});
	
	//---------- $firebaseObject ----------//
	$firebaseObject(ref)
		.key1   --> undefined /* ... */ 'value1' 	// if: fireObj --> { key1:'value1', key2:'value2' }
		.key2   --> undefined /* ... */ 'value2'
		.$value --> undefined /* ... */ true|7|'a' 	// if: fireObj --> [Boolean], [Number], [String], or other primitive...
		.$ref() --> ref
		.$id    === ref.key() // unique identifier for object in database
		.$priority 	// database priority
		.$watch(callback, context)
		.$destroy() // closes connection to database, deletes local data, removes event listeners
		.$loaded()	// promise resolved the first time fireObj loads (only resolved once, not an event listener)
			.then( function(fireObj) { ... })
			.catch(function(err)     { $log.error("Error:", err); })
		.$save() 	// saves/updates (pushes local fireObj to database?)
			.then( function(ref) {  }	// ref.key() === fireObj.$id
			.catch(function(err) { $log.error("Error:", err); })
		.$remove() 	// deletes fireObj (locally and reomtely)
			.then( function(ref) {  }) // ref.key() === fireObj.$id
			.catch(function(err) { $log.error("Error:", err); })
		.$bindTo($scope|$rootScope, "fireObj") 	// .$bindTo (three-way data binding), instead of: .$loaded() + .$save() + .$remove() + ...
			.then(function(unbind) {			// same as: (local) fireObj = (remote) fireObj; // remote fireObj replaces local fireObj (deletes current local fireObj), and if remote fireObj doesn't exist, then local fireObj ~= {}
				$scope.fireObj.a        = ...;	// automatically updates changes to children
				$scope.fireObj.a.b      = ...;	// automatically updates changes to children's children
				$scope.fireObj.a.b.c    = ...;	// and so on... 
				// Warning: Only modify children 
				/* DON'T: */ $scope.fireObj = ...; // deletes fireObj (sets $scope.fireObj to a completely separate object, unrelated/unconnected to firebase)
				// Remember: $scope.fireObj... = ...; $scope.$apply(); // updates Angular (locally) and Firebase (remotely)
				unbind(); // if/when you want to unbind
			});
		.$bindTo($scope, "miscCtrl.fireObj")	// Note: miscCtrl.fireObj === $scope.miscCtrl.fireObj
			.then(function(unbind) {//                      /|\
				// (above) assumes: MiscCtrl as miscCtrl ----'
				// (below) assumes: var miscCtrl = this; (first line of controller)
				// the rest is the same...
				miscCtrl.fireObj.a        = ...;
				miscCtrl.fireObj.a.b      = ...;
				miscCtrl.fireObj.a.b.c    = ...;
				/* DON'T */ miscCtrl.fireObj = ...;
				unbind(); // if/when you want to unbind
			});

	//----------- $firebaseArray -----------//
	$firebaseArray(ref) // avoid: .push(), .splice(), ... (firebase might lose track of array indices --> corrupt data)
	// instead use:
		.$add(item);			// add new item
		.$save(item|index);		// edit existing item
		.$remove(item|index);	// delete item
		.$getRecord(key)    --> item 	// where item.$id === key
		.$indexFor(key)     --> index 	// where fireArray[index].$id === key
		.$keyAt(item|index) --> key 	// where key === item.$id
		.$ref() --> ref
		.$watch(callback, context)
		.$destroy() 	// closes connection to database, deletes local data, removes event listeners
		.$loaded() 		// promise resolved the first time fireArray loads (only resolved once, not an event listener)
			.then( function(fireArray) { ... })
			.catch(function(err)       { $log.error(err); });
}]);






//----- implementing authentication -----//

// FIREBASE_URL (constant) available anywhere in the app
// var FIREBASE_URL = 'https://torrid-inferno-9741.firebaseio.com/';
app.constant('FIREBASE_URL', 'https://torrid-inferno-9741.firebaseio.com/');

// factory --> 'auth' (singleton), so you only ever have one instance of $firebaseAuth(ref)
app.factory("auth", ["$firebaseAuth", "FIREBASE_URL", function($firebaseAuth) {
	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);
	return auth;
}]);

app.config(["$routeProvider", function($routeProvider) {
	$routeProvider
		.when("/home", {
			controller: "HomeCtrl",
			templateUrl: "views/home.html",
			resolve: {										// controller will not be loaded until $waitForAuth resolves
				"currentAuth": ["auth", function(auth) {	// 'auth' refers to our $firebaseAuth wrapper in the example above
					return auth.$waitForAuth();				// $waitForAuth returns a promise so the resolve waits for it to complete
				}]
			}
		})
		.when("/account", {
			controller: "AccountCtrl",
			templateUrl: "views/account.html",
			resolve: { 										// controller will not be loaded until $requireAuth resolves
				"currentAuth": ["auth", function(auth) { 	// 'auth' refers to our $firebaseAuth wrapper in the example above
					return auth.$requireAuth();				// $requireAuth returns a promise so the resolve waits for it to complete
				}]											// If the promise is rejected, it will throw a $stateChangeError (see above)
			}
		});
}]);

// prevents flicker, when logged-out user tries to access a page that requires authentication and is redirected to login page
// (catches error when $requireAuth promise is rejected)
app.run(["$rootScope", "$location", function($rootScope, $location) {
	$rootScope.$on("$routeChangeError", function(event, next, previous, error) {
		if (error === "AUTH_REQUIRED") {
			$location.path("/home");
		}
	});
}]);

app.controller("HomeCtrl", ["currentAuth", function(currentAuth) {
  // currentAuth (provided by resolve) will contain the
  // authenticated user or null if not logged in
}]);

app.controller("AccountCtrl", ["currentAuth", function(currentAuth) {
  // currentAuth (provided by resolve) will contain the
  // authenticated user or null if not logged in
}]);

