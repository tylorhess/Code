keyboard shortcuts
	ctrl + a 	# start of line
	ctrl + e	# end of line
	opt + <--	# back one word (opt + b)
	opt + f		# forward one word
	ctrl + r	# search previous commands with autocomplete; "reverse search"
	sleep &		# run command in background
	ctrl + z	# pause; "suspended background process" 
	fg			# resume
	del			# delete char before cursor
	fn + del	# delete char after cursor
	ctrl + w	# delete word before cursor
	ctrl + u	# cut everything before cursor
	ctrl + k	# cut (kill) everything after cursor
	ctrl + y	# paste (yank) from kill ring
	ctrl + t	# swap two char (before cursor)
	opt + t		# swap two words (before cursor) 
	
	ctrl + c	# kill running process: ^C
	ctrl + d	# exit ("exit")
	ctrl + l	# clear screen ("clear" OR com + k)
	<-- (left)	# back one char (ctrl + b)
	--> (right)	# forward one char (ctrl + f)
	/\ (up)		# previous command (ctrl + p)
	\/ (down)	# next command
	tab			# autocomplete word
	tab + tab	# list possible autocomplete options

characters
	\			# escape character (single character strong quote)
	echo '$HOME    `pwd`'	# strong quote 
	> $HOME    `pwd`
	echo "$HOME    `pwd`"	# weak quote
	> /home/ubuntu    /home/ubuntu/genome

OS X/Linux (line feed, LF, \n, ^J, ASCII 10) vs Windows CR+LF (carriage return + line feed, CR+LF, \r\n, ^M^J, ASCII 13 + 10)

# zoom in/out
command + '+'
command + '-'

# shortcut for start of line
ctrl + a
# shortcut for end of line
ctrl + e

# mouse click middle of line
option + click

# autocomplete (only when there's one option)
tab
# list autocomplete options
tab + tab

# clear screen
command + k

# Shells
# shells can be nested within each other (i.e.- you can call a shell from a shell)
sh				# Bourne Shell (1977)
csh				# C Shell
tcsh			# Tabbed C Shell
ksh				# Korn Shell
bash			# Bourne-Again Shell
zsh				# Z Shell
echo $SHELL		#outer-most/original/first shell
echo $0			#current shell

# bash variables (NOT persistent after close/exit terminal)
VARIABLE_NAME="Hello World"
echo $VARIABLE_NAME
> Hello World

# bash function
function echoName {
> echo 'tylor hess'
> }

# set (prints all variables & functions persistent with Terminal)
set

# env show environment variables
env 

# & (run process in background)
sleep 60 &		# process sleep runs for 60 seconds in the background
ctrl + z		# pause; "suspended background process" 
fg				# resume

# Manual Pages
man
man echo
man -k #same as apropos
# Apropos
apropos
apropos banner

# current directory
.
# parent directory
..

# UNIX escape character is backslash '\'

# present working directory
pwd

# list directory
# note: '-' is file, 'd' is directory, 'l' link/shortcut/alias
ls 
ls -ahl
ls -a	# show all files (including hidden files that the finder hides... config files)
ls -h	# list directory with file size
ls -l	# list directory (vertical)
ls -r	# reverse the sort order
ls -t	# sort by time

# alias (key shortcut)
# file: ~/.bash_profile (persistent aliases, OS X)
alias 					# list all aliases
alias ll='ls -alrth'
alias rm='rm -i'

# change directory (case sensitive)
cd
cd Library/Preferences
cd ..		 # go to parent (back arrow)
cs ../..	 # go to parent's parent
cd /		 # go to root (harddrive... C: in Windows)
cd /Users
cd ~		 # go to user folder (tylor)
cd ~/Desktop
cd ~/Movies
cd -		 # previous directory (works like previous channel)
cd $HOME

# find files
find fileOrfolderName
locate fileOrfolderName

# UNIX file organization (hidden in Finder)
/      # root
/bin   # binaries (unix programs, not Photoshop)
/sbin  # system binaries/programs 
/dev   # devices (HD, keyboard, mouse, etc.)
/etc   # system config
/home  # user home (default pwd, and where user files are located)
/lib   # libraries of code
/tmp   # temporary files
/var   # "various"/miscellaneous files the system uses
/usr   # where user-specific programs are installed
/usr/bin...

