# local wordpress install

# 1. Install MAMP (Mac OS X, Apache, MySQL, PHP)

# 2. Download wordpress: wordpress.org/download/
# unzip and install into /Library/WebServer/Documents/wordpress
$ cd /Library/WebServer/Documents 
$ sudo chown -R _www <folder>		# wordpress folder & all subfolders
$ sudo chmod -R g+w <folder>		# wordpress folder & all subfolders

# 3. VISIT: localhost/wordpress
follow instrcutions

# 4. VISIT: localhost/phpMyAdmin
# create database for next step
MySQL un: root
MySQL pw: root

# 5. VISIT: localhost/wordpress/wp-admin
install themes and/or plugins

# hackfit
localhost/phpMyAdmin
MySQL un/pw: root/root
database: salient
table prefix: hf_
/Library/WebServer/Documents/salient
localhost/salient
Title: Hackfit
localhost/salient/wp-login.php
un/pw: admin/admin
localhost/salient/wp-admin/

# wordpress_start
database: wordpress_start
table prefix: wps_
title: Tylor Demo
un/pw: admin/admin

Dashboard
	(site name) > Visit Site = preview live site
	Screen Options (right) = hide/show windows/elements on the dashboard 
	Home = dashboard main page 
	Updates = updates WordPress, themes, and plugins
	Posts
		All Posts = create, view, and manage posts
		Add New = create new post
			Title
			Content
				Add Media (button) = insert featured image or gallery 
				Visual (tab) = WYSIWYG
				Text (tab) = html
			Save = draft
			Publish = immediately or later
			Format = types of posts
				types: standard, aside, audio, chat, gallery, image, link, quote, status, video
				themes/plugins cannot create/delete format types
				themes/plugins can skin: add_theme_support('post-formats', array('aside'))
				to compete with tumblr (ease of use inside wordpress dashboard)
			Categories = group related posts (similar to Tags)
				post category = required (default: Uncategorized)
				category has parent (hierarchy)
			Tags = describe posts (similar to Categories)
				post tag = optional
				tags have no relationships
				case insensitive
			Slug = url-friendly title
			Author
			Excerpt
			Discussion = allow comments, trackbacks, and pingbacks
			Send Trackbacks ~= acknowledgements/references at end of academic paper or text book
			Custom Fields (specific to themes)
		Categories = create, view, and manage categories
			Name
			Slug = url-friendly name
			Parent = hierarchy
			Description
		Tags = create, view, and manage tags
			Name
			Slug = url-friendly name
			Description
			(no parent)
		Featured Image
		(more depending on theme...)
	Media = typically uploaded/inserted into post/page
		Library = add, view, and manage media (images, video, audio, ...)
	Pages
		All Pages = create, view, and manage pages
		Add New = create new page
			Title
			Content
				Add Media (button) = insert featured image or gallery
				Visual (tab) = WYSIWYG
				Text (tab) = html 
			Save = draft
			Publish = immediately or later
			Page Attributes
				Parent = pages have subpages (not necessarily menu navigation)
				Template = (depends on theme?)
				Order = order pages base on number entered into box: 1=first, 2=second, ... (default: ordered alphabetically)
			Featured Image
			Slug = url-friendly title
			Author 
			Discussion = allow comments, trackbacks, and pingbacks
			Custom Fields (specific to themes)
			(more depending on theme...)
	Comments = view and manage comments
	Appearance
		Themes
			Manage Themes (tab) 
				Current Theme
					Customize (link) = Dashboard > Appearance > Customize
					Options:
						Widgets (link) = Dashboard > Appearance > Widgets
						Menus   (link) = Dashboard > Appearance > Menus
						Header  (link) = Dashboard > Appearance > Header
						...
				Available Themes = .../wp-content/themes/ 
					Activate (link)
					Live Preview (link)
					Details (link)
			Install Themes (tab)
				Search (link) = search by keyword, filter, ...
				Upload (link) = upload .zip file (locally)
				(other links: Featured, Newest, Recently Updated)
		Customize
			title and tagline (alt: Settings > General > ...)
			colors
			header image
			front page (blog vs static page) (alt: Settings > Reading > Front page displays > ...)
		Widgets
			Available Widgets
			Main Widgets Area = footer
			Secondary Widgets Area = sidebar
			Inactive Widgets
		Menus
			Edit Menus (tab)
				create new menu (link)
				select menu to edit (dropdown) = if more than 1 menu exists
				Pages = add existing wordpress pages to menu
					Add to Menu (button)
				Links = add external links to menu
					Add to Menu (button)
				Categories = add link to category-$slug.php/category-$id.php/category.php/archive.php
					Add to Menu (button)
				Menu Name (edit)
				Menu Structure
					drag-and-drop to reorder/nest
				Automatically add new top-level pages to this menu = add newly-created pages to this menu, if they have no parent
				Theme (Menu) Locations = select which locations to insert this menu (locations are pre-defined by the theme)
				Save Menu (button)
				Delete Menu (button)
			Manage Locations (tab) = assign user-created menus to theme-specific locations
				Theme Location | Assigned Menu 
				Save Changes (button)
		(Theme) Editor
	Plugins = .../wp-content/plugins/ 
		Installed Plugins = create, view, and manage plugins
		Add New
			Search (link) = search using keyword (top) or popular tags (bottom)
			Upload (link) = upload .zip file (locally)
			(other links: Featured, Popular, Newest, Favorites)
		(Plugin) Editor
			Select plugin to edit: [dropdown]
			Plugin Files = choose which file to edit 
			edit php 
			Look Up (functionname) inside Documentation
			Update File = save
	Users
		All Users = create, view, manage users
		Add New = create new user
		Your Profile
	Tools
		Available Tooles
			Press This = copy text, images, or video and paste it as a post on WordPress
			Categories and Tags Converter = convert: categories to tags (and vise versa)
		Import = imports old blog, posts, comments, ... from Blogger, Tumblr, ... (using plugins)
		Export = exports posts, pages, or all content
	Settings
		General = Title, Tagline, url, email, anyone can sign up?, new user default role [Subscriber], timezone, date format, time format, week starts on [Monday]
		Writing = convert =) to graphic?, auto-correct invalid html?, default post category/format, Press This, config posting to blog via email, auto-notify service when new posts published
		Reading = front page: blog (home.php) or page?, blog max posts, syndication (RSS, Atom, ...) feed max items, syndication (RSS, Atom, ...) feed articles show full text or summary?, visible to search engines?
		Discussion = comment moderation
		Media      = image (thumbnail, medium, large) sizes, upload to month- and year-based folders?
		Permalinks = post-domain-name url structure
	< Collapse menu

