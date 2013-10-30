// tip: place all templates in a file on a CDN (ensures that users always cache our application)
//		CDN = Content Delivery Network = a large distributed system of servers deployed in multiple data centers across the Internet

//---------- template ----------//
<% execute javascript %>
<%= "interpolate" (print) variables %>		// no semicolon ";"
<%- "interpolate" (print) variables with escaped HTML %>

<%= person.name %>  =  <% print(person.name); %>

//---------- utilities ----------//
_.times(n, function(index){...});
_(n).times(function(index){...});
_.random(min, max);		// inclusive

//---------- create new underscore utilities ----------//
_.mixin({
	echo: function(arg) {return arg;},
	myFunction: function() {...}
});
_("hello").echo(); --> "hello"