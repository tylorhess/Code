const secret = ({msg='ES6 rocks!'}={}) => () => msg;
//		 |
//		 |	 expand arrow function
//		\ /
//		 '
const secret = function( {msg='ES6 rocks!'} = {} ) {
	return function() {
		return msg;
	};
};
secret()() --> 'ES6 rocks!'
//		 |
//		 |	 default parameter --> default declaration
//		\ /
//		 '
const secret = function() {
	var msg = 'ES6 rocks!'||{};
	return function() {
		return msg;
	};
};
secret()() --> 'ES6 rocks!'