// jquery versions
// version 1.x = supports IE 6/7/8
// version 2.x = bug fixes, but no new features (no support for IE 6/7/8)
// google CDN: https://developers.google.com/speed/libraries/#jquery
// jQuery CDN: http://jquery.com/download/#using-jquery-with-a-cdn
<!--[if lt IE 9]>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<![endif]-->
<!--[if gte IE 9]><!-->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<!--<![endif]-->
// Above is javascript-formatted. It looks different html-formatted. 
// Even then, it still looks wierd, but I copy/pasted it from: 


--------------- drag-and-drop ---------------


-------------------- ajax --------------------
$.ajax({
	method: "(GET)|POST",
	url: "url.com"
	data: JSON.stringify({...}), 	// always convert .toString()
	//contentType: "application/x-www-form-urlencoded", // (default) url.com/?key1=value1&key2=value2
	//contentType: "application/json",			// url.com/  +  {"key1":"value1", "key2":"value2"}
	//dataType: <expected-response-type>, 		// (default: intelligent choice)|"xml"|"json"|"script"|"html"
}).done(function(data, textStatus, jqXHR) {
	console.log("Success: "+JSON.stringify(data));
}).fail(function(jqXHR, textStatus, errorThrown) {
	console.log("Error: "+textStatus);
}).always(function(data_OR_jqXHR, textStatus, jqXHR_OR_errorThrown) {
	//console.log("always");
}).then(function() {
	//console.log("then");
});




<!doctype html>
<html>
<head>
	
</head>
<body>
	<input id='name' type='text'>
	<h2 id='greeting'></h2>

	<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
	<script type="text/javascript">
	$(function() {
		var name = $('#name');
		var greeting = $('#greeting');	
		var prefix = "Hello";
		name.keyup(function() {
			greeting.text(prefix + name.val() + '!');
		});
	})
	</script>
</body>
</html>





<a href="javascript:scrollTo($('#id'));">button</a>

<script>
var scrollTo = function(element) {
	$('html, body').animate(
		{scrollTop: element.offset().top},	//$("#id").offset().top},	// scroll so top of screen is at top of element
		2000	// animation duration
	);
	return false; // don't reload page
};
</script>

// to prevent a browser action associated with event (prevents: following link, submitting form, ...)
$( "a" ).click(function( event ) {
	event.preventDefault();
});