# MAC file organization
/Applications		# mac (non-unix) programs
/Library			# mac (non-unix) libraries of code 
/Network			# networked devices
/System 			# Mac OS X
/Users				# "home"
.DS_Store			# folder view options, icon positions, etc.
# dot files (files that start with a '.') are special (hidden)
# file endings are not required (but helpful)

# Text Editors
vim
emacs
nano
subl

# concatenate (read & output first file, read & output second file, etc.)
cat
cat file.txt
cat file1.txt file2.txt ...
cat file1.txt - 		# "-" = stdin
cat - file1.txt

# head/tail (rows)
head file.txt		# first 10 lines
head -5 file.txt	# first 5 lines
head -n5 file.txt	# first 5 lines
tail file.txt		# last 10 lines
tail -5 file.txt	# last 5 lines
tail -n+3 file.txt	# lines 3 and beyond

# cut (columns)
cut -f3 | head		# column 3 (first 10 rows)
cut -f3,5 | head	# columns 3 and 5 (first 10 rows)
cut -f3-5 | head	# columns 3-5 (first 10 rows)
cut -d','			# delimiter ',' (default = [TAB])
cut -c1-20			# characters 1-20

# paste (columns)
# paste columns side-by-side (default: [TAB] delimited)
tail -n+3 *ptt | cut -f1 > locs
tail -n+3 *ptt | cut -f5 > genes
paste genes locs | head
>	Location	Gene
	190..255	thrL
	337..2799	thrA
	2801..3733	thrB
	3734..5020	thrC
	5234..5530	yaaX
	5683..6459	yaaA
	6529..7959	yaaJ
	8238..9191	talB
	9306..9893	mog

more # paginated text (space bar can only go forwards)
less # paginated text (but can go backwards)
	:[SPACE] # next page
	:f		# "forward" or next page
	:b		# "back" or previous page
	:g		# go to file start
	:G 		# go to file end

# General Terminal pagination commands
:f or :[SPACE]	# forward
:b				# backwards 
:q				# quit
	
# make directory (folder?)
mkdir
mkdir oldDirectory/directoryName.txt
mkdir -p newDirectory/directoryName.txt # create parents (as needed)	

# make file 
touch
touch file_c

# move file or directory
mv
mv -n	# no overwriting of files
mv -f	# [DEFAULT] force overwriting
mv -i	# "interactive" = ask me whether I want to overwrite (the best option)
mv -v	# verbose
mv -nv	# it tells you "not overwritten" (otherwise you aren't informed if something isn't overwritten)
mv filename.txt directory/newFileName.txt
mv existingFile.txt ~/Desktop/existingFileNewName.txt
# note: if you don't include new file name, it will preserve the same name (assuming you provide a valid, existing directory)
mv fileName.txt renamed.txt

# copy files and directories
cp
cp source.txt newFile.txt
cp -n	# no overwriting of files
cp -f	# [DEFAULT] force overwriting
cp -i	# "interactive" = ask me whether I want to overwrite (the best option)
cp -v	# verbose
cp -nv	# it tells you "not overwritten" (otherwise you aren't informed if something isn't overwritten)
cp -R	# allows you to copy directories (recursively)

# remove a file (NOT Trash... ~/.Trash)
rm filename.txt			# only removes files
rm -R directoryName		# files and directories recursively

# remove directory
rmdir directoryName		# only removes an empty directory

# aliases (Mac Finder), links (unix), shortcuts (Windows)

# hard links
ln original.txt hardlink.txt
# note: hardlink.txt points to the same harddrive file as original.txt, so if you delete original.txt, hardlink.txt still works

# symbolic link "sym link"
ln -s original.txt hardlink.txt
# note: tracks file directory (not file)... if dile moves, sym link breaks (unlike alias, which tracks file)

# search
find path expression
find ~/Documents -name "something.jpg"
find ~/Sites -name *.html