# pages vs. posts
posts = blog content
	no posts = no blog
	Categories
	Tags
pages = all non-blog content
	timeless information (About, Contact Us, ...)
	page-only site (no posts) = standard website (no blog)
	pages have subpages (hierarchy)
	Page Templates =  Template Files, Template Tags and PHP code
	more sophisticated/extensive customization (via themes)

########## custom post types ##########
originally, there were only posts
pages are posts (post_type = page)


########## theme ##########
MUST activate theme in wordpress dashboard

.../wp-content/themes/<theme>/
REQUIRED:
	index.php (empty) = template file(s)
	style.css = /* Theme Name: __________ */
OPTIONAL:
	functions.php
	screenshot.png = theme thumbnail
	other template files: 404.php, search.php, archive.php, single.php, page.php, home.php, ...
	other .js and image files
	
.../wp-content/themes/<theme>/style.css
	/*
	Theme Name: Twenty Thirteen
	Theme URI: http://wordpress.org/themes/twentythirteen
	Author: the WordPress team
	Author URI: http://wordpress.org/
	Description: The 2013 theme for WordPress takes us back to the blog, featuring a full range of post formats, each displayed beautifully in their own unique way. Design details abound, starting with a vibrant color scheme and matching header images, beautiful typography and icons, and a flexible layout that looks great on any device, big or small.
	Version: 1.0
	License: GNU General Public License v2 or later
	License URI: http://www.gnu.org/licenses/gpl-2.0.html
	Tags: black, brown, orange, tan, white, yellow, light, one-column, two-columns, right-sidebar, flexible-width, custom-header, custom-menu, editor-style, featured-images, microformats, post-formats, rtl-language-support, sticky-post, translation-ready
	Text Domain: twentythirteen

	This theme, like WordPress, is licensed under the GPL.Use it to make something cool, have fun, and share what you've learned with others.
	*/



