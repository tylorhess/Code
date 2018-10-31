backbone.js = Model View Controller (MVC)
	// Model (represents view)
	var model = new Backbone.Model({
		name: ''							// model.name = '';
	});
	// View (visualizes model)
	model.on('change:name', function(){
		$('span').html(model.get('name')); 	// <span>{{model.name}}</span>
	});
	// Controller (changes model based on user input)
	$('input').on('keyup', function(){		 // input.onkeyup(function() {
		model.set('name', $('input').val()); // 	model.name = input.val()
	});										 // }

index.html
	Router ("/", "/edit/:id", "/new")
		View(s) (List Users ("/"), Edit User ("/edit/:id"))
			Model(s) || Collection(s)
				RESTful server (GET, POST, PUT, DELETE)



////////// Router //////////
// routes (urls) are for 
//		remembering the page state
//		preserving the history of the page
//		correct page loads with "refresh"
var Router = Backbone.Router.extend({	// class Router extends Backbone.Router
	routes: {
		''				: 'home'	// url.com --> .home()
		'edit/:id'		: 'oneVar'	// url.com/#/edit/<id> --> .oneVar(urlID)
		':var1/:var2'	: 'twoVar'	// url.com/#/<var1>/<var2> --> .twoVar(var1, var2)
		'download/*path': 'download'// url.com/#/download/<path> --> .download(urlPath) ... useful b/c path may contain '/'
		':var/*theRest': 'functn'	// url.com/#/<var>/<theRest> --> .functn(var1, theRest)
	},
	home: function () {
		view.render();
	},
	oneVar: function (urlID) {
		var urlVariables = { id:urlID };
		view.render(urlVariables);
	},
	twoVar: function (var1, var2) {
		var urlVariables = { a:var1, b:var2 };
		view.render(urlVariables);
	},
	download: function (urlPath) {
		var urlVariables = { path:urlPath };
		view.render(urlVariables);
	},
	functn: function (var1, theRest) {
		var urlVariables = { a:var1, path:theRest };
		view.render(urlVariables);
	}
});
var router = new Router();
//router.on(				// router.on(<event>, <function>);
//	'route:<name>',			// event: route 'name' (above)
//	function(<param(s)>) {	// function: with :var & *theRest parameters
//		view.render();		// generally: .render() a view
//	}
//);

// History
Backbone.history.start();	// enables history for "single page app"



////////// View //////////
// <div id="searchView"></div>	// default (if `el:` is NOT specified)
<div id='search'></div>

// HTML to be inserted into <div id='search'></div>
<script type="text/template" id="search-template">
	<form>
		<label><%= label %></label>
		<input type="text" id="search-input" name="query"/>
		<input type="submit" id="search-button" value="Search" />
	</form>
</script>

SearchView = Backbone.View.extend({
	//el: '#search'		// alternative way to define `el`
	//$el: $('#search')	// maybe?
	initialize: function() {
		// this.render();
	},
	events: {
		'click input[type=text]': 'myFunction',
		'submit #search-button': 'searchSubmit',
		'<event> <element>': '<function>'
	},
	myFunction: function(event) {},
	render: function(urlVariables) {
		var passVariables = {label: urlVariables.label};	// pass variables to template
		var template = _.template($('#search-template').html(), passVariables);	// _.template() compiles template into normal HTML (using underscore)
		this.$el.html(template);	// insert `template` (normal HTML) into Backbone's `el` = <div id='search'></div> (using jQuery)
		return this;	// return searchView (instance of SearchView)
	},
	formSubmit: function(event) {
		var formHTML = event.currentTarget;
		var formObj = $(form).serializeObject();	// CUSTOM jQuery method (below)
		var query = formObj.query 	// .query corresponds with `name="query"` (above)
		// do more...
	}
});
var searchView = new SearchView({el:$('#search')});		// alternatively: `= new SearchView();`

// in router or initialize method or elsewhere
	searchView.render();



