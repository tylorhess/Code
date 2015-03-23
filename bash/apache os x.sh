# Turn on apache
	#System Preferences > Sharing > Personal Web Sharing
	sudo launchctl load -w /System/Library/LaunchDaemons/org.apache.httpd.plist
	# OR
	sudo apachectl start
	sudo apachectl stop

# http://localhost/
/Library/WebServer/Documents/...

# http://localhost/~<username>
/Users/tylor/Sites/...
		   ~/Sites/...
	subl /etc/apache2/users/<username>.conf
		<Directory "/Users/<username>/Sites/">
		Options Indexes Multiviews
		AllowOverride AuthConfig Limit
		Order allow,deny
		Allow from all
		</Directory>
	sudo apachectl restart