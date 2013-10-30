un: root
pw: root

# phpMyAdmin = manage mysql database
http://localhost/phpMyAdmin/

# reset un/pw
#$ sudo /usr/local/mysql/support-files/mysql.server start	# i did this. i don't think it's necessary
$ sudo /usr/local/mysql/support-files/mysql.server stop
$ sudo mysqld_safe --skip-grant-tables
# open another terminal
$ mysql -u root
>> UPDATE mysql.user SET Password=PASSWORD('password') WHERE User='root';	# change lowercase 'password'
>> FLUSH PRIVILEGES;
>> \q		# or 'exit'