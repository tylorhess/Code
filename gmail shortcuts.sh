
# Sublime: 		OS X Keyboard:
# super (⌘)		command (cmd)
# alt   (⌥)		option
# ctrl  (⌃)		control   
# shift (⇧)		shift
# 		(⇪)		caps lock

# https://support.google.com/mail/answer/6594?hl=en

mute:
	archive this AND FUTURE conversation messages, unless: 
		message is sent directly to you (and no one else)
		you are added to the "To:" or "Cc:" line (when you previously were not?)


###############################
## keyboard shortcuts (enabled)
###############################

# all views
c 			compose new message
shift+C 	compose new message (opens new tab)
#d 			compose new message (opens new tab)
#shift+C 	compose new message (opens new window)
z 			undo (only actions with "undo" link)
/ 			places cursor "Search:"
q 			places cursor chat search
g + i 		goto: inbox
g + a 		goto: archive (all mail)
g + s 		goto: starred
g + t 		goto: sent
g + d 		goto: drafts
g + l 		goto: "label:"
g + c 		goto: contacts
cmd + . 	next chat/compose mini-window # always enabled
cmd + , 	prev chat/compose mini-window # always enabled
shift+esc	focus cursor on main window? unfocus cursor off chat/compose mini-window? # always enabled

# compose view
cmd + shift+C	place cursor "Cc:"	 # always enabled
cmd + shift+B	place cursor "Bcc:"	 # always enabled
cmd + shift+F	place cursor "From:" # always enabled
cmd + enter 	send 				 # always enabled 	# to disable: System Pref > Keyboard > Shortcuts > set something to: cmd + enter
tab + enter		send

# inbox view
`|~		`	toggle between multiple inboxes (if multiple inboxes = enabled)
up    | k 	focus newer  conversation
down  | j	focus older  conversation
enter | o 	open focused conversation
x 			check/uncheck focused conversation
* + a 		check   all
* + n 		uncheck all
* + r 		check all read
* + u 		check all unread
* + s 		check all starred
* + t 		check all unstarred


# inbox view     (checked conversation)
# conversation view (this conversation)
*
e 			archive
m 			mute
d 			delete
#shift+# 	delete
shift+I 	read
shift+U 	unread
! 			spam
s 			star
+ 			important
-			unimportant
v 			move to... (label, trash, or spam) 
l 			apply label...
y 			"in:label"   remove label
			"in:inbox"   archive
			"in:trash"   move to inbox
			"in:starred" unstar


# conversaton view only
k 		goto: newer conversation
j 		goto: older conversation
] 		goto: newer conversation + archive
[ 		goto: older conversation + archive
u 		goto: [back button] (usually inbox)
n 		focus newer message
p 		focus older message
enter 	expand/collapse focused message
r 		reply
a 		reply all
f 		forward
shift+R reply     (opens new window)
shift+A reply all (opens new window)
shift+F forward   (opens new window)




