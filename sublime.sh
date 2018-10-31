# Sublime     OS X Keyboard
# --------    -------------
# super (⌘)   command (cmd)
# alt   (⌥)   option  (opt)
# ctrl  (⌃)   control (ctrl)
# shift (⇧)   shift
# 	    (⇪)	  caps lock

Find/Replace
	cmd + click			Place multiple cursors (single click OR double click)
	cmd + d 			Multi-Select/Replace Next    (instance of highlighted selection, case insensitive)
	cmd + u 			Multi-Select/Replace Un-next (instance of highlighted selection, case insensitive)
	cmd + ctrl + g 		Multi-Select/Replace All    (instances of highlighted selection, case insensitive)
	cmd + shift + l 	Multi-Select/Replace All Highlighted Lines (one selection per line)
	esc 				Escape Multi-Select

	cmd + f 			Find-only (Ty: Find-Replace)
	alt + cmd + f 		Find-Replace
		enter 				Next     (instance)
		shift + enter 		Previous (instance)
		alt + cmd + e 		Replace  (highlighted instance)
	shift + cmd + f 	Find in all files


shortcuts & snippets (generally compatible with TextMate)
	esc							close console
	tab							autocomplete (cycle through)
	cmd + ]						indent line/selection
	cmd + [						dedent line/selection
	cmd + /						toggle comment
	cmd + l 					highlights entire line
	cmd + rtrn 					return (newline) from middle of a line (as if you were at the end)
	opt + cmd + .				close HTML tag
	ctrl + k					kill (cut) line (everything after cursor)
	ctrl + y 					yank (paste) killed line
	cmd + 1/2/...				go to window 1/2/... (within pane)
	cmd + w 					close window
	opt + cmd + 2				2 (side-by-side) panes
	opt + cmd + 1				return to 1 pane
	ctrl + 1/2/...				go to pane 1/2/...
	cmd + p OR t (from TextMate)"go to anything" (Spotlight-like omni-search)
									file --> (fuzzy search) 'filename...'
									fn   --> (fuzzy search) 'file_name...'
									#... 		= (within current file) find ...
									@... 		= (within current file) find function definition ...
									:##  		= (within current file) go to line number ##
									file#... 	= (within <file>) find ...
									file@... 	= (within <file>) find function definition ...
									file:## 	= (within <file>) go to line number ##

	cmd + k + b					hide/show folder nav
									instead navigate with "go to anything"
									manually hide/show minimap (right)
	cmd + k + 0 				unfold all code
	cmd + k + 1 				fold code at level 1
	cmd + k + 2 				fold code at level 2
	...							...
	cmd + opt + [ 				fold selected code    OR    fold code near cursor
	cmd + opt + ] 				unfold selected code  OR  unfold code near cursor

#######################################
########## Customize Sublime ##########
#######################################
Sublime Text > Settings Default > Preferences.sublime-settings > "Place your settings in the file 'User/Preferences.sublime-settings', which overrides the settings in here."
create: /Users/tylor/Library/Application Support/Sublime Text 3/Packages/User/Preferences.sublime-settings
{
    "word_wrap": true
}

#######################################
##########  Package Control  ##########
########## (cmd + shift + p) ##########
#######################################
Sublime Package Control # allows us to install other packages for Sublime Text
	install: https://packagecontrol.io/installation
	1) cmd + shift + p 			# opens Sublime Package Control
		2) type: 'install p...' >> 'Package Control: Install Package' # loads all available packages
			3) type: 'nameofpackage' 	# installs package (packages auto-update)
		2) type: 'remove p...'  >> 'Package Control: Remove Package'
			3) type: 'nameofpackage' 	# uninstalls package
		2) type: 'list p...'  >> 'Package Control: List Packages'

#####################################
########## Package Control ##########
##########  List Packages  ##########
#####################################
Bracket Highlighter # places brakcets in the "gutter" (to the left of the line numbers)

EditorConfig

Emmet
# see: docs.emmet.io/cheat-sheet/
# Example:
![tab]  >>>>	<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<title>Document</title>
				</head>								<ul>
				<body>									<li id="item1"></li>
					ul>li#item$*3[tab]  >>>>>>>>>>>>>	<li id="item2"></li>
				</body>									<li id="item3"></li>
				</html>								</ul>

