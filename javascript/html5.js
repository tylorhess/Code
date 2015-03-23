//---------- localStorage ----------//
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

//---------- sessionStorage ----------//
same as localStorage, but mapped to session