# template heirarchy:
	error 404			--> 404.php
	search result		--> search.php
	multiple posts (archive page)
		category		--> category-$slug.php 	--> category-$id.php	--> category.php \
		tag 			--> tag-$slug.php 		--> tag-$id.php 		--> tag.php    ---\
		author			--> author-$nicename.php--> author-$id.php 		--> author.php ----> archive.php
		date 			-->	...					-->	...					-->	...		------/
		... 			-->	...					-->	...					-->	...	---------/
	single post
		post 						----------------------------------------------------------------> single-post.php -----\
		custom post type (cpt) 		----------------------------------------------------------------> single-$posttype.php -> single.php
		post w/ media (attachment) 	--> $mimetype.php --> $subtype.php --> $mimetype_$subtype.php --> attachment.php ------/
	static page
		page 					--> page-$slug.php --> page-$id.php \___ page.php
		page (custom template)	--> $custom.php -^ 					/
	front page 													   /
		page  ----------------------------------------------------/
		posts -----\
	blog (posts) ---\__ home.php
	comments popup page ----------> comments-popup.php

	(from above)
	--> 404.php ----\
	--> search.php --\
	--> archive.php --\
	--> single.php ----> index.php
	--> page.php -----/
	--> home.php ----/
	--> comm... ----/

	http://en.wikipedia.org/wiki/Internet_media_type
	$mimetype.php = image.php, audio.php, video.php, application.php, ...
	$mimetype_$subtype.php = video_mpeg.php, video_mp4.php, video_ogg.php, ...

OPTIONAL: other .php files
	comments.php
	comments-popup.php
	footer.php
	header.php
	sidebar.php

# page (custom template)
	Dashboard > Pages > Add New > Page Attributes > Template > "Custom Template Name"
	.../wp-content/themes/<theme>/page_custom-template-name.php 	# you can name it anything you want (just don't use "page-...")
		<?php
		/*
		Template Name: Custom Template Name
		*/
		?>

########## child theme ##########
safest/easiest way to modify parent theme (tiny or extensive changes)
.../wp-content/themes/<theme>-child/ 	# make a new folder, call it: current theme's folder name + "-child"

MUST: activate child theme in wordpress dashboard

REQUIRED: style.css
	overrides = loaded after parent's style.css
	.../wp-content/themes/<theme>-child/style.css
		/*
		 Theme Name:     Twenty Thirteen Child
		 Theme URI:      http://example.com/twenty-thirteen-child/
		 Description:    Twenty Thirteen Child Theme
		 Author:         John Doe
		 Author URI:     http://example.com
******** Template:       twentythirteen 	// name of parent-theme's folder
		 Version:        1.0.0
		*/
		/* =Imports styles from the parent theme
		-------------------------------------------------------------- */
		@import url('../twentythirteen/style.css');
		/* =Theme customization starts here
		-------------------------------------------------------------- */

OPTIONAL: functions.php
	loaded before parent's functions.php = overrides?
	.../wp-content/themes/<theme>-child/functions.php
		<?php 
			// custom php functions here
		?>

########## plugin ##########
.../wp-content/plugins/<plugin>/
		<?php
		/*
		Plugin Name: Magic Plugin
		Plugin URI: http://example.com/magic-plugin
		Description: Magic Plugin performs magic
		Version: 2.3
		Author: Mr. Magic
		Author URI: http://example.com/
		*/
		?>

########## custom code ##########
custom plugin || theme's function.php

# theme's function.php
# .../wp-content/themes/<theme>-child/functions.php
	acts like a plugin, except unique to each theme (changes when you change the theme)

# custom plugin
# .../wp-content/plugins/ 		# can activate/deactivate
# .../wp-content/mu-plugins/ 	# wordpress "must use" plugins in this folder (activated by default, can't deactivate without (re)moving from folder)

<?php
function do_something_function() {
	// do something...
}
// [do-something-shortcode] = do_something_function()
function add_shortcode_function() {
	add_shortcode('do-something-shortcode', 'do_something_function');
}
// execute `add_shortcode_function()` when wordpress initializes
add_action( 'init', 'add_shortcode_function');
?>

