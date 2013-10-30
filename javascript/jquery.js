jquery

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