Git
	1) cmd + shift + p 			# opens Sublime Package Control
		2) type: 'git...'
# I suppresssed the status bar notifications (in favor of linter's notifications)

GitGutter # +/-/... in "gutter" tell if added/removed/... since last git commit
	cmd + shift + opt + k 	# go to previous "change" = group of lines added/removed/...
	cmd + shift + opt + j 	# go to next "change"
# I suppresssed the status bar notifications (in favor of linter's notifications)

Nodejs 			# autocomplete

PackageControl (itself)

prettyJSON
	1) select/highlight json
	2) cmd + shift + p 			# opens Sublime Package Control
		3) type: 'json format...' >> 'Pretty JSON: Format (pretty print) JSON'
		3) type: 'json min...'    >> 'Pretty JSON: Minify (compress) JSON'
		3) ...

RawLineEdit # show whitespace characters (tab, space, CR, LF)		# CR = Carriage Return, LF = Line Feed
	1) cmd + shift + p
		2) type: 'Raw Line Edit: Toggle' # file becomes read-only, but CR LF characters are visible
	3) cmd + shift + p
		4) type: 'Raw Line Edit: Toggle' # to continue editing file
	
	# temmporary whitespace characters (only: tab & space)
	highlight text

	# always-on whitespace characters (only: tab & space)
	Sublime Text > Preferences > Settings - User > "draw_white_space": "all",

	# to convert between LF (Unix) and CR-LF (Windows): 
	View > Line Endings > Unix|Windows

SideBarEnhancements # adds more options, when you right-click on files/folders in the left-hand side-bar
	right-click (left-hand side-bar) # more options

SublimeCodeIntel 	# intelligent auto-complete
	# Languages supported: JavaScript, Mason, XBL, XUL, RHTML, SCSS, Python, HTML, Ruby, Python3, XML, Sass, XSLT, Django, HTML5, Perl, CSS, Twig, Less, Smarty, Node.js, Tcl, TemplateToolkit, PHP
	ctrl + shift + space 	# force auto-complete
	ctrl + click 			# function definition appears at bottom of screen
	ctrl + alt + cmd + up 	# function definition appears at bottom of screen
	#ctrl + alt + cmd + left # "go back"???


SublimeLinter  	# highlights syntax/... errors & places yellow dot in gutter
	SublimeLinter-jshint 		# javascript (requires JSHint?)
	SublimeLinter-json			# JSON
	# SublimeLinter-html-tidy	# html (html5?)
	# SublimeLinter-csslint		# css
	# ... 						# (individually install each language)

	# overroad (cmd + ctrl + l) keybinding for AngularJS
	Sublime Text > Preferences > Package Settings > SublimeLinter > Key Bindings - Default
	{ "keys": ["ctrl+super+l"], "command": "sublimelinter_lint" },






##########################################
########## Uninstalled Packages ##########
##########################################
# REMOVED (annoying autocomplete when nothing's typed)
AngularJS 		# autocomplete
	cmd + ctrl + l 			# omni-search (local) Angular project files: modules, controller, filter, factory, constant, ... 
	cmd + ctrl + alt + l 	# place cursor near word --> opens (local) Angular file which defines: module, controller, filter, factory, constant, ...)
	cmd + ctrl + shift + l 	# place cursor near Angular keyword --> opens Angular Docs (docs.angularjs.org)
							# similar to, Dash: ctrl + h
	# to add ^these^ keybindings:
		Sublime Text > Preferences > Key Bindings - User
		{ "keys": ["super+ctrl+l"], "command": "angularjs_find" },
		{ "keys": ["super+ctrl+alt+l"], "command": "angularjs_go_to_definition" }

DashDoc 		# requires Dash to be installed
	ctrl + h 	# pulls up Dash documentation for highlighted|nearest text

jsFormat # format javascript???

JSHint # from JSLint = checks javascript syntax
	# (alternatively?): sudo npm install -g jshint 
	ctrl + j 	# runs JSHint on current .js file

SublimeOnSaveBuild 	# checks .js files everytime you save (using JSHint?)
 	(save) cmd + s 	# runs JSHint (.js file only?)
 	esc 			# removes error window

github.com/mhartl/rails_tutorial_sublime_text
	cmd + shift + e 		run test
	ctrl + shift + .		inset (and loop through) .erb: <%  %>, <%=  %>, ...




