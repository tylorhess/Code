# Slack Tutorials
https://get.slack.help/hc/en-us/categories/200111606-Using-Slack

# shortkeys
(cmd)+k # Quick Switcher (omnisearch)
(cmd)+(up) # edit last message
# blinking cursor (textarea is in focus)
	(up)|(down) # autofill with past messages

# Trello
/invite @trello # adds trello slash commands to any channel
trello.com > [Team Name] > Settings > Slack Team Linking > Add to Slack (button) # associate: Trello Team <-> Slack workspace (many-to-many?)
/trello link [search terms] # set Trello board (per Slack channel)
/trello link [board url]
	/trello link Project Awesome
	/trello link https://trello.com/b/nCQJJoZ/project-awesome
/trello setlist > (click) # set Trello list (per Slack channel)
/trello set-list > (click) 
	/trello setlist 2
/trello [board url] # get Trello board details
/trello [card  url] # get Trello card  details
/trello add [teammates] [card name] # create new Trello card in set Trello list
	/trello add @matt @jessica Finish blog post
/trello assign [teammate1] [teammate2] # assign teammates to Trello card (channel's most recent card)
/trello comment [comment] # add comment to Trello card (channel's most recent card)
/trello set-due [date] # add due date to Trello card (channel's most recent card)
	/trello set-due next Friday at 5pm


# Asana
/asana # adds Asana to this Slack channel
/asana help
/asana settings
	Notifications: ON|OFF
	Default Domain: amigo.app
	Deauthorize Asana from Slack
/asana create # Create New Asana Task
/asana create <task name>
	Task Name
	Assignee    (optional)
	Project     (optional)
	Due Date    (optional)
	Description (optional)
/asana link