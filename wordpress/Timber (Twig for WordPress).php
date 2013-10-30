Timber = Twig + WordPress = WordPress plugin

Twig used in:
	symfony (php)
	django (python)


single.php 		= php logic 	= Controller
single.twig 	= html + css	= View

WordPress
get_the_title();
get_permalink();
$value1 = get_post_meta(get_the_ID(), 'key1', true);

Timber
{{post.title}}
{{post.permalink}}
{{post.ISBN}}

single.php
<?php
		echo "i am single.php";
		$data = array();
		//$data['headline'] = "I am the {{headline}}";
		$data['post'] = new TimberPost();
		Timber::render('single.twig', $data);		// looks for single.twig in: <theme-directory>/views/ (configurable)

single.twig 		located in: <theme-directory>/views/
<% extends "base.twig" %>
<% block content %>
{{post|print_r}}
<h1>{{headline}}</h1>
<h1>{{post.post_title}}</h1>
<div>{{post.post_content}}</div>
<% endblock %>

base.twig
<html>
<head>...</head>
<body>
	<% block content %>
		Default text, if there's an error or base.twig is accessed directly
	<% endblock %>
</body>

post.post_title 	(raw)
post.title 			(wordpress formatted)
post.post_content 	(raw)
post.content 		(wordpress formatted)
post.author.name
post.author.link
post.link
post.post_date
post.post_date|date('l F j, Y')		// Friday, September 21, 2013


{{}} = variable tags
{%%}
| (pipe) = filter