# which user am I?
whoami

# which groups am I in?
groups

# change ownership of file or directory
chown
chown tylor:staff filename.txt
chown user:group filename.txt
chown user filename.txt			# just change user 
chown :group filename.txt		# just change group
chown user:group directory
chown user:group -R directory	# recursively replace everything within it

# change permissions (mode)
chmod 
chmod <mode> <file-or-directory>
chmod ugo=rwx filename.txt
chmod a=rwx filename.txt
chmod u=rwx,g=rw,o=r filename.txt
chmod ug+w filename.txt
chmod o-r filename.txt
chmod ugo+rw filename.txt
chmod a+rw filename.txt
chmod -R a=rwx ~/directory # chmod folder & all subfolders (recursively)

# root user can do ANYTHING
# root user is disabled by default in Mac OS X

# become root
su			# become superuser (cd ~ = /var/root, instead of /Users/tylor) (whoami = "root" instead of "tylor")
exit		# exit su like exit ssh
su username # switch to another user who is not the superuser

# sudo "superuser do..." (become superuser ONLY for this command)
sudo		# lasts 5 minutes (can set to a different duration)
sudo -k		# kills 5 min session 
sudo -u Jon	# execute command as if you are user Jon
# not every can do sudo, only admins

# commands
# all commands are located in /bin 
# typing echo is the same as /bin/echo, because command echo simply executes the /bin/echo file

# $PATH is a colon-separated list of file paths to locate commands to execute (reads left to right)
$PATH
/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:/usr/X11/bin

# set $PATH (only lasts for current session)
PATH=/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:/usr/X11/bin

# where is a command located?
whereis echo
which echo

# General commands -v --version --help
# exit: q, x, control + q, control + x, ESC
# force quit: control + c
# semicolon betwen commands
echo Hello; echo World!

# System Commands

# Date
date

# time since the computer was booted
uptime

# users logged in
users	# unique users
who		# all users, includes repeats

# uname 

# hostname & domain name
hostname
domainname

# disk (harddrive)
df	-h	# free space (humanized) base 2, "-H" = base 10
du		# disk usage (humanized)

# processes
ps		# process snapshot
ps -a	# all process snapshot
ps aux	# a = all, u = show users, x = background processes (without dash, relic of history)

# dynamic (not static/snapshot) processes
top		# top processes, default: sorted by id (most recent) 
:q		# exit

# stop processes
best: control + c 	# asssuming it's running in terminal
weak: kill 1837		# 1837 = process ID
good: kill -9 1837	# force kill

# wc
wc		# word count (lines, words, bytes)
wc -l	# only number of lines
wc -L	# length of longest line

# sort
sort	# sort lines
sort -r # reverse order
sort -R # random order

# uniq
uniq	# filter out repeated lines
uniq -c	# shows count (# of times a unique line repeats)

# split (good for parallel processing)
split -d -l 1000 file subfile
ls subfile*
	subfile00
	subfile01
	subfile...	# each file has 1000 lines (except last)

# calendar
cal
ncal

# unit conversion
units

# calculator "bench calculator"
bc
expr

# echo
echo "no new line"
echo -e "line \n new line"	# -e allows new lines (\n)

# bash history, ~/.bash_history	# written to this file when bash is closed
history		# live history
!-4			# runs the forth command back
!492		# runs the 492nd command back
!expr		# runs the most-recent command that starts with 'expr'
sudo !-2	# can be run with other commands
!$			# references arguments
cat !$		# refences arguments from previous command (in this case, a path/filename.txt)

# default: stdin, stdout, stderr
[keyboard] --(0)stdin--> [program] --(1)stdout--> [display]
							\--------(2)stderr------^ 

# > (stdout --> new file)
cat filename.txt > newfile.txt		# replaces file with the output of the left side
cat filename.txt 1> newfile.txt		# same

# >> (stdout --> append to file)
cat filename.txt >> appendFile.txt	# appends filename.txt to the bottom of existingFile.txt
cat filename.txt 1>> appendFile.txt	# same

