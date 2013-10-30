########## Chapter 1 ##########

rails development shops
	ENTP
	thoughtbot
	pivotal labs
	hashrocket

gems = self-contained solutions to specific problems
	pagination
	image upload

# application root (aka - "rails root")
~/rails_projects/application_name/
	config/routes.rb		~/rails_projects/application_name/config/routes.rb

# Ruby Version Manager (rvm)
see: rvm_gem_bundle.sh

########## New App ##########
$ rails new first_app
	first_app/app/			models, views, controllers, and helpers (core app code)
			 /app/models/
			 /app/views/
			 /app/controllers/
			 /app/assets/	css, js, img, ...
			 /bin/			binary executable files
			 /config/		application configuration files
			 /db/			databse files
			 /doc/			documentation files
			 /lib/			library modules
			 /lib/assets/	library assets (css, js, img, ...)
			 /log/			application log files
			 /public/		data accessable to the public (i.e. - error pages)
			 /script/rails/	a script for generating code, opening console sessions, or starting a local server
			 /test/			OBSOLETE (now: /spec/ directory)
			 /tmp/			temp files
			 /vendor/		third-party code (plugins, gems, ...)
			 /vendor/assets/ css, js, img, ...
			 README.rdoc 	a brief description of the app
			 Rakefile		utility tasks available via `$ rake ...` command
			 Gemfile		gem requirements for this app
			 Gemfile.lock 	a list of gems used to ensure that all copies of the app use the same gem versions
			 config.ru 		config file for Rack middleware
			 .gitignore		patterns for all files that should be ignored by git
	bundle install

########## Bundler ##########
see: rvm_gem_bundle.sh

########## Server ##########
$ rails server
#---------- same as ----------#
$ rails s
	localhost:3000
	ctrl+c to kill

########## MVC ##########
generic (wikipedia):
	model (data) --> view (represents data visually) --> user sees view --> user input --> controller sends commands --> model or view
	model changes --> view updates

rails
	browser -request-> controller -renders-> view --> controller -response-> browser
	browser -request-> controller -updates-> model
	browser -request-> controller -updates-> model --> controller -updates-> view --> controller -response-> browser

	only controller request/response with browser
	only controller talks to view
	only controller talks to model
	only controller talks to talks to database

########## git init ##########
$ git init