########## widgets ##########
add content and features (post categories, tag clouds, navigation, search, ...) to widgetized sections of theme (sidebar, header, footer, ...)
Appearance > Widgets = add, manage, and remove widgets
plugins install new widgets
theme must support widgets (have Widget Areas)
functions.php sets order and placement
theme's functions.php:
<?php
		// create widget(s)... err "sidebar(s)"
		add_action( 'widgets_init', 'create_widget_areas' );	// "widgetize" a theme
		function create_widget_areas() {
			register_sidebar();			// uses defaults below
			// for multiple widgetized areas, use register_sidebar() multiple times
			register_sidebar( array(
				// default values
				'name' => 'Sidebar',				// human-readable: Dashboard > Appearance > Widgets
				'id' => '{auto-incremented id}',	// widgetized area slug
				'description' => '',
				'class' => '',
				'before_widget' => '<li id="%1$s" class="widget %2$s">',
				'after_widget' => '</li>\n',
				'before_title' => '<h2 class="widgettitle">',
				'after_title' => '</h2>\n'
			));
			register_sidebar( array( 'name' => 'Footer Widgetized Area' ) );
			register_sidebar( array( 'name' => '...' ) );
			...
		}
?>
theme's template files (i.e. - sidebar.php):
<?php 
		dynamic_sidebar( '$id' );	// $id = widgetized area slug (above)
?>
----------- alternatively ----------
<?php 
		add_action( 'widgets_init', 'create_widget_areas' );	// "widgetize" a theme
		function create_widget_areas() {
			register_widget( 'WidgetClassName' );
		}
		class WidgetClassName extends WP_Widget {
			function WidgetClassName() {			// constructor (function name same as class name)
				parent::__construct( false, 'My New Widget Title' );	// instantiate the parent object
			}
			function form($instance) {}							// create widget form (widget output)
			function update($new_instance, $old_instance) {}	// update widget (save widget options to database)
			function widget($args, $instance) {}				// widget display (output admin widget options form)
		}
?>



########## menus ##########
theme's functions.php:
<?php
		// create one menu location
		add_action( 'init', 'create_menu_location' );	// create one menu location, when wordpress initializes
		function create_menu_location() {
			if ( function_exists('register_nav_menu') ) {
				register_nav_menu( 'header-nav', 'Header Navigation');	// register menu location with theme
				// 'header-nav' = menu location slug; 'Header Navigation' = human-readable: Dashboard > Appearance > Menus
			}
		}
		//---------- alternatively ----------//
		// create multiple menu locations
		add_action( 'init', 'create_menu_locations' );	// create multiple menus, when wordpress initializes
		function create_menu_locations() {
			register_nav_menus( array(					// register menu locations with theme
				'header-nav' =>  'Header Navigation',
            	'menu-location-slug' => 'Human-readable Menu Title',
            	...
			));
		}
?>
theme's template files (i.e. - header.php):
<?php 
		wp_nav_menu( array( 'theme_location' => 'header-nav' ));	// menu location slug (from functions.php)
		//---------- alternatively ----------//
		wp_nav_menu( array( 
			'theme_location' => 'header-nav'
			// default values:
			'menu'            => '',	// desired menu
			'container'       => 'div',	// 'container' => 'false', for no container
			'container_class' => 'menu-{menu slug}-container',
			'container_id'    => '',
			'menu_class'      => 'menu',
			'menu_id'         => 'menu-{menu slug}',
			'echo'            => true,
			'fallback_cb'     => 'wp_page_menu', 	// function to call, if menu doesn't exist
			'before'          => '',	// (before)<a>link text</a>
			'after'           => '',	// <a>link text</a>(after)
			'link_before'     => '',	// <a>(link_before)link text</a>
			'link_after'      => '',	// <a>link text(link_after)</a>
			'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
			'depth'           => 0,
			'walker'          => ''
		));
?>

########## .../wp-config.php ##########
define( 'WP_MEMORY_LIMIT', '64M' );

########## php ##########
<!-- The Loop -->
<?php if ( have_posts() ) : ?>
	<?php while ( have_posts() ) : ?>
		<div><?php the_post(); ?></div>
	<?php endwhile; ?>
<?php else: ?>
	<p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
<?php endif; ?>

<!-- wordpress functions -->
<?php
get_header(); 	# include header.php
if ( have_posts() ) {
	while ( have_posts() ) {
		the_post(); 
			the_title();
			the_title_attribute();
			the_content();
			the_permalink(); 		# url?
			the_time('F jS, Y'); 	# current time?
			the_author_posts_link(); # other posts by this author
			the_category($delim); 	# comma-delimited list of categories; $delim = delimitor
			the_tags( $before, $delim, $after );
	}
}
get_footer();	# include footer.php