# 2> (stderr --> new file)
# terminal usually shows stdout & stderr (unless piped somewhere else using >, >>, 2>, 2>>, |, etc.)
# stderr is error/log messages
# stdout is command/program output
curl fakeurl 2> newFile.txt

# 2>> (stdout --> append to file)
curl fakeurl 2>> appendFile.txt

# < (file's content --> stdin)
# stdin from file's content (instead of keyboard)
sudo -S < my_password.txt
sort < fruit.txt

# stdin stdout stderr
curl fakeurl &> newFile.txt		# both (stdout + stderr) --> new file
curl fakeurl &>> appendFile.txt	# both (stdout + stderr) --> append to file
curl google.com fakeurl > stdout.txt 2> stderr.txt
curl < url_list.txt > stdout.txt 2> stderr.txt		# command (sudo/echo/wc) stdin (< my_password.txt) stdout (> newfile.txt)

# piping (command --> command; NOT files)
# from stdout of comm1 into stdin of comm2, and so on...
comm1 | comm2 				# comm1's stdout --piped into--> comm2's stdin
cat fruit.txt | sort | uniq	# sidenote: same as "sort < fruit.txt | uniq"
cat fruit.txt | sort | uniq > unique_sorted_fruit.txt # output to file

# $(...) (stdout --> arguments/parameters)
comm1 $(comm2)		# comm2 stdout --> comm1 arguments/parameters
echo $(ls)

#  `...` (stdout --> arguments/parameters)
comm1 `comm2`		# comm2 stdout --> comm1 arguments/parameters
echo `ls`

# "(...) |" (multiple stdout --> stdin)
(comm1; comm2) | comm3		# concatenate (comm1 stdout + comm2 stdout) into comm3 stdin
(cat fruit.txt; ls) | sort

# xargs (stdin --> arguments/parameters) solution to error: "Arguments too long"
xargs comm1		# comm1 stdin --> comm1 arguments/parameters
xargs echo		# echos keyboard input (default stdin)... WARNING: keyboard input never terminates

# "| xargs" (stdout --> arguments/parameters)
comm1 | xargs comm2	# comm1 stdout --> comm2 arguments/parameters
ls | xargs echo 	# Note: because echo doesn't take stdin (otherwise, we'd simply use "ls | echo")

# "xargs ... <" (file's content --> arguments/parameters)
xargs comm1 < file.txt
xargs echo < fruit.txt	# Again: because echo doesn't take stdin (otherwise, we'd simply use "cat fruit.txt | echo")

# tee (passthrough stdin --> stdout, but output to file)
ls | tee ls.txt | grep .ptt		# saves stdout of 'ls' command to ls.txt

# bash script (arguments/parameters --> stdin OR arguments/parameters OR ...)
File: bashscript.sh
	#!/bin/bash
	echo "num arguments entered: $#"	# $# = number of arguments
	echo "first name: $1"				# $1 = 1st argument, $2 = 2nd argument, ...
	echo "last name: ${2:-NO_LAST_NAME}"# if ($2 exists) {$2} else {"NO_LAST_NAME"}
$ ./bashscript.sh tylor hess
> num arguments entered: 2
> first name: tylor
> last name: hess

# "dev/null" == null stdout
ls -la > /dev/null

# tar "tape archive" (archive); gzip (compress) 
tar -cvf newFile.tar ~/srcFolder/	# create newFile.tar (archived)
gzip newFile.tar 					# replace newFile.tar with newFile.tar.gz (compressed)
tar -xzvf newFile.tar.gz			# extract "srcFolder" from newFile.tar.gz and save to current directory

# Global Reglar Expression ("regex") Print > g/re/p > grep
# GNU Regular Expression Parser
grep [OPTIONS] [PATTERN] [FILE]
[OPTIONS] = -l -i -e ...
[PATTERN] = "search"
[FILE] (default: stdin, if left blank)
	*.txt		ends with ".txt"
	a*			starts with 'a'
	tyl?r - 	any tyl_r
	tyl[eo]r	tylor OR tyler 
	tyl[!e]r	any tyl_r except tyler
	[a-cx-z] = [abcxyz] ( if searching for '-', it must be the first or last character)
	file{1,2,3} = file1, file2, file3