////////// Model //////////
// class
Person = Backbone.Model.extend({	// class Person extends Backbone.Model
	urlRoot: '/person',				// 
	defaults: {name:'',age:0},
	initialize: function() {		// triggered when create a new instance of Person (Model)
		var that = this;
		this.on('change:name', function(model) {	// triggered after a change is made 
			model.get('age');						// model = person (included because 'this' has different scope)
			that.get('age');						// use 'that' if/when model isn't passed as a parameter
		});
	},
	validate: function(model) {
		if (model is NOT valid)
			return errorString;		// returning a string throws an error
	},
	myFunction: function() {}
});

// instance
var person = new Person();			// creates an instance of class Person
person.set({name:"Jim", age:32});
//-------- same as --------//
var person = new Person({name:"Jim", age:32});

person.set(age+1);
person.set(name+" Jones");
var name = person.get('name');
var age  = person.get('age');
// REMEMBER: use .set()/.get() to edit (triggers `change` listeners)
var attr = person.toJSON();	// CAUTION: direct reference to attributes

person.myFunction();

////////// CRUD (usually in View) //////////
// Create 	= .save() NO 'id' 	= POST 		url.com/person
// Update 	= .save() YES 'id' 	= PUT 		url.com/person/<id>
// Read		= .fetch()			= GET 		url.com/person/<id>
// Delete 	= .destroy()		= DELETE 	url.com/person/<id>

Person = Backbone.Model.extend({
	urlRoot: '/person'
});

// Create = .save() exclude 'id'
var person = new Person();				// NOT `= new Person({name:'Yin', age:(9)});` (because then 'id' will be auto-generated)
var personAttr = {name:'Yin', age:9};	// NO 'id'
person.save(personAttr, {
	success: function(model) {
		// person = {name:'Yin', age:9}
		// model  = {name:'Yin', age:9, id:218}
	}
});

// Update = .save() include 'id'
// previously: person = {name:'Yin', age:9, id:218}
person.save({name:'Ying'}, {
	success: function(model) {
		// person = {name:'Yin', age:9, id:218}
		// model  = {name:'Ying', age:9, id:218}
	}
});

// Read = .fetch()
var person = new Person({id:218});
person.fetch({
	success: function(model) {
		// person = {id:218}
		// model  = {name:'Yin', age:9, id:218}
	}
});

// Delete = .destroy()
// previously: person = {name:'Yin', age:9, id:218}
person.destroy({
	success: function() {}
});



////////// Collection //////////
//	User Model 		= object =  {id:1, ...}
//	User Collection = array = [ {id:1, ...}, {id:2,...}, ... ]
var Persons = Backbone.Collection.extend({	// class Persons extends Backbone.Collection
	model: Person,							// Persons is a Collection/Array of Person Objects: [person1, person2, ...]
	url: '/persons'
});
var persons = new Persons([person1, person2, ...]);





// AJAX Prefilter
// use: if model/database is hosted at a different url/domain than web page/app
$.ajaxPrefilter( function (options, originalOptions, jqXHR) {
	options.url = '//backbonejs-beginner.herokuapp.com' + options.url;
	//options.url = '//localhost:3000' + options.url;
});

// Serialize HTML Form Object
// to use: $(form).serializeObject()
$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
		    	o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};
// Backbone.View.extend({ ... events: {'submit input[type=button]': 'formSubmit',}, ... formSubmit: function(event) { ...
	var formHTML = event.currentTarget;			// <input name="KEY1" value="VALUE1">, <input name="KEY2" value="VALUE2">, ...
	var formObj = $(form).serializeObject();	// { KEY1:"VALUE1", KEY2:"VALUE2", ... }
	formObj.KEY1 --> "VALUE1"

cdnjs = community curated repository of client-side frameworks for the internet
seo server = server redirects google bot to correct content when trying to index a "single page application" (i.e. - gmail) b/c single-page apps have difficulty being indexed
require.js = make client-side (and server-side) code more modular (powered by amd?)
