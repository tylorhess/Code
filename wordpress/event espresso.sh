# Event Espresso
General Settings
	Organization = company logo, address, email, timezone
	Page = choose event registration, thank you, cancellation, and transaction pages
	Email = payment confirmation and registration confirmation
	Advanced Features
		Optional Event = event default (like default ticket price)
		erCAPTCHA
		License = DO NOT enter support license on development site (only production)
		User Experience Program
Event Overview
	Title
	Unique Event Identifier = [SINGLEEVENT single_event_id="unique_identifier"]
	Add Media (button) = images or from url
	Content Visual = WYSIWYG
	Contetn Text = html
	Event sidebar (right-hand-side)
		Duplicate Event (button)
		View Event (button)
		Attendees (link) = view attendees
		Email Event Attendees (link)
		Delete Event (link)
		Update Event (button)
		Attendee Limit = max number of attendees
		Allow group registrations? = register as a group?
		Max Group Registrants = max group size
		Additional Attendee Registration info? = fill out attendee info fer each group member?
		Is this an active event? = show/hide event page
		Event Status = Public, Waitlist, Ongoing, Draft, Deleted
		Display description? = show/hide event description
		Display registration form? = show/hide registration form
		Default Payment Status for Event = No Change, Incomplete, Pending
		Alternate Registration Page (optional)
		Alternate Email Address (optional)
		Featured Image
		Event Category
		Early Registration Discount
	Event Dates/Times
		Registration Start/End Dates/Times
		Event Start/End Dates/Times
		Add Additional Time (button) = register to a timeslot (via "Choose a time:" dropdown)
		Current Time = choose timezone
	Event Pricing
		Name, Price, Surcharge [dollar or percent]
		Add A Price = choose a price (via "Choose an option:" dropdown)
	Venue Information
		Physical = choose venue from dropdown
		Virtual = enter url or phone number
	Event Meta
		event_hashtag = ???
		event_format = ???
		event_livestreamed = ???
		Add A Meta Box (button)
	Email Confirmation
		pre-existing or custom
Venue Manager = create, view, edit, manage, delete physical venues
Questions = create, view, edit, manage, delete questions to be asked when attendee is registering
Question Groups = group existing questions to be asked when attendee is registering
Categories = create, view, edit, manage, delete event categories
Promotional Codes = create, view, edit, manage, delete promo codes
Email Manager = save pre-drafted emails (to be sent to event participants)
Template 
	Template Options
		Display short descriptions (event listings)?
		Display addresses (event listings)?
		Display the address (registration form)?
		Use the custom post types feature?
		Display an "Add to my Calendar" icon/link (event page)?
		Display featured images (event list and event pages)?
	Stylesheet
		jQuery ThemeRoller or custom style sheet?
	Developer
		copy files from: .../wp-content/plugins/event-espresso/templates/
					 to: .../wp-content/uploads/espresso/templates/ 	  (these files over ride default templates)
		to customize Event Espresso via templates
		file pairs (copy/pate both to edit):
			event_list_display.php & event_list.php
			registration_page_display.php & registration_page.php
			multi_registration_page_display.php & multi_registration_page.php
		css:
			copy/paste: .../css/espresso_default.css
			but first try jQuery ThemeRoller
		shortcodes/functions:
			highly recommend using: custom-files.3.1 plugin
Payment 
	Stripe and 30+ more...
System Status
	Versions = wordpress, event espresso, plugins
	Settings = urls
	Registration Pages = required pages
	Server Environment = php and wp-config.php
	PHP Sessions
	Remote Posting
Help/Support
	Shortcodes
	Important Information
	Quick Links
	Event Marketing Resources


# REQUIRED shortcodes:
[ESPRESSO_EVENTS]		= Event (Registration) Page 		# event page and registration
[ESPRESSO_PAYMENTS]		= Thank You Page					# payment completed page
[ESPRESSO_CANCELLED]	= (Registration) Cancellation Page 	# payment cancelled page
[ESPRESSO_TXN_PAGE]		= Transactions 						# behind-the-scenes

# other shortcodes
[SINGLEEVENT single_event_id="unique_identifier"] = similar to [ESPRESSO_EVENTS]?
[EVENTLIST]
[EVENT_SEARCH] = autocomplete search tool
[ATTENDEE_NUMBERS event_id={ID} type={TYPE}]
	{ID}   = number (or "unique_identifier"?)
	{TYPE} = available_spaces, num_attendees, reg_limit, num_incomplete, num_completed, num_completed_slash_incomplete, num_attendees_slash_reg_limit
	<?php echo do_shortcode('[ATTENDEE_NUMBERS event_id="'.$event_id.'" type="num_attendees"]');?> / <!?php echo do_shortcode('[ATTENDEE_NUMBERS event_id="'.$event_id.'" type="reg_limit"]');?>