grep search file file2	# returns the line(s) with "apple" (case sensitive)
grep -R search ~/dir	# (recursively) search directory 
grep -i search file		# case insensitive
grep -w search file		# whole word matches
grep -v search file		# lines that DO NOT match
grep -n search file		# provides line numbers
grep -c search file		# returns an integer (the count)
grep -l search file		# print filenames (that contain "search"), NOT lines

# sed (find/replace)
sed s/old/new/
sed 's/old/new/' (recommended)
sed -i 's/old/new/' sameFile.txt		# find/replace/save sameFile.txt
sed -i.bak 's/old/new/' sameFile.txt	# sameFile.txt.bak (backup) 
sed 's/old/new/' <oldFile >newFile
sed 's/old/new/g'	# global search (default is first occurrence)
sed 's/\/usr\/local/\/common\/bin/'	# replace "/usr/local" with "common/bin" ('\' escape character)
sed 's|/usr/local|/common/bin|'	# replace "/usr/local" with "common/bin"
sed -r		# use regular expressions	

# awk (manage comma/tab/... delimited files)
awk -F'\t'	# tab delimited
awk -F','	# comma delimited
awk -F'\t' '{print $1, $3, $3 + 5}'	# print column1, column3, and [value(column3) + 5]

# rsync (better than scp)
# synchronize local/remote files
# rsync better than scp (because handles slow/weak connection better)
rsync -avp file{1,2,3}.txt anotherFile.txt ... awseast:~/
rsync -avpr folder user@url.com:~/folder/ # -r = recursive (all files/folders and sub-files/sub-folders)

# securely transfer files between two computers
scp <from> <to>
scp ~/localFile.txt url.com:~/
scp ~/localFile.txt url.com:~/changeName.txt

# ssh
ssh tylor@sktech7.mit.edu
tylor@SKTECH7:~$
tylor@SKTECH7:~$ logout

#ssh config (~/.ssh/config)
mkdir -p ~/.ssh
chmod 700 ~/.ssh
cp ~/Downloads/amazon_key.pem ~/.ssh/
nano ~/.ssh/config
	Host awshost1							# alias name
	HostName ec2-...amazonaws.com			# domain name
	User ubuntu								# username
	IdentityFile "~/.ssh/amazon_key.pem"	# (Amazon) .pem key
# now typing "ssh awshost1" = "ssh -i ~/.ssh/amazon_key.pem ubuntu@ec2-...amazonaws.com"

ssh awshost1
scp ~/hello.txt awshost1:~/

# wget http/https/ftp (recursive crawl robot/spider)
wget http://url.com		# saves index.html to current directory (.)
wget -k http://url.com	# convert links = from remote (http://url.com/blah) to local (./blah)
wget -m http://url.com	# mirroring = recursion (infinite depth) & time-stamping
wget -km http://url.com	# download entire domain locally

# curl (GET and POST API calls)
curl url.com

# screen
screen		# open screen program
	ctrl + t + ?	# show key bindings
	ctrl + t + c	# create new tab
	ctrl + d		# delete tab ("exit")
	ctrl + t + j	# tab forward
	ctrl + t + u	# tab backwards
	ctrl + t + 0-9	# go to tab number [0-9]
	ctrl + t + [	# copy/edit mode
		ctrl + SPACE	# exit/abort copy mode
		/\		# up (ctrl + p)
		\/		# down (ctrl + n)
		-->		# right (ctrl + f)
		<--		# left (ctrl + b)
		SPACE		# start highlight (set mark)
		>			# end highlight (incl. highlighted char) & copy (to buffer: /tmp/screen-exchange)
	ctrl + t + ]	# paste from buffer
screen -d		# "detach" from screen 
screen -r		# resume screen session
screen -r [pid]	# if multiple screens; i.e. - [pid] = 3585

### access athena ###
ssh athena.dialup.mit.edu -l tylor
ssh tylor@athena.dialup.mit.edu

### restart Apache ###
sudo apachectl restart	# or toggle System Preferences > Sharing > Web Sharing