bloginfo('stylesheet_url');
	(default) name 	# "Site Title" 		(Settings > General)
	description 	# "Tagline"			(Settings > General)
	wpurl 			#  "WordPress address (URL)" (Settings > General)
	url 			# "Site address (URL)" (Settings > General)
	admin_email 	# "E-mail address" 	(Settings > General)
	charset 		# blog_charset 		(Settings > Reading)
	language
	stylesheet_url 	# url to style.css (use get_stylesheet_uri() instead)
	template_url 	# url of the active (parent) theme's directory
	...
get_template_directory_uri();	# parent template directory 
get_stylesheet_directory_uri();	# child template directory

wp_list_cats('sort_column=name&optioncount=1&hierarchical=0');
wp_get_archives('type=monthly');


$post_7 = get_post($id); 	# $id = 7;
$post_7 = get_post($id, $output);
$post_7 = get_post($id, $output, $filter);
	$filter = 'raw', 'edit', 'db', 'display', 'attribute', 'js'
	$output = OBJECT, ARRAY_A, ARRAY_N 	# exactly as written (NOT as strings)
		OBJECT = WP_Post object
ID # (integer) The post ID
post_author 	# (integer) The post author's ID
post_date 
# (string) The datetime of the post (YYYY-MM-DD HH:MM:SS)
post_date_gmt 
# (string) The GMT datetime of the post (YYYY-MM-DD HH:MM:SS)
post_content 
# (string) The post's contents
post_title 
# (string) The post's title
post_category 
# (integer) The post category's ID. Note that this will always be 0 (zero) from wordpress 2.1 onwards. To determine a post's category or categories, use get_the_category().
post_excerpt 
# (string) The post excerpt
post_status 
# (string) The post status (publish|pending|draft|private|static|object|attachment|inherit|future|trash)
comment_status 
# (string) The comment status (open|closed|registered_only)
ping_status 
# (string) The pingback/trackback status (open|closed)
post_password 
# (string) The post password
post_name 
# (string) The post's URL slug
to_ping 
# (string) URLs to be pinged
pinged 
(string) URLs already pinged
post_modified 
(string) The last modified datetime of the post (YYYY-MM-DD HH:MM:SS)
post_modified_gmt 
(string) The last modified GMT datetime of the post (YYYY-MM-DD HH:MM:SS)
post_content_filtered 
(string)
post_parent 
(integer) The parent post's ID (for attachments, etc)
guid 
(string) A link to the post. Note: One cannot rely upon the GUID to be the permalink (as it was previous to version 2.5), Nor can you expect it to be a valid link to the post. It's merely a unique identifier, which so happens to be a link to the post at present.
menu_order 
(integer)

post_mime_type 
(string) Mime Type (for attachments, etc)
comment_count 
(integer) Number of comments

//echo $examplePost->post_content; // Don't do this
echo apply_filters( 'the_content', $examplePost->post_content ); // Do this instead
	ID				int 	# The ID of the post
	post_author		string	# The post authors user ID (numeric string)
	post_name?		string	# The posts slug
	post_type		string	# post|page|attachment
	post_title		string	# The title of the post
	post_date		string	# Format: 0000-00-00 00:00:00
	post_date_gmt	string	# Format: 0000-00-00 00:00:00
	post_content	string	# The full content of the post
	post_excerpt	string	# User-defined post excerpt
	post_status		string	# See get_post_status for values
	comment_status	string	# Returns: { open, closed }
	ping_status		string	# Returns: { open, closed }
	post_password	string	# Returns empty string if no password
	post_parent		int	 	# Parent Post ID ( default 0 )
	post_modified	string	# Format: 0000-00-00 00:00:00
	post_modified_gmt string # Format: 0000-00-00 00:00:00
	comment_count	string	# Number of comments on post (numeric string)


?>

# Translating WordPress: http://codex.wordpress.org/Translating_WordPress
# internationalization (i18n) and localization (l10n)
# __('msg') and _e('msg') = search the localization module for the translation of 'msg' 
<h2><?php echo __('Blog Options', 'my-text-domain') ?></h2>
---------- same as ----------
<h2><?php _e('Blog Options', 'my-text-domain') ?></h2>
---------- almost same as ----------
<h2>Blog Options</h2>

# with arguments
printf( __( 'Your zip code is %2$s, and your city is %1$s.', 'my-text-domain' ), $city, $zipcode );


mutlisite = top-level domains or sub-domains
	happytables


