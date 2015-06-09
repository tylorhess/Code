$.ajax({
	method: "(GET)|POST",
	url: "url.com"
	data: JSON.stringify({}), 	// always convert .toString()
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