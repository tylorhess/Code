#!/bin/bash

# git = tool for managing multiple versions of code at the same time (Directed Acyclic Graph)
# commit = snapshot of project (code, files, ...) at a particular point in time
#		   try to avoid committing things like compressed files (zips, rars, jars), compiled code (object files, libraries, executables), database backups, and media files (flv, psd, music, movies)
# branch = post-it note attached to a node (i.e. - master)
# HEAD   = points to active branch
# remote = (clone remote, or create remote "$ git push -u RemoteName branchName" for first time)

#################### once per computer ####################
$ git config --global user.name "Tylor Hess"		# --local (per project) --global (per computer/home directory) --system
$ git config --global user.email "tylor@mit.edu"
$ git config --global core.editor "subl -w" 		#$ git config --global core.editor emacs


#################### once per project ####################

######### forking #########
# forking (github: click "Fork" button)
#	1. "copy" repository (to my github account) and do as I wish, OR
#	2. personally-owned copy of a repository (that I don't have direct write access to), 
#		so I can make meaningful commits (on a named branch) and offer them back to the original author (through "pull request")

########## check ssh ##########
$ ssh -T git@github.com	# check to see if we have access
# if not
	$ cd ~
	$ ssh-keygen -t rsa -C "tylor@mit.edu"	# generates ssh keys: ~/.ssh/id_rsa.pub, ~/.ssh/id_rsa (private?)
	[ENTER]
	[ENTER]
	[ENTER]
	$ cat .ssh/id_rsa.pub	# copy/paste to github.com/settings/ssh
	# tells github that any machine with this public key is valid

########## sync local to remote ##########
# if new repository
	VISIT: https://github.com/new 	# executes `$ git init` on github.com
CHECK: ssh		# (above)
$ cd ~/myrepo
$ git init 		# initialize empty git repository for current directory: ~/myrepo and creates: ~/current_directory/.git/
$ git remote add origin git@github.com:tylorhess/myrepo.git			# ssh (adds remote "origin" to local .git/config)
	#$ git remote add origin https://github.com:tylorhess/myrepo.git	# ssh
	#$ git remote add origin https://github.com/tylorhess/myrepo.git	# https (annoying: prompts username & password every time)
	$ cat .git/config	# see that remote was added to the .git directory (holds all the meta data for repo)
$ git push -u origin master	# pushes the "master" branch to "origin" remote (-u = "set upstream"; sets up tracking so you can `$ git pull` and `$ git push` without any extra arguments and git will know what to do)
	# if still prompts for username and password, which means you used (incorrect) https `$ git remote add origin https://github.com/tylorhess/myrepo.git`
	$ git remote set-url origin git@github.com:user/repo.git	# switches from using HTTPS to SSH

######### cloning #########
# I (or somebody else) made an online repository (that I have write access to?), but I don't have a local copy
# step 1: check ssh (above)
cd ~/parentDirectory
# git clone https://github.com/username/reponame.git	# downloads/creates repo locally in current directory
git clone git@github.com:username/reponame.git			# downloads/creates repo locally in current directory
cd reponame
git checkout -b newBranch		# RECOMMENDED: create and checkout newBranch (assuming our purpose is to: "make meaningful commits on a named branch")
# modify files
git push -u origin newBranch	# (-u for first push; sets up tracking) pushes the "newBranch" branch to "origin" remote 
	# if prompts for username and password
	git remote set-url origin git@github.com:user/repo.git	# switches from using HTTPS to SSH
	git push origin master	# to check 

########## first commit (locally) ##########
$ touch README.md 				# git strongly encourages a README.md file
$ git add README.md 			# README.md staged for commit
$ git commit -m "first commit"

#################### regular use ####################

($ touch file.txt)			# 1. untracked file (file isn't yet part of git version control)
($ git add file.txt)		# 2. now, the file is tracked  (Note: git is "opt-in", so you must explicitly add each file)
($ git pull)				# 3. download (pull) any changes submitted to github.com (remote)
$ git commit -am "msg"		# 4. commit file (locally) = take a snapshot of file(s) (save changes)
$ git push					# 5. commit file (remotely) = upload (push) changes to github.com (remote)

######### git add #########
# only `$ git add` file(s) the first time, so they're tracked (`$ get commit -a -m "msg"` thereafter)
# git is "opt-in" = you must explicitly add each file (elect to have each file participate in git version control)
$ git add file.txt 					# file.txt is "staged for a commit"
$ git add file1.txt file2.txt ...	# add multiple files
$ git add .							# add all files (except files/patterns in .gitignore???)

$ git status						# show newly added files or previously added ("tracked") files that have been modified

$ git diff file.txt					# prints file showing difference between local & committed file.txt
$ git diff --color					# color

######### git pull #########
#$ git pull [remote-name] [branch-name]
$ git pull origin master			# pull & merge remote changes
# origin = remote
# master = branch

# if upstream is set (`$ git push -u origin master`), simply:
$ git pull

######### git commit (local commit) #########
$ git add file.txt
$ git commit -m"msg"	# commits with message "msg"
#---------- same as ----------#
$ git commit -a -m"msg"	# "-a" adds (only files already tracked) and commits with message "msg"
$ git commit -am "msg"
# Note: "msg" should be in the "present tense" (describes what the commit does)

$ git log				# show log of all commits
$ git log -p --color	# log + differences & color

######### git push (remote commit) #########
#$ git push [remote-name] [branch-name]
$ git push origin master			# commit changes (remotely)
$ git push heroku master
# origin = remote
# master = branch

$ git push -u origin master		# first time only (-u = "set upstream" = sets up tracking so you can `$ git pull` and `$ git push` without extra arguments: [remote-name] [branch-name])
# thereafter:
$ git push

######### git rm #########
$ git rm file.txt 			# removes (un-adds) file.txt from git repository AND deletes local version
$ git rm --cached file.txt 	# removes (un-adds) file.txt from git repository and caches it (does not delete it)

######### .gitignore #########
# changes to .gitignore'd files are not tracked (in git version control)
# but the files themselves are STILL PUSHED
# ignore things like: compressed files (zips, rars, jars), compiled code (object files, libraries, executables), database backups, and media files (flv, psd, music, movies)
$ echo "file.txt" >> .gitignore			# ignore file
$ echo "/db/*.sqlite3" >> .gitignore	# ignore pattern (all *.sqlite3 files in db folder)
$ subl .gitignore

$ git config --global core.excludesfile '~/.gitignore_global'	# 

######### git checkout & branch #########
# Which branch am I on?		newBranch
$ git branch
	  master
	* newBranch
# alternatively:
#	$ git status | head -1`			# first line of `git status` command

# Switch from current branch to "branchName" (modifies, adds, removes files)
$ git checkout branchName

# Revert back to last save point (commit)   (i.e. - I messed up my local, working repository, but haven't committed.)
$ git checkout -f 	# -f = force overwrite current changes

# Create new branch and switch to it (check it out)
$ git checkout -b newBranchName
# alternatively:
#	$ git branch newBranchName			# create new branch off current branch
#	$ git checkout newBranchName		# switch to (checkout) newBranchName
$ git push -u origin newBranch			# (-u for first push; sets up tracking) pushes the "newBranch" branch to "origin" remote

#$ git branch newBranch HEAD~2		# create new branch off HEAD (2 commits ago)
#$ git branch newBranch RELEASE_2.0	# create new branch off release tag name

# Delete branch
$ git branch -d deleteMeBranch	# only deletes branches that have been merged into other branches
$ git branch -D deleteMeBranch	# deletes un-merged branches

######### git merge (local) #########
$ git checkout -b newBranch # create new branch "newBranch"
$ subl file.txt				# change/modify any file in "newBranch"
$ git commit -am "msg"		# commit changes
# merge "newBranch" into "master" branch
$ git checkout master		# switch to "master" branch
$ git merge newBranch 		# merge "newBranch" into "master" branch
# if there's a conflict
		CONFLICT (content): Merge conflict in file.txt
		Automatic merge failed; fix conflicts and then commit the result.
	$ git status 
		...
		both modified: file.txt
		...
	$ subl file.txt
		...
		<<<<<<< HEAD		# delete
			Name: Tylor		# choose/change/delete
		=======				# delete
			Name: John		# choose/change/delete
		>>>>>>> newBranch	# delete
		...
	$ git add file.txt		# REQUIRED: explicitly tells git you've merged both file.txts
	$ git commit			# if you leave out the message (-m"msg"), it will autopopulated and open in default text editor (save and close)
# delete "newBranch" (if you no longer need it)
$ git branch -d newBranch


######### git fetch & merge (remote) #########
$ git fetch RemoteName	# pulls in changes (remote configuration) without modifying code
# Then, you may have to merge


######### pull request #########
# offer "newBranch" branch on github.com/tylorhess/reponame to "master" (or other branch) on original author's github.com/username/reponame
# I am "requesting" that he "pull" my changes (thus, "pull request")

######### git reset (rewind) #########
git reset --hard HEAD~1		# rewind to 1 commit ago
git reset --hard ee32762	# rewind back to hash ee32762
git reset --soft HEAD~1 	# undo `git commit` command, but leave files as they are

######### misc git #########
git ls-tree [SHA-1]		# lists (ls) files in a get (branch?); get [SHA-1] from log
git cat-file -p [SHA-1]	# cat file; get [SHA-1] from git ls-tree
$ git config --global alias.co checkout		# now `$ git co` == `$ git checkout`