########## recommended plugins ##########
Exec-PHP = allows php to execute in body of page or post (overwrites code-filtering process)
Enhanced Admin Bar with Codex Search = 
Akismet WordPress Plugin = protection against comment spam
Jetpack = site stats, social media, embed media, image gallery, url shortener, Spotlight-like search, custom CSS (without editting theme)	, and more...
BuddyPress = "social networking in a box"
WP Symposium = strong alternative to BuddyPress
User-Switching = quickly switch between user accounts
Simple Login = simple login
Login Logo = change login logo
custom post type ui = 
	WP-Admin icons = Dashboards > Settings > WP-Admin icons
advanced custom fields = (i.e. - jQuery DatePicker)
wordfence = repairs files, scans for bad links/urls, scans malware, built-in firewall, manage IPs and crawlers
ManageWP = for multiple wordpress sites (not multisite) = access all wordpress sites, uptime, seo, 
plugin exists to allow users to create their own subdomains (i.e. - myreviewroom.com)
gravity forums
akismit
yoast 
WordPress SEO (used to be: Yoast WordPress SEO)
vaultpress ($$$) = backup (database and files) and security = STRONGLY RECOMMENDED!!!
	otherwise: backup to dropbox (free)
W3 Total Cache = caching = RECOMMENDED
WP Super Cache = caching
smushit = resize images
regenerate-thumbnails = 
find a plugin or offline tool to remove image header info
jetpack photon = deliver different images for smartphone, 
memcached
better wp security
google page speed
smush.it
chris fernandi's slides
yoast seo
edit flow
shareaholic
google xml sitemap

########## youtube channel ##########
WPwatercooler EP16

themes:
	planet wordpress
	elegant themes
	pagelines
	genesis
	mitcho
	yoast

when writing your own theme, start with: skeleton (framework)

smashingmagazine

5 things to do:
	change permalink
	change tagline
	setup categoried
	change 

backups:
	don't recommend provided backups
	backup database and /wp-content/ (images, files, themes, plugins, ...)

SEO:
	80%-90% out of the box
	as long as you're posting good content
	focus on content. put users first. good user experience
	page load speed

Caching:
	normally 25 (basic) to 100 (with plugins) calls to database
	caching: 25-100 --> 1 call
	use CDN = content delivery network (i.e. - RackSpace)
		cloudflare = easy and free
	>1 sec "I care", < 1 "I don't care"

Hosting:
	WPengine
		j.mp/bostonwpshop (1 month free)
		built-in: caching
		automatic, one-click staging area
		github integration
	HostGator

help out:
	make.wordpress.org
		how wordpress is made and evolves
	twitter lists
	wp tavern

tiny bit of javascript (does your browser qualify? i.e. - is it javascript enabled...)
less than 300kB
less than 3 sec load time (sub-3G network)

"what works is better than what looks good. what looks good can change, but what works, works."

wicked fast work
speakerdeck.com/cferdinandi
Why speed matters?
	intentional 0.5 sec delay --> 20% decrease (Google)
	intentional 0.1 sec delay --> 1% loss in sales (Amazon)
	mobile is the web
	77% of searches happen at home/work
	1/3 primary web access
	mobile users expect it to be 
	lose 1/3 visitors after 3 sec
	india, china, ... --> mobile > desktop
	paws new england.com 45% mobile (70% of these are iOS)
	probably 50% by 2014
	perfect storm:
		bigger sites
		weaker networks
		weaker devices
		higher expectations
css stops rendering
js stop all other downloads
<html> matters
css = top (avoid repaints)
js  = bottom (maximize downloads)

wp_enqueue_style(...)	// header by default
wp_enqueue_script(...) 	// header by default, CHANGE TO FOOTER

combine (concatinate) files
1 300kB file downloads faster than 3 100kB files
	dns lookup
	http headers
	errors

put @media (min-width:40em) in 1 file instead of 

minify (reduces by 40% or more)
	style.css
	style.min.css

pagespeeds.org

replace get_bloginfo('stylesheet_url')			= style.css (default)
		get_bloginfo('stylesheet_directory')	= style.min.css

grunt.js minify for you

plugins sometimes load 
	poorly written plugins are bad for performance
	plugin: minQueue = min and concat styles & scripts for you

google-hosted jquery
	probably already downloaded
	plugin: google-hosted jquery
	audience: "use google libraries" plugin

minify html