# show/hide hidden files
defaults write com.apple.finder AppleShowAllFiles TRUE/FALSE	# shows/hide hidden files
killall Finder									# restarts Finder (applying changes)

# set default text editor globally
export EDITOR='subl -w'		# Subime Text (-w will cause the subl command to not exit until the file is closed)
export EDITOR='mate -w'		# TextMate
export EDITOR='gvim -f'		# gVim
export EDITOR='mvim -f'		# MacVim
export EDITOR='emacs'		# emacs























### Samba Install ###

# email Victor to ask him to add/create user
adduser username

# set up password-less authentication

? enable root user by giving it a password (or change password if root is already enabled)
sudo passwd

# become superuser ("cd ~; pwd" = /var/root, instead of /Users/tylor)
su
Password:
pwd			# should be '/var/root/'
cd ~		# if you aren't already at '/var/root/'

# create public key (type RSA)
ssh-keygen -t rsa	# accept all defaults (including empty passphrase)
[ENTER]
[ENTER]
...
cat .ssh/id_rsa.pub

# securely transfer the public key (id_rsa.pub) to server
scp .ssh/id_rsa.pub user@sktech7.mit.edu:my_id
user@sktech7.mit.edu's password: 

# connect to server
# ssh into server as user
ssh user@sktech7.mit.edu
user@sktech7.mit.edu's password: 

# add public key to authorized users
cd ~				# if not already there
mkdir .ssh			# if does not yet exist
cat my_id >> .ssh/authorized_keys
nano .ssh/authorized_keys

exit

# verify password-less authentication
ssh sktech7.mit.edu
exit 

# configure a virtual network loopback 

# open /etc/ssh_config in nano
sudo nano /etc/ssh_config

# edit /etc/ssh_config to say:
Host sktech7
	HostName sktech7.mit.edu
	User username
	ServerAliveInterval 200
	ServerAliveCountMax 3
	LocalForward 127.0.0.2:139 127.0.0.1:139
	LocalForward 127.0.0.2:445 127.0.0.1:445

# tunnel between my computer and itself so we can encrpyt using ssh
# ifconfig = network config
# lo = loopback
# alias = virtual (not hardware)
# up = "turn on"
sudo ifconfig lo0 127.0.0.2 alias up
password: <computer sudo/login password>

	# open another terminal
	
	# ssh to sktech7
	sudo ssh sktech7
	
	# keep running while sktech is mounted...

# make sktech folder
mkdir -p /Volumes/sktech

# mount sktech7.mit.edu's samba to local /Volumes/sktech/
mount -t smbfs //username:password@127.0.0.2/sktech/ /Volumes/sktech/

# copy sktechconnect folder to ~/Desktop/

# change mode to allow mnt_cmd to execute
chmod u+x mnt_cmd








### Setting up PHP & MySQL on OS X 10.7 Lion ###	http://akrabat.com/php/setting-up-php-mysql-on-os-x-10-7-lion/
With OS X 10.7, Apple continues to ship PHP 5.3 with PEAR, GD and PDO_MYSQL out of the box. This is how to set it up from a clean install of 10.7.

# /usr/local

Ensure that the following directories exist:

sudo mkdir /usr/local/include
sudo mkdir /usr/local/bin
sudo mkdir /usr/local/lib
sudo mkdir -p /usr/local/man/man1

# MySQL

Download the 64bit DMG version of MySQL 5.1.x (or 5.5.x) for OS X 10.6 from mysql.com and install the pkg, the startup item and the pref pane.
Add /usr/local/mysql/bin to the path: vim ~/.bash_profile and add:
export PATH=~/bin:/usr/local/bin:/usr/local/mysql/bin:$PATH
export EDITOR=vim
at top of file. (Note that we set EDITOR whilst we are here so that svn is happy!)

Set up MySQL root password:
mysqladmin -u root password {new-password}
mysqladmin -u root -p{new-password} -h localhost password {new-password}
mysqladmin -u root -p{new-password} reload
Clear the history file by typing history -c so that {new-password} isn't in plain text on the disk.

