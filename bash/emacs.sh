# emacs
emacs -nw -Q
emacs -nw		# without X11
emacs -Q		# without customizations
	/\			# up (ctrl + p)
	\/			# down (ctrl + n)
	-->			# right (ctrl + f)
	<--			# left (ctrl + b)
	C-a			# start of line
	C-e			# end of line
	M-a			# start of sentence
	M-e			# end of sentence
	M-k			# cut to end of sentence
	M-<			# start of document
	M->			# end of document
	C-v			# down one window
	M-v			# up one window
	DEL			# delete char before cursor [C-h]
	fn-DEL		# delete char after cursor (C-d)
	M-DEL 		# kill word before cursor [M-h]
	M-d			# kill word after cursor
	C-k			# kill to end of line
	C-u 0 C-k	# kill to start of line
	C-SPC; C-w	# set mark (select region); kill region
	C-y			# yank from kill ring
	M-y			# yank previous; then the one before that, and so on...
	C--			# undo (C-_ OR C-/ OR C-x-u)
	C-l			# cursor center screen
	C-l C-l		# cursor top of screen
	C-u 0 C-l	# cursor top of screen
	C-u 3 _-_	# repeat 3 times: _-_ (next command) 
	C-g			# "quit"; kill running process; discard C-u-4 or ESC command
	C-x C-c		# exit emacs and save files
	C-z			# suspend emacs
	fg			# resume suspended process (%emacs)
	C-s			# search (next = C-s, prev = C-r, exit = RETURN)
	C-r			# reverse search
	C-x C-f		# open/find/create new file; switch open files (buffers)
	C-x C-s 	# save a file
	C-x s		# save multiple files/buffers (prompted for each)
	C-x C-b		# show open files (buffers)
	C-x b [file]# switch to open file (buffer)
	C-x f		# "fill" characters per row (70)
	C-x 1		# kill all other windows (except window 1) i.e. - close "help"
	C-x 2		# 2 windows/frames
	C-x 3		# side-by-side windows/frames
	M-o			# toggle cursor between 2 windows/frames (M-i OR C-x o)
	C-M-v		# scroll bottom window/frame
	C-h k _-_	# "help"; description of command _-_
	C-h m 		# mode documentation i.e. - text-mode
	
	M-x run-js		# javascript REPL (C-c !)
	C-c C-j			# push line to REPL
	C-SPC; C-c C-r	# push selection to REPL
	jshint (npm install -g jshint)
		C-c C-u		# run jshint
		C-m 		# goto line with erro
		M-g g #		# goto line number: #
		
	ESC-ESC-ESC	# universal "get out" command
	
	M-x help-with-tutorial
	M-x replace-string OLD NEW
	M-x text-mode
	M-x run-js					# javascript REPL (C-c !)
	M-x ielm					# emacs lisp REPL
	M-x describe-mode			# show shortkeys/description for current mode
	M-x descrie-command
	M-x apropos					# search for help on a given topic
	
	magit			# git interface for emacs 		github.com/magit/magit
	etags			# jump to function definition	emacswiki.org/emacs/EmacsTags
	hippie-expand	# autocomplete					emacswiki.org/emacs/HippieExpand
	yasnippet		# autocomplete					github.com/capitaomorte/yasnippet
	
	org-mode		# node taking
	gnus			# email
	dired-more		# directories
	tramp			# remote access
	patch-mode		# diffs
	
	autosave file.txt as #file.txt#
	"mode line" = line above echo area
	"echo area" = last line of screen
$ emacs --debug-init	# debugs ~/dotfiles/.emacs.d/init.el (esp. if emacs fails to launch)