########## .gitignore ##########
	# default:
	/.bundle 				# bundler config
	/db/*.sqlite3 			# default SQLite database
	/db/*.sqlite3-journal	# default SQLite database
	/log/*.log 				# logfiles
	/tmp 					# tempfiles
	# recommended:
	database.yml
	doc/
	*.swp
	*~
	.project
	.DS_Store
	.idea
	.secret

########## git ##########
$ git add . 	# add everything except .gitignore
$ git commit -m "initial commit"
# github.com/new --> myrepo
$ git remote add origin git@github.com:tylorhess/myrepo.git
$ git push -u origin master

########## deploying to Heroku ##########
$ bundle install --without production	# updates Gemfile.lock for Heroku
$ rake assets:precompile 				# creates files Heroku needs to serve static assets (images, css, js, ...)
$ git add . 	# i think you need this line because new assets are not tracked
$ git commit -a -m "update Gemfile.lock, compile assets"
$ heroku login
$ heroku create		# creates empty subdomain.herokuapp.com
$ git push heroku master

########## demo_app ##########
$ cd ~/Code/Ruby on Rails
$ rails new demo_app
$ cd demo_app
$ subl Gemfile
		source 'https://rubygems.org'
		ruby '2.0.0'
		#ruby-gemset=railstutorial_rails_4_0
		gem 'rails', '4.0.0'
		group :development do
		  gem 'sqlite3', '1.3.8'
		end
		gem 'sass-rails', '4.0.0'
		gem 'uglifier', '2.1.1'
		gem 'coffee-rails', '4.0.0'
		gem 'jquery-rails', '3.0.4'
		gem 'turbolinks', '1.1.1'
		gem 'jbuilder', '1.0.2'
		group :doc do
		  gem 'sdoc', '0.3.20', require: false
		end
		group :production do
		  gem 'pg', '0.15.1'
		  gem 'rails_12factor', '0.0.2'
		end
$ bundle install --without production
#	Your bundle is complete!
#	Gems in the group production were not installed.
$ bundle update
#	Your bundle is updated!
#	Gems in the group production were not installed.
$ bundle install
#	Your bundle is complete!
#	Gems in the group production were not installed.
$ subl .gitignore
		# Ignore bundler config.
		/.bundle
		# Ignore the default SQLite database.
		/db/*.sqlite3
		/db/*.sqlite3-journal
		# Ignore all logfiles and tempfiles.
		/log/*.log
		/tmp
		# Ignore other unneeded files.
		database.yml
		doc/
		*.swp
		*~
		.project
		.DS_Store
		.idea
		.secret
$ git init
$ git add .
$ git commit -m "Initial commit"
$ git remote add origin git@github.com:tylorhess/demo_app.git
$ git push -u origin master
# user model
	id:integer
	name:string
	email:string
# microposts model
	id:integer
	content:string
	user_id:integer
$ rails generate scaffold User name:string email:string 	# "User" (capital & singlar), automatically adds id:integer (primary key)
$ bundle exec rake db:migrate 		# updates database with "users" (lowercase & plural)
	# run "rake" using "bundle" to ensure it uses "rake" found in Gemfile
	# omit "bundle exec" when using rvm (instead of Gemfile)
$ rails s 		#$ rails server
VISIT: localhost:3000/users
	/users			index	list all users
	/users/1		show	show user with id 1
	/users/new		new		make a new user
	/users/1/edit	edit	edit user with id 1
# MVC
1. browser --/users request--> router (config/routes.rb)
2. router --index action--> controller (users_controller.rb)
3. controller --User.all--> model (user.rb)
4. model --users table--> database
5. database --users table--> model
6. model --User.all--> controller
7. controller --@users--> view (index.html.erb)
8. view --HTML--> controller
9. controller --HTML--> browser
# actions in app/controller/users_controller.rb
GET		/users			index		page to list all users
GET		/users/1		show		page to show user with id 1
GET		/users/new		new			page to make a new user
POST	/users			create		create a new user
GET		/users/1/edit	edit		page to edit user with id 1
PATCH	/users/1		update		update user with id 1
DELETE	/users/1		destroy		delete user with id 1
# app/controllers/users_controller.rb
class UsersController < ApplicationController
	# "index" action, resulting from: 2. router --index action--> controller (users_controller.rb)
	def index
		# @users = instance variable "users"
		# when defined here, automatically available in the view (app/views/users/index.html.erb)
		@users = User.all
	end
end
# app/views/users/index.html.erb
<h1>Listing users</h1>
<table>
  <tr>
    <th>Name</th>
    <th>Email</th>
    <th></th>
    <th></th>
    <th></th>
  </tr>
<% @users.each do |user| %>
  <tr>
    <td><%= user.name %></td>
    <td><%= user.email %></td>
    <td><%= link_to 'Show', user %></td>
    <td><%= link_to 'Edit', edit_user_path(user) %></td>
    <td><%= link_to 'Destroy', user, method: :delete,
                                     data: { confirm: 'Are you sure?' } %></td>
  </tr>
<% end %>
</table>
<br />
<%= link_to 'New User', new_user_path %>
# weaknesses of User generated using scaffold
	no data validation	(invalid email?)
	no authentication	(signin?)
	no tests
	no layout
	no understanding
# microposts
$ rails generate scaffold Micropost content:string user_id:integer
$ bundle exec rake db:migrate		# "rake" generally means "execute script"
# app/models/micropost.rb
class Micropost < ActiveRecord::Base
  validates :content, length: { maximum: 140 }
end
$ rails s
VISIT: localhost:3000/microposts
# relationships (join tables)
# app/models/user.rb
class User < ActiveRecord::Base
	has_many :microposts	# lowercase & plural (because has_many)
end 
# app/models/micropost.rb
class Micropost < ActiveRecord::Base
  belongs_to :user 			# lowercase & singluar (because belongs_to)
  validates :content, length: { maximum: 140 }
end
# rails console
$ rails console
>> first_user = User.first
>> first_user.microposts
>> exit
# deploying demo_app
$ git add .
$ git commit -m "Finish demo app"
$ git push
$ heroku create
$ rake assets:precompile
$ git add . 	# i think you need this line because new assets are not tracked
$ git commit -a -m "Add precompiled assets for Heroku"
$ git push heroku master
$ heroku run rake db:migrate	# migrate the production database (PostgreSQL)

########## Chapter 3 ##########
$ cd ~/parent_directory
$ rails new sample_app --skip-test-unit		# --skip-tezt-unit tells rails not to generate test directory (we'll use RSpec instead)
$ cd sample_app
$ subl Gemfile
		source 'https://rubygems.org'
		ruby '2.0.0'
		#ruby-gemset=railstutorial_rails_4_0
		gem 'rails', '4.0.0'
		gem 'bootstrap-sass', '2.3.2.0'
		gem 'bcrypt-ruby', '3.0.1'
		gem 'faker', '1.1.2'
		gem 'will_paginate', '3.0.4'
		gem 'bootstrap-will_paginate', '0.0.9'
		group :development, :test do
		  gem 'sqlite3', '1.3.8'
		  gem 'rspec-rails', '2.13.1'
		  # The following optional lines are part of the advanced setup.
		  # gem 'guard-rspec', '2.5.0'
		  # gem 'spork-rails', '4.0.0'
		  # gem 'guard-spork', '1.5.0'
		  # gem 'childprocess', '0.3.6'
		end
		group :test do
		  gem 'selenium-webdriver', '2.35.1'
		  gem 'capybara', '2.1.0'
		  gem 'factory_girl_rails', '4.2.0'
		  gem 'cucumber-rails', '1.4.0', :require => false
		  gem 'database_cleaner', github: 'bmabey/database_cleaner'
		  # Uncomment this line on OS X.
		  gem 'growl', '1.0.3'
		  # Uncomment these lines on Linux.
		  # gem 'libnotify', '0.8.0'
		  # Uncomment these lines on Windows.
		  # gem 'rb-notifu', '0.0.4'
		  # gem 'win32console', '1.3.2'
		  # gem 'wdm', '0.1.0'
		end
		gem 'sass-rails', '4.0.0'
		gem 'uglifier', '2.1.1'
		gem 'coffee-rails', '4.0.0'
		gem 'jquery-rails', '3.0.4'
		gem 'turbolinks', '1.1.1'
		gem 'jbuilder', '1.0.2'
		group :doc do
		  gem 'sdoc', '0.3.20', require: false
		end
		group :production do
		  gem 'pg', '0.15.1'
		  gem 'rails_12factor', '0.0.2'
		end
# RSpec - unit testing (installed with 'rspec-rails' because 'rspec-rails' depends on RSpec)
# 'capybara' (Capybara) - programmatically simulate a sequence of user interactions 
# 'selenium-webdriver' (Selenium) - Capybara depends on Selenium
# 'pg' (PostgreSQL) - Heroku database
# 'rails_12factor' - compile static content
$ bundle install --without production
$ bundle update
$ bundle install #--without production is remembered, so we don't have to type it every time
$ subl .gitignore
		# Ignore bundler config.
		/.bundle
		# Ignore the default SQLite database.
		/db/*.sqlite3
		/db/*.sqlite3-journal
		# Ignore all logfiles and tempfiles.
		/log/*.log
		/tmp
		# Ignore other unneeded files.
		database.yml
		doc/
		*.swp
		*~
		.project
		.DS_Store
		.idea
		.secret
# MAKE SURE: $ echo ".secret" >> .gitignore
$ subl config/initializers/secret_token.rb
		require 'securerandom'
		def secure_token
		  token_file = Rails.root.join('.secret')	# path .../sample_app/.secret
		  if File.exist?(token_file)				# if .secret file exists
		    # Use the existing token.
		    File.read(token_file).chomp				# .chomp = remove \n, \r, and \r\n from beginning and end of string
		  else
		    # Generate a new token and store it in token_file.
		    token = SecureRandom.hex(64)
		    File.write(token_file, token)
		    token
		  end
		end
		SampleApp::Application.config.secret_key_base = secure_token
		#SampleApp::Application.config.secret_key_base = "askfhbsaifb..."
# configure rails to use RSpect instead of Test::Unit
$ rails generate rspec:install
$ git init
$ git add .
$ git commit -m "Initial commit"
$ subl README.rdoc
		# Ruby on Rails Tutorial: sample application
		This is the sample application for
		the [*Ruby on Rails Tutorial*](http://railstutorial.org/)
		by [Michael Hartl](http://michaelhartl.com/).
$ git mv README.rdoc README.md
$ git commit -am "improve the README"
VISIT: github.com/new
$ git remote add origin git@github.com:tylorhess/sample_app.git
$ git push -u origin master
# deploy to Heroku
$ heroku create tylor-sample-app
$ rake assets:precompile
$ git add . 	# I think we need this to add sample_app/public/assets/application-4ab8e... and sample_app/public/assets/application-f1a14...
$ git commit -a -m "Add precompiled assets for Heroku"
$ git push heroku master
$ heroku run rake db:migrate
# push & deploy regularly
		$ git push
		$ git push heroku
		$ heroku run rake db:migrate
$ git checkout -b static-pages
$ rails generate controller StaticPages home help --no-test-framework	# "--no-test-framework" suppresses the generation of default RSpec tests
# automatically generates:
# 	config/routes.rb
#		SampleApp::Application.routes.draw do
#			get "static_pages/home"		#--> StaticPagesController.home
#			get "static_pages/help"		#--> StaticPagesController.help
#		end
#	app/controllers/static_pages_controller.rb
# 		class StaticPagesController < ApplicationController
# 			def home
# 			end		#--> home.html.erb
# 			def help
# 			end		#--> help.html.erb
# 		end
# 	app/views/static_pages/home.html.erb
# 		<h1>StaticPages#home</h1>
# 		<p>Find me in app/views/static_pages/home.html.erb</p>
# 	app/views/static_pages/help.html.erb
# 		<h1>StaticPages#help</h1>
# 		<p>Find me in app/views/static_pages/help.html.erb</p>

# Test-Driven Development (TDD) --> Behavior-Driven Development (BDD)
# fail-implement-pass = write test first, then implement code (increase confidence that test tests code)
# RSpec = "request spec" = integration test
$ rails generate integration_test static_pages
# automatically generates:
# 	spec/requests/static_pages_spec.rb
# 		require 'spec_helper'
# 		describe "StaticPages" do
# 			describe "GET /static_pages" do
# 				it "works! (now write some real specs)" do
# 					# Run the generator again with the --webrat flag if you want to use webrat methods/matchers
# 					get static_pages_index_path
# 					response.status.should be(200)
# 				end
# 			end
# 		end
$ subl spec/spec_helper.rb
		RSpec.configure do |config|
		  ...
		  config.include Capybara::DSL
		end
$ subl spec/requests/static_pages_spec.rb
		spec/requests/static_pages_spec.rb
		require 'spec_helper'
		describe "Static pages" do
		  describe "Home page" do
		    it "should have the content 'Sample App'" do
		      visit '/static_pages/home'
		      expect(page).to have_content('Sample App')
		    end
		  end
		  describe "Help page" do
		    it "should have the content 'Help'" do
		      visit '/static_pages/help'
		      expect(page).to have_content('Help')
		    end
		  end
		end
$ bundle exec rspec spec/requests/static_pages_spec.rb
#	Failed
$ subl app/views/static_pages/home.html.erb
		<h1>Sample App</h1>
		<p>
		  This is the home page for the
		  <a href="http://railstutorial.org/">Ruby on Rails Tutorial</a>
		  sample application.
		</p>
$ subl app/views/static_pages/help.html.erb
		<h1>Help</h1>
		<p>
		  Get help on the Ruby on Rails Tutorial at the
		  <a href="http://railstutorial.org/help">Rails Tutorial help page</a>.
		  To get help on this sample app, see the
		  <a href="http://railstutorial.org/book">Rails Tutorial book</a>.
		</p>
$ bundle exec rspec spec/requests/static_pages_spec.rb
#	Passed
# add a page using fail-implement-pass
$ subl spec/requests/static_pages_spec.rb
		require 'spec_helper'
		describe "Static pages" do
			...
			describe "About page" do
				it "should have the content 'About Us'" do
					visit 'static_pages/about'
					expect(page).to have_content('About Us')
				end
			end
		end
$ bundle exec rspec spec/requests/static_pages_spec.rb
#	Failed (No route matches [GET] "/static_pages/about")
$ subl config/routes.rb
		SampleApp::Application.routes.draw do
			...
			get "static_pages/about"
		end
$ bundle exec rspec spec/requests/static_pages_spec.rb
#	Failed (The action 'about' could not be found for StaticPagesController)
$ subl app/controllers/static_pages_controller.rb
		class StaticPagesController < ApplicationController
			...
			def about
			end
		end
$ bundle exec rspec spec/requests/static_pages_spec.rb
#	Failed (Missing template static_pages/about, application/about ... "~/Code/Ruby on Rails/sample_app/app/views")
$ subl app/views/static_pages/about.html.erb
		<h1>About Us</h1>
		<p>
		  The <a href="http://railstutorial.org/">Ruby on Rails Tutorial</a>
		  is a project to make a book and screencasts to teach web development
		  with <a href="http://rubyonrails.org/">Ruby on Rails</a>. This
		  is the sample application for the tutorial.
		</p>
$ bundle exec rspec spec/requests/static_pages_spec.rb
#	Passed
# slightly dynamic title using fail-implement-pass
$ mv app/views/layouts/application.html.erb foobar	# temporarily application.html.erb --> foobar (autogen'd by `$ rails new`)
$ subl spec/requests/static_pages_spec.rb
		describe "Static pages" do
			let(:base_title) {"Ruby on Rails Tutorial Sample App"}		# let base_title = "Ruby on Rails Tutorial Sample App"
			describe "Home page" do
				...
				it "should have the right title 'Home'" do
				  visit '/static_pages/home'
				  expect(page).to have_title("#{base_title} | Home")	# base_title + " | Home"
				end
			end
			describe "Help page" do
				...
				it "should have the right title 'Help'" do
				  visit '/static_pages/help'
				  expect(page).to have_title("Ruby on Rails Tutorial Sample App | Help")
				end
			end
			describe "About page" do
				...
				it "should have the right title 'About Us'" do
				  visit '/static_pages/about'
				  expect(page).to have_title("Ruby on Rails Tutorial Sample App | About Us")
				end
			end
		end
$ bundle exec rspec spec/requests/static_pages_spec.rb
#	Failed x3
$ subl app/views/static_pages/home.html.erb
#	edit
$ subl app/views/static_pages/help.html.erb
#	edit
$ subl app/views/static_pages/about.html.erb
#	edit
$ bundle exec rspec spec/requests/static_pages_spec.rb
#	Passed
$ mv foobar app/views/layouts/application.html.erb		# bring it back
# application.html.erb is the "layout file" for static_pages
$ subl app/views/layouts/application.html.erb
		<!DOCTYPE html>
		<html>
		<head>
		  <title>Ruby on Rails Tutorial Sample App | <%= yield(:title) %></title>
		  <%= stylesheet_link_tag    "application", media: "all", "data-turbolinks-track" => true %>
		  <%= javascript_include_tag "application", "data-turbolinks-track" => true %>
		  <%= csrf_meta_tags %>
		</head>
		<body>
		<%= yield %>		# inserts page-specific content 
		</body>
		</html>
$ subl app/views/static_pages/home.html.erb
		<% provide(:title, 'Home') %>
		<h1>Sample App</h1>
		<p>
		  This is the home page for the
		  <a href="http://railstutorial.org/">Ruby on Rails Tutorial</a>
		  sample application.
		</p>
$ subl app/views/static_pages/help.html.erb
		# same as Home
$ subl app/views/static_pages/about.html.erb
		# same as Home
$ bundle exec rspec spec/requests/static_pages_spec.rb
#	Passed
$ git add .
$ git commit -m "Finish static pages"
# merge static-pages branch into master branch
$ git checkout master
$ git merge static-pages
$ git push
$ git push heroku
# helper functions
$ subl app/helpers/application_helper.rb
		module ApplicationHelper
			...
		end

# embedded ruby 
<%= link_to "text", 'link', optional: "hash", id:"myId" %>	# <%= link_to "text", 'link', {optional: "hash", id:"myId"} %>
	<a href="link" id="myId">text</a>

# add a line to make bootstrap-sass compatible with the asset pipeline
# config/application.rb
module SampleApp
  class Application < Rails::Application
  	...
    config.assets.precompile += %w(*.png *.jpg *.jpeg *.gif)
  end
end

# install Bootstrap
# all stylesheets in .../sample_app/app/assets/stylesheets/ automatically included in url.com/assets/application.css
$ subl app/assets/stylesheets/custom.css.scss 	# ".css.scss" --sass-precompiler--> ".css"
		@import "bootstrap";	# includes entire Boostrap CSS framework