Now ensure that the mysql.sock file can be found by PHP:
Ensure that MySQL is running
sudo mkdir /var/mysql
sudo ln -s /tmp/mysql.sock /var/mysql/mysql.sock

# Apache

cd /etc/apache2
Give write permission the config file to root: sudo chmod u+w httpd.conf
sudo vim httpd.conf
Find #LoadModule php5_module libexec/apache2/libphp5.so and remove the leading #
Find AllowOverride None within the <Directory "/Library/WebServer/Documents">section and change toAllowOverride All so that .htaccess files will work.
Change permissions back: sudo chmod u-w httpd.conf
Restart Apache by unticking and then ticking again the Web Sharing checkbox in System Preferences -> Sharing
Open Finder and navigate to /Library/WebServer/Documents/ using shift+cmd+g
Create a new folder called "orig" and place all files currently in the Documents folder into it. (note that it will ask for your password as the Documents folder is only writable by root.
Create a new file called info.php with <?php phpinfo(); inside it.
Use Safari to navigate to http://localhost/info.php and check that the PHP version is displayed (5.3.6 at the time of writing).

# php.ini

cd /etc
sudo cp php.ini.default php.ini
sudo chmod ug+w php.ini
sudo chgrp admin php.ini
vim php.ini (assuming your user is a member of the admin group) and change settings appropriately. Change:
error_reporting  =  E_ALL | E_STRICT
display_errors = On
html_errors = On
extension_dir = "/usr/lib/php/extensions/no-debug-non-zts-20090626"
(I like to see my xdebug errors in bright orange!)
Also, change all instances of /var/mysql/mysql.sock to /tmp/mysql.sock

# Xdebug

Can't have a PHP development environment without xdebug! Apple appears to agree as Lion ships with it.

vim /etc/php.ini
Find the line:
;zend_extension="/usr/lib/php/extensions/no-debug-non-zts-20090626/xdebug.so"
and remove the semicolon at the start
If you want to configure your xdebug settings, then scroll to the end of the file and look for the [xdebug] section. I like these settings:
xdebug.var_display_max_children = 999
xdebug.var_display_max_data = 99999
xdebug.var_display_max_depth = 100
(use with caution…)

Restart apache: sudo apachectl restart and check in the phpinfo that xdebug is now loaded.

# PEAR

We need PEAR! For some reason, it's not set up ready to on Lion, but the install phar file is here, so we just need to run it.

cd /usr/lib/php
sudo php install-pear-nozlib.phar
Edit/etc/php.ini and find the line: ;include_path = ".:/php/includes" and change it to:
include_path = ".:/usr/lib/php/pear"
sudo pear channel-update pear.php.net
sudo pecl channel-update pecl.php.net
sudo pear upgrade-all

# PHPUnit and friends

I assume that everyone needs these…

sudo pear channel-discover pear.phpunit.de
sudo pear channel-discover components.ez.no
sudo pear channel-discover pear.symfony-project.com
sudo pear install phpunit/PHPUnit
sudo pear install phpunit/phpcpd
sudo pear install PHP_CodeSniffer

# PECL OAuth

A couple of projects I work on use the PECL OAuth component:

Ensure you have installed Xcode from the Mac App Store
Download the latest PCRE source code from http://sourceforge.net/projects/pcre/files/pcre/ and unzip to a folder on your desktop
cd ~/Desktop/pcre-8.12
./configure
sudo cp pcre.h /usr/include/
Remove the pcre folder on your desktop as you don't need it any more
sudo pecl install oauth
Edit/etc/php.ini add these lines to the end of the file:
[oauth]
extension="/usr/lib/php/extensions/no-debug-non-zts-20090626/oauth.so"
Restart apache: sudo apachectl restart and check in the phpinfo that OAuth is now loaded.

# mcrypt

This is useful! Follow the installation details by Michale Gracie here: http://michaelgracie.com/2011/07/21/plugging-mcrypt-into-php-on-mac-os-x-lion-10-7/)

It all works on this machine, anyway :)

# Other options

If you'd rather use a packaged version, then these are two alternatives:

PHP 5.3 for OS X as binary package
Zend Server CE