images = biggest area of weight
	use images wisely!
	icon fonts = lightweight (single file instead of multiple image files), css-able, vector/scale, compatible back to IE 5
		icomoon = create your own font sets (no excess images)
	gomarketing.com/<something> = tutorial
	image sprite (combine images and use css background property to differentiate)
	.jpgs: baseline = loads top-down; progressive = loads fuzzy to clear			// limited browser acceptance

	add_filter('jpeg_quality', ...)		// default 70kB instead of 90kB
	compress & sharpen 
	adaptive images = different images phone vs. desktop vs huge screen
		adaptive-images.com

	.htaccess file file zipping --> browser unzips file (faster than downloading)
		gzipwtf.com

set cache time (.htaccess) for html (0 sec), files and images (~1 month)
	timestamp all style and script so it reloads a newly changed file

#1 prebuild/precompile
	quickcache = easy = hard to screw up
	WP Super Cache = a lot of settings (better?)
	comment garbage collector (only if we get a lot of comments)

recap
	html order matters
	combine like files
	remove whitespace
	use icon fonts

Jetpack
George Stephanis
stephanis.info for link to 

wp-cli.org
wp eval ""		// execute as if on command line
stats_get_csv()
en.wordpress.com/my-stats
stats.wordpress.com/csv.php
wp eval "print_r( stats_get_csv('postview', 'period=week&days=12'))"
and more...
you can create dashboard widgets with this

contact forms
	Jetpack Contact Form
	Contact Form 7
	Gravity Forms
	Formidable Pro
	themeforest: "be aware of the larger ecosystem"
photon = cdn = FREE
	deals with content
	what about plugin/theme/twitter api?
	$url = apply_filters('jetpack_photon_url', $url, 'filter=grayscale&w=400') 	// resize to 400px wide and add grayscale filter

omnisearch
	search ALL THINGS

define('JETPACK_DEV_DEBUG', true);		// I think: turns off connection to wordpress.com (for local development)

Stop Making Things Pretty and Start Designing
Michelle from Chicago
	design for: print, web, wordpress (went to school for print design)
Design is attention to detail
Design is multidisciplinary
	you have to understand multiple fields (i.e. - web design: aethetics/illustrations/photography/art/branding, usabulity/experience, content, developer/core)
Not how, but why?
!!! BE DELIBERATE: Everything should have a reason 
	mobile first enforces this
things do not always have to look good to solve a problem
	i.e. - craigslist, drudgereport, google
Design is problem solving (Tylor: which is why engineers can )
	not art (self-expression)
	not for winning 'design' awards
	not for your client's (for your client's clients)
	is for problem solving (in the context of your audience)
Feelings > Design Goals > Design 
Feelings = do something different, something's not working, hate the logo
	not measureable
	instinct that something is right/wrong
Designer turns feelings into goals
	ask questions, do research
	turn into something achievable and measurable
Take goals, married with budget, competitors, etc. and build design strategy
	Design process: Research > Strategy > Implement > Evaluate > Adjust
Design Process: Communicate, Collaborate, Iterate
	Iterate
		content creation
		gray screen prototype (interactive, structure separate from visual, no backend)
		styles (prototype the visual)
		white screen = just backend, basic frontend, no css
	Execution
This is a whole lot of work. Why do we do this?
	Not just a executor, but a trusted partner
Keep learning
	theory   = books
	practice = online
i found myself in the position of just executing because i wasn't in a position of authority

Tylor:
	Find 1 designer (or a small number)
	Hire an army of executors

jes.se.com
vimeo.com/38260970
	ideas can have sex
user-initiated downloads
	10 thumbnails instead of 10 infographics
plugin: wp-mobile-detect 	// swap content based on mobile (not mobile first)
you can not ignore data (YOUR data)
Mark Twain: "I didn't have time to write a short letter, so I wrote a long one instead."

k adam white
bocop
	meetup sponsorships
	promote open-source projects
jquery, underscore, and backbone included in 
jquery = dom and ajax
underscore = utility methods (deal with large sets of data)... underscore is the backbone of backbone.js
	read api
backbone = model, collection (multiple models), view
	more code than var myObj = {key:"value"}
		but every time a model changes, the view re-renders itself
		more work upfront can = less down the road

wordpress security
	don't use "admin" as admin user name
	change database name prefix from "wp_" to "something_else_"

custom post types
Dan Beil
custom post type
<?php
	add_action('init', 'register_cpt_name');
	function register_cpt_name() {
		$args = array(
			'labels' => $labels
		);
		register_post_type('name',$args);
	}
?>

