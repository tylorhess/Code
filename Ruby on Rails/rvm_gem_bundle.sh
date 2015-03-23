########## rvm ##########
# rvm installs ruby and ruby gems (like: rails, devise, PostgreSQL, ...)
# rvm installs/manages different versions of ruby and ruby gems
# alternatively: rbenv (instead of rvm; NOT simultaneously)

$ rvm help
$ rvm gemset help

# install rvm
$ curl -L https://get.rvm.io | bash -s

# if rvm is installed, make sure it's up-to-date
$ rvm get stable

# install requirements for rvm
$ rvm requirements
	# it should tell you what to do
	$ brew ...			Homebrew (OS X)
		$ brew install libtool libxslt libksba openssl
		$ brew install libyaml
	$ port ...			MacPorts (OS X)
	$ apt-get ...		(Linux)
	$ yum ...			(Linux)

# list all known/available (online) versions of ruby
$ rvm list known

# install ruby
#$ rvm install 1.9.3
#$ rvm install 2.0.0
$ rvm install 2.0.0 --with-openssl-dir=/opt/local/etc/openssl

# list all local versions
$ rvm list
	#rvm rubies
	#	   ruby-2.0.0-head [ x86_64 ]
	#	=* ruby-2.0.0-p247 [ x86_64 ]
	#			=> - current
	#			=* - current && default
	#			* - default
$ rvm use <ruby-version>
#$ rvm use ruby-2.0.0-p247
$ rvm use <ruby-version>@<gemset-name>
#$ rvm use 2.0.0@railstutorial_rails_4_0
$ rvm use <ruby-version>@<gemset-name> --default
#$ rvm use 2.0.0@railstutorial_rails_4_0 --default
#		--default	sets `railstutorial_rails_4_0` as default
#					so any new terminal uses ruby 2.0.0, gemset railstutorial_rails_4_0
#					good practice to include rails version # in gemset name

# gemset = (ruby 4.0, rails 3.2, devise 2.1, ...) = collection of gems 
#	global gemset = available everywhere (to any app)
#	user-generated gemset = only available when "activated"

# create new gemset
$ rvm gemset create <gemset-name>
#$ rvm gemset create ruby2rails4 	# good practice to include rails version # in gemset name
#---------- same as ----------#
$ rvm use <ruby-version>@<gemset-name> --create --default
#$ rvm use 2.0.0@railstutorial_rails_4_0 --create --default
#		--create	creates gemset named `railstutorial_rails_4_0`
#		--default	sets `railstutorial_rails_4_0` as default

# list all (local) gemsets
$ rvm gemset list
#	   (default)
#	   global
#	=> ruby2rails4
$ rvm gemset use default
#$ rvm gemset use ruby2rails4

# list all gems installed in active gemset (i.e. - ruby2rails4)
$ rvm gem list
	# *** LOCAL GEMS ***
	# actionmailer (4.0.0)
	# ...
	# bundler (1.3.5)
	# bundler-unload (1.0.1)
	# coffee-rails (4.0.0)
	# coffee-script (2.2.0)
	# coffee-script-source (1.6.3)
	# ...
	# jquery-rails (3.0.4)
	# json (1.8.0, 1.7.7)
	# ...
	# rails (4.0.0)
	# railties (4.0.0)
	# rake (10.1.0, 0.9.6)
	# rdoc (4.0.0, 3.12.2)
	# rubygems-bundler (1.2.2)
	# rvm (1.11.3.8)
	# ...
	# sqlite3 (1.3.7)
	# ...
	# uglifier (2.1.2)

########## Gem ##########
# install gem onto current gemset
$ gem install <gem-name>			# `gem` is automatically included in rvm
#$ gem install rails -v 4.0.0
#$ gem install pg --version '0.12.0'	# postgreSQL
#$ gem install ...

$ gem update 				# updates all installed gems
$ gem update --system		# updates `gem` itself 
$ gem update --system 2.0.3	# installs version 2.0.3 of `gem`

########## .gemrc config file ##########
$ cd ~/Code/Ruby on Rails/app_name
$ subl .gemrc
	install: --no-rdoc --no-ri
	update:  --no-rdoc --no-ri
														########## .rvmfc file ########## (looks here first)
														# every application/project should have its own gemset
														# use .rvmrc file to switch between applications' gemsets 
														# place ".rvmrc" file in application root ("rails root")
														$ cd ~/Code/Ruby on Rails/app_name
														$ subl .rvmrc
															rvm use ruby-2.0.0-p247
															rvm gemset use myapp_ruby2rails4

														# alternatively: http://ryan.mcgeary.org/2011/02/09/vendor-everything-still-applies/
														$ cd ~/Code/Ruby on Rails/app_name
														$ subl .rvmrc
															rvm use ruby-2.0.0-p247
															#rvm gemset use myapp_ruby2rails4	# now, .rvmrc file (thus ruby version #) can be included in github
														$ bundle install --path vendor
														# now, all gems will be unpacked into .../app_name/vendor/ruby/ directory
														$ echo 'vendor/ruby' >> .gitignore	# gitignore that new folder
														# removes the need for every application to have its own gemset (without having to mess with default gemset)
														# Bundler completely isolates gems from the system (guaranteeing a clear set of dependencies)

														########## .ruby-version .ruby-gemset config files ########## (looks here second)
														$ cd ~/Code/Ruby on Rails/app_name
														$ subl .ruby-version
															2.0.0-p247
														$ subl .ruby-gemset
															myapp_ruby2rails4	#railstutorial_rails_4_0

########## Gemfile & Bundler ##########
# Note: Just use Gemfile (not .rvmrc, .ruby-version, .ruby-gemset)
first_app/Gemfile
	source 'https://rubygems.org'
	ruby '2.0.0-p247'						# (looks here third)
	#ruby-gemset=railstutorial_rails_4_0	# (looks here third)
	gem 'rails', '4.0.0'
	gem 'sqlite3'
	gem 'sass-rails', '~> 4.0.0'
	gem 'uglifier', '>= 1.3.0'
	...

	gem gem-name 				# installs latest version
	gem gem-name version-number	# installs version `version-number`
		version:
			'>= 1.3.0' (i.e. - 7.2.0)
			'~> 4.0.0' (>= 4.0.0 && < 4.1.0)

# after editing Gemfile
$ bundle update
$ bundle install
$ bundle install --without production	# installs without any gems in the production group

# Note: include Gemfile.lock into version control
