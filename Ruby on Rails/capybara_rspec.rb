########## rspec ##########
# RSpec = "request spec" = integration test

# initial configuration
$ subl spec/spec_helper.rb
		RSpec.configure do |config|
		  ...
		  config.include Capybara::DSL
		end

# rspec command line
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

$ bundle exec rspec spec/requests/static_pages_spec.rb 	# runs static_pages_spec.rb & files in: .../sample_app/spec/support/
$ bundle exec rspec spec/requests/						# runs files in .../sample_app/spec/requests/ & .../sample_app/spec/support/
$ bundle exec rspec spec/								# runs all files in .../sample_app/spec/
$ bundle exec rake spec 	# same as: `$ rspec spec/` (but requires test database)
$ bundle exec rake 			# defaults to: `$ rake spec`
# eliminate `$ bundle exec ...` using rvm: http://ruby.railstutorial.org/chapters/static-pages#sec-eliminating_bundle_exec
$ rspec spec/requests/static_pages_spec.rb 	# runs static_pages_spec.rb & files in: .../sample_app/spec/support/
$ rspec spec/requests/						# runs files in .../sample_app/spec/requests/ & .../sample_app/spec/support/
$ rspec spec/								# runs all files in .../sample_app/spec/
$ rake spec		# same as: `$ rspec spec/` (but requires test database)
$ rake 			# defaults to: `$ rake spec`

########## fail-implement-pass ##########
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
# Failed (No route matches [GET] "/static_pages/about")
$ subl config/routes.rb
# edit
$ bundle exec rspec spec/requests/static_pages_spec.rb
# Failed (The action 'about' could not be found for StaticPagesController)
$ subl app/controllers/static_pages_controller.rb
# edit
$ bundle exec rspec spec/requests/static_pages_spec.rb
# Failed (Missing template static_pages/about, application/about ... "~/Code/Ruby on Rails/sample_app/app/views")
$ subl app/views/static_pages/about.html.erb
# edit
$ bundle exec rspec spec/requests/static_pages_spec.rb
# Passed



########## Capybara with RSpec ##########
# https://github.com/jnicklas/capybara

$ subl spec/requests/static_pages_spec.rb
		require 'spec_helper'			# see above: .../sample_app/spec/spec_helper.rb
		describe "Static pages" do
			subject { page }			# maybe: sets "it"?
			...
			describe "About page" do
				before { visit about_path }	# executes `visit about_path` before each `it ...`
				it should have_content('About Us')
				it ...
			end
		end

########## rspec methods? ##########

# subject (may break if too complicated)
subject { page } 	# maybe: sets "it"?
result = page.evaluate_script('4 + 4');

# it
it "should have the content 'About Us'" do
	expect(page).to have_content('About Us')
end
#---------- same as ----------#
it should have_content('About Us')

# should / should_not
it should
it should_not
it should have_content('Contact')
it should have_title(full_title('Contact'))
it should have_selector('h1', text: 'Contact')
it should respond_to(:email)
it should be_valid

# let (set variable)
let(:varName) {'value'}		# varName = 'value'
	it should have_content(varName)	# no colon

# shared examples (mixin)
shared_examples_for "all static pages" do
	# code
end
...
	it_should_behave_like "all static pages"	# executes code (above)

subject { @user }
  it { should respond_to(:name) }	# user.name
  it { should respond_to(:email) }	# user.email

########## capybara methods ##########

# Asynchronous JavaScript (ajax)
# 	capybara waits (default 2 sec) before failling to find an element/complete a task
Capybara.default_wait_time = 5	# set wait time to 5 seconds
# 	if (at any point) it finds what it's looking for, it returns true, even if it later changes
#Capybara.automatic_reload = true 	# default
Capybara.automatic_reload = false 	# if you don't like default behavior

# exact matching
#Capybara.exact = false		# default = false
click_link("Password") # also matches "Password confirmation"
Capybara.exact = true
click_link("Password") # does not match "Password confirmation"

# visit (always GET request)
visit('/projects')
visit(post_comments_path(post))	
current_path.should == root_path

# click 
click_link('id-of-link')
click_link('Link Text')
click_button('Save')
click_on('Link Text') # clicks on either links or buttons
click_on('Button Value')

# forms
fill_in('First Name', :with => 'John')
fill_in('Password', :with => 'Seekrit')
fill_in('Description', :with => 'Really Long Text...')
choose('A Radio Button')
check('A Checkbox')
uncheck('A Checkbox')
attach_file('Image', '/path/to/image.jpg')
select('Option', :from => 'Select Box')

# querying
	# capybara
	page.has_selector?('table tr')
	page.has_selector?(:xpath, '//table/tr')
	page.has_xpath?('//table/tr')
	page.has_css?('table tr.foo')
	page.has_content?('foo')
	# rspec
	page.should have_selector('table tr')
	page.should have_selector(:xpath, '//table/tr')
	page.should have_xpath('//table/tr')
	page.should have_css('table tr.foo')
	page.should have_content('foo')

# finding	# `find` will wait for an element to appear on a page (ajax)
find_field('First Name').value
find_link('Hello').visible?
find_button('Send').click
find(:xpath, "//table/tr").click
find("#overlay").find("h1").click
all('a').each { |a| a[:href] }
	# once found, you can run more capybara on element
	find('#navigation').click_link('Home')
	find('#navigation').should have_button('Sign out')

# within specified scope (finds first element, not all elements)
within("li#employee") do
  fill_in 'Name', :with => 'Jimmy'
end
within(:xpath, "//li[@id='employee']") do
  fill_in 'Name', :with => 'Jimmy'
end

# scripts
page.execute_script("$('body').empty()")

# save page for debugging
save_and_open_page
print page.html			# prints DOM as string to page.html
page.save_screenshot('screenshot.png')	# if driver supports it

# sessions
require 'capybara'
session = Capybara::Session.new(:webkit, my_rack_app)
session.within("//form[@id='session']") do
  session.fill_in 'Login', :with => 'user@example.com'
  session.fill_in 'Password', :with => 'password'
end
session.click_link 'Sign in'