meta box
<?php 
		add_action('add_meta_boxes', 'example_meta_box');
		function example_meta_box() {
			add_meta_box('example_id', 'example meta box', ..., );
		}

		// save a metabox
?>

custom page.php
<?php 
	// Template Name: Employees
?>

caching
	object caching
	transients = for themes or plugins that don't have access to object caching
		get_transient();
		set_transient();
		don't overuse transients
		transients stored in the options table 
		140 transients in options tables (bloat) could 
	when using cache, kill cache, and see how fast pages load

wp cache add
wp cache set

security
Sam Hotchkiss
slides: //hotchkissconsulting.com/alot
	bruteprotect
		protects against brute force attacks
	you are never 100% secure
	types of attacks
		pharma/affilate
			embed a link to buy viagra
		link injection
			black-hat seo (link back to another site)
			search for your site on google regularly
				and use google webmaster tools
		hacktivism
			"free chechnia"
		drive-by download
			site visitor downloads 
		redirects
			take your traffic and redirect to another site
		and more...
	how secure do we have to be?
		have to be realistic
		are you using public wifi?
		how are you tranfering files?
			ftp not secure
		how is your site hosted?
			secure vps? shared host without rigid walls?
		what plugins/theme are you using?
	make sure you're up-to-date
	add to wp-config.php
		define('DISALLOW_FILE_EDIT', true);		// assuming they get in. once they're in, 99% of time they create a backdoor
	don't send passwords through email
	keep plugins/themes up-to-date and use trusted plugins/themes
	always change username (not admin)
	always change table prefix (not "wp_")		// protects against sql injections
	protect against brute-force attacks (guessing of your password)
		wordfence
		bruteprotect		// only appears in server logs
		better wp security
		use .htaccess & .htpassword			// is a pain
	backup
		don't trust host
		plugins:
			BackupBuddy
			WordPress Backup to Dropbox - free
			BackWPup - premium
			VaultPress - premium
	connect carefully
		if wifi
			install ssl
			use vpn (i.e. - getcloak.com)
		don't use ftp
			inherently insecure
			sftp is better
		use password manager and secure passwords (agilebits.com, keypass, ...)
		consider two-factor authentication (getclef.com)
	don't get sql injected
		don't write your own SQL queries if you don't have to
			the helper functions in wordpress are awesome
			wpdb class escapes
				$wpdb->insert();
				don't insert all columns, only columns needed, because someone can add their own columns
	javascript injections
	//codex.wordpress.org/Data_Validation
		use:
			<h1>echo esc_attr($title);</h1>
			<p> echo wpkses($body);   </p>
		instead of:
			<h1>echo $title; </h1>
			<p> echo $body;  </p>
	use nounces:		// nonces expire after 24 hours (links need to be clicked within 24 hrs)
		wp_nonce_field
		wp_verify_nonce
		wp_nonce_url
	wordpress is only a small part of web stack (version of: linux, apache, php, ...)
		be a security expert or choose a host wisely
	use different domain name registry and hosting (so you can redirect, if under attack)


seo
//casiegillette.com
	google adwords
	ubersuggest
	socialmention
	topsy
	youtube search is different
	"be the content that answers user's content"
	require employees to blog once a month
	talk about customers (spotlight, guest post, etc.)
	connect site to google+ 
	make sure they can call you
	local


Automatic = company that makes wordpress

hue = color
hue + white = tint
hue + black = shade

kuler.adobe.com
colorschemedesigner.com
colorlovers.com

fonts:
	fontsquirrel.com 	= 100% free
	dafont.com 			= both free and commercial
	google.com/fonts
	fonts.com 			= high-quality commercial
	identifont.com 		= find the name of a font you're looking at
	myfonts.com 		= upload image & it will guess font name

to make sure fonts are loaded in the right order
functions.php
	function load_fonts() {
        wp_register_style('googleFonts', 'http://fonts.googleapis.com/css?family=Rock+Salt|Neucha');
        wp_enqueue_style( 'googleFonts');
    }
add_action('wp_print_styles', 'load_fonts');

instead of <link> to css in header.php

images:
	search.creativecommons.org
	commons.wikimedia.org
	flickr.com/creativecommons
	photopedia.com
	123rf.com 					= commercial
	istockphoto.com 			= not recommended
	gettyimages.com
	picmonkey.com 				= photoshop online
	picasion.com 				= animated gifs
	TinEye.com 					= search (who's pirating your images)

study design