[EVENT_PRICE event_id={ID} number=0]
	{ID} = number (or "unique_identifier"?)
	0 	 = first instance of price array (1 = second instance of price array)
	<?php echo do_shortcode('[EVENT_PRICE event_id="'.$event_id.'" number="0"]');?>
[ESPRESSO_REG_PAGE event_id={ID}]
	{ID} = number (or "unique_identifier"?)
	<?php echo do_shortcode('[ESPRESSO_REG_PAGE event_id="'.$event_id.'"]');?>
[CATEGORY_NAME event_id={ID}]
	{ID} = number (or "unique_identifier"?)
	<?php echo do_shortcode('[CATEGORY_NAME event_id="'.$event_id.'"]');?>
[LISTATTENDEES]		# Lists all attendees (and all events because they're grouped by event)
	[LISTATTENDEES limit="30"]				# Number of events to show on the page
	[LISTATTENDEES paid_only="true"]		# Show completed and pending registrations only
	[LISTATTENDEES show_expired="true"]		# Show expired events
	[LISTATTENDEES show_deleted="true"]		# Show deleted events
	[LISTATTENDEES show_secondary="true"] 	# Show secondary/backup events
	[LISTATTENDEES show_gravatar="true"]	# Show a Gravatar of the attendee
	[LISTATTENDEES show_recurrence="false"]	# Exclude recurring events
	[LISTATTENDEES event_identifier="your_event_identifier"] 		# Show a single event using the event identifier
	[LISTATTENDEES category_identifier="your_category_identifier"] 	# Show a group of events in a category using the category identifier
	# example css:
		li.attendee_details{
		    display:block;
		    margin-bottom:20px;
		    background: #ECECEC;
		    border:#CCC 1px solid;}
		.espresso_attendee{ width:400px; padding:5px; }
		.espresso_attendee img.avatar{ float:left; padding:5px; }
		.clear{ clear:both; }
[ESPRESSO_VENUE]
	outside_wrapper_class 	# class name for the outside wrapper. Eg. event_venue
	outside_wrapper 		# outside wrapper element. Eg. div
	inside_wrapper_class 	# class name for the outside wrapper. Eg. venue_details
	inside_wrapper 			# inside wrapper element. Eg. p
	title_class 			# class name for the title Eg. venue_name
	title_wrapper 			# title wrapper element. Eg. h3
	show_title 				# show the venue name? (true|false default true)
	image_class 			# class name for the image. Eg. venue_image
	show_image 				# show the image? (true|false default true)
	show_description 		# show the description? (true|false default true)
	show_address 			# show the address of the venue? (true|false default true)
	show_additional_details # show the additional details? (true|false default true)
	show_google_map_link 	# show the Google map link? (true|false default true)
	map_link_text 			# text to display in the link. Eg. Map and Directions
	show_map_image 			# true|false (default true)
	map_image_wrapper
	map_image_class
	map_w 					# map image width (default 400)
	map_h 					# map image height (default 400)
[ESPRESSO_VENUE_EVENTS id=1] 	# list all events assigned to given venue
[EVENT_ESPRESSO_CATEGORY event_category_id="your_category_indentifier"]
	# alternatively:
	[EVENT_LIST category_identifier=your_category_identifier]
[ESPRESSO_STAFF ...]
	[ESPRESSO_STAFF id="3"] 		# display staff member 3
	[ESPRESSO_STAFF event_id="8"]	# display all staff attending event 8
	outside_wrapper_class 	# class name for the outside wrapper (eg. event_staff)
	outside_wrapper 		# outside wrapper element (eg. div)
	inside_wrapper_class 	# class name for the outside wrapper (eg. event_person)
	inside_wrapper 			# inside wrapper element (eg. p)
	name_class 				# class name for the persons name
	name_wrapper 			# name wrapper element (eg. strong)
	image_class 			# class name for the image (eg. venue_image)
	show_image 				# show the persons image? true|false (default true)
	show_staff_titles 		# show the persons title? true|false (default true)
	show_staff_details 		# show the details? true|false (default true)
	show_staff_roles 		# show the persons role? true|false (default true)
	show_description 		# show the description? true|false (default true)
[EVENT_TIME event_id=1 type=start_date format=F jS]
	event_id = REQUIRED
	type = start_date_time (default), end_date_time, start_time, end_time, start_date, end_date, start_timestamp, end_timestamp
	format = OPTIONAL (reference: http://php.net/manual/en/function.date.php )
[EE_META type='event_meta' name='my_meta_key']
	# to add custom default meta values, add the following to .../wp-content/uploads/espresso/custom_functions.php :
		if (!function_exists('ee_default_event_meta')){
		    function ee_default_event_meta(){
		        return array(
		            "event_hashtag"=>"#eventespresso",
		            "event_format"=>"conference",
		            "event_livestreamed"=>"N"
		        );
		    }
		}





# custom field variables
# get_post_meta = http://codex.wordpress.org/Function_Reference/get_post_meta
<?php
	$event_identifier = get_post_meta($post->ID, 'event_identifier', true);
	$event_id = get_post_meta($post->ID, 'event_id', true);
	$event_start_date = get_post_meta($post->ID, 'event_start_date', true);
	$event_end_date = get_post_meta($post->ID, 'event_end_date', true);
	$event_location = get_post_meta($post->ID, 'event_location', true);
	$event_address = get_post_meta($post->ID, 'event_address', true);
	$event_address2 = get_post_meta($post->ID, 'event_address2', true);
	$event_city = get_post_meta($post->ID, 'event_city', true);
	$event_state = get_post_meta($post->ID, 'event_state', true);
	$event_country = get_post_meta($post->ID, 'event_country', true);
	$event_phone = get_post_meta($post->ID, 'event_phone', true);
	$event_externalURL = get_post_meta($post->ID, 'event_externalURL', true);
	$event_registration_start = get_post_meta($post->ID, 'event_registration_start', true);
	$event_registration_end = get_post_meta($post->ID, 'event_registration_end', true);
?>

########## plugins ##########

# espresso-calendar
Calendar Settings
	Shortcode
		[ESPRESSO_CALENDAR] = insert calendar (display all events)
		[ESPRESSO_CALENDAR event_category_id="your_category_identifier"] = filter by category
		[ESPRESSO_CALENDAR show_expired="true"] = default: hides expired?
		[ESPRESSO_CALENDAR cal_view="month"] = month, basicWeek, basicDay, agendaWeek, agendaDay
	Basic
		Time/Date
		Page = calendar display: height, link to event post or event page, images?
		Theme = css, color, tooltip
	Advanced = calendar header, button, title, column, month/day names, formatting
	Memory Mangement = database throttling, display attendee limit, disable categories 

event categories (custom colors)
		.category-name,
		.category-name a {
		 color: #FFF;
		 border-color: red !important;
		 background-color: red !important;
		}

solution to auto-<p></p>
	[raw][ESPRESSO_CALENDAR][/raw]
	<?php echo do_shortcode('[ESPRESSO_CALENDAR show_expired=false]'); ?>

# espresso-mailchimp
Mailchimp Integration
	Save Mailchimp API Key
Event Overview
	Edit/Add Event
		MailChimp List Integration
			Select list

# espresso-members (wordpress user integration)
configure wordpress:
	Membership > Anyone can register 	# new user = subscriber
	add link to login
	brand login: Login Logo plugin # http://wordpress.org/plugins/login-logo/

Member Settings
	Login page (if different from default Wordpress login page):
	Require login for all events?
	Make autofilled fields editable? # registration auto-fills from database
Event Overview
	Event Pricing
		Member Pricing (vs. Standard Pricing)
	Event sidebar (right-hand-side)
		Member-only event?

[ESPRESSO_MY_EVENTS]
[ESPRESSO_EDIT_PROFILE]

# espresso-multiple (MEP = multiple event registration)
adds "number of tickets" dropdown and cart feature, so they can buy multiple events

# espresso-permissions-basic
User Permissions = choose which Espresso admin sub-pages Event Admins can access
User Roles = chooses which user types can do which things

# espresso-recurring
Event Overview
	Add New Event
		Recurring Event Manager
			is this event recurring? Yes/No

# espresso-groupon
Groupon Codes = create, view, edit, manage, delete Groupon codes
Event Overview
	Event sidebar (right-hand-side)
		Groupon options
			Allow Groupon codes? = use Groupon (via "Enter Voucher Code:")

# espresso-social
Social Media
	Facebook # added to Event (Registration) Page
	Twitter  # added to Event (Registration) Page
	Google+  # added to Event (Registration) Page

# espresso-ticketing (QR ticketing checkin app)
Ticketing Templates
	???

# custom-files.3.1
upload contents to: .../wp-content/uploads/espresso/ 	# do not upload to plugins folder
	custom_includes.php - used to include your custom templates (or any other files you need loaded into the plugin)
	custom_functions.php - place custom functions here
	custom_shortcodes.php - place custom shortcodes here
	/templates/...
