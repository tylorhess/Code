Find/Replace
	cmd + f 			Find-only
	alt + cmd + f 		Find-Replace
		enter 				Next     (instance)
		shift + enter 		Previous (instance)
		alt + cmd + e 		Replace  (highlighted instance)


shortcuts & snippets (generally compatible with TextMate)
	esc							close console
	tab							autocomplete (cycle through)
	cmd + ]						indent line/selection
	cmd + [						dedent line/selection
	cmd + /						toggle comment
	cmd + l 					highlights entire line
	cmd + rtrn 					return (newline) from middle of a line (as if you were at the end)
	opt + cmd + .				close HTML tag
	ctrl + k					kill line (after cursor)
	ctrl + y 					yank (paste) killed line
	cmd + 1/2/...				go to window 1/2/... (within pane)
	cmd + w 					close window
	opt + cmd + 2				2 (side-by-side) panes
	opt + cmd + 1				return to 1 pane
	ctrl + 1/2/...				go to pane 1/2/...
	cmd + p						"go to anything" (Spotlight-like search feature)
	cmd + t (form TextMate)		"go to anything"
									@... = "jump to symbols"
									#... = search within file
									:##  = go to line number 
									'usp' --> user_sys_pref.rb
	cmd + k + b					hide/show folder nav
									instead navigate with "go to anything"
									manually hide/show minimap (right)
#-------------------- Package Control --------------------#
Sublime Package Control # allows us to install other packages for Sublime Text
	install: https://packagecontrol.io/installation
	1) cmd + shift + p 			# opens Sublime Package Control
		2) type: 'install p...' >> 'Package Control: Install Package' # loads all available packages
			3) type: 'nameofpackage' 	# installs package (packages auto-update)
		2) type: 'remove p...'  >> 'Package Control: Remove Package'
			3) type: 'nameofpackage' 	# uninstalls package

#-------------------- Packages --------------------#
SublimeCodeIntel 	# intelligent auto-complete
	# Languages supported: JavaScript, Mason, XBL, XUL, RHTML, SCSS, Python, HTML, Ruby, Python3, XML, Sass, XSLT, Django, HTML5, Perl, CSS, Twig, Less, Smarty, Node.js, Tcl, TemplateToolkit, PHP
	ctrl + shift + space 	# force auto-complete
	ctrl + click 			# function definition appears at bottom of screen
	ctrl + alt + cmd + up 	# function definition appears at bottom of screen
	#ctrl + alt + cmd + left # "go back"???

DashDoc 		# requires Dash to be installed
	ctrl + h 	# pulls up Dash documentation for highlighted|nearest text

JSHint # from JSLint = checks javascript syntax
	ctrl + j 	# runs JSHint on current .js file

SublimeOnSaveBuild 	# checks .js files everytime you save (using JSHint?)
	(save) cmd + s 	# runs JSHint (.js file only?)
	esc 			# removes error window

SideBarEnhancements # adds more options, when you right-click on files/folders in the left-hand side-bar
	right-click (left-hand side-bar) # more options

prettyJSON
	1) select/highlight json
	2) cmd + shift + p 			# opens Sublime Package Control
		3) type: 'json format...' >> 'Pretty JSON: Format (pretty print) JSON'
		3) type: 'json min...'    >> 'Pretty JSON: Minify (compress) JSON'
		3) ...

Git
	1) cmd + shift + p 			# opens Sublime Package Control
		2) type: 'git...'

GitGutter # +/-/... in "gutter" tell if added/removed/... since last git commit
	cmd + shift + opt + k 	# go to previous "change" = group of lines added/removed/...
	cmd + shift + opt + j 	# go to next "change"

Bracket Highlighter # places brakcets in the "gutter" (to the left of the line numbers)

jsFormat
























github.com/mhartl/rails_tutorial_sublime_text
	cmd + shift + e 		run test
	ctrl + shift + .		inset (and loop through) .erb: <%  %>, <%=  %>, ...


Sublime Text > Settings Default > Preferences.sublime-settings > "Place your settings in the file 'User/Preferences.sublime-settings', which overrides the settings in here."
create: /Users/tylor/Library/Application Support/Sublime Text 3/Packages/User/Preferences.sublime-settings
{
    "word_wrap": true
}