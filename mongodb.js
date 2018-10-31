// install via Homebrew
$ brew update
$ brew install mongodb 			 // MongoDB
$ brew install mongodb && mongod // MongoDB & Mongo Daemon (mongod)

// install via MacPorts
$ sudo port install mongodb

// check that mongodb && mongod are installed
$ mongod --version

// run mongo daemon (MongoDB) in terminal
$ mongod 
	$ ^C // ctrl+c ends process
$ mongod &	// run as background process?
	$ ps // find 'mongod' process id
	$ kill -9 <process_id> // end mongod process
// default: localhost:27017 
// use the --port and --host options to connect to a server on a different port or interface

// Server has startup warnings: 
// Mon Jul 22 12:18:22.131 [initandlisten] ** WARNING: soft rlimits too low. Number of files is 256, should be at least 1000
// http://stackoverflow.com/a/12645375/2604541
$ ulimit -n
> 256
$ ulimit -n 1000
$ ulimit -n
> 1000

cat /usr/local/var/log/mongodb/mongo.log

mongodump
mongorestore /path/to/mongodumpFolder/
	// mongodumpFolder should only contain collection.bson (and other mongodb files such as collection.metadata.json)
	// database will be named "mongodumpFolder" (folder name)
	// collection will be named "collection" (file name) (or original collection name?)
	// if namespace doesn't exist, create it:
		$ mongo
		> use mongodumpFolder

mongodb
	data types
		float = Javascript Number
		double = MongoDB double
		integer = MongoDB integer (Javascript Number = 64-bit floats)
		long = MongoDB long lets us store/operate on 64-bit integers
		Date = Javascript Date
		RegExp = Javascript RegExp 
		String = Javascript String
		Binary = MongoDB Binary
		Code = MongoDB Code lets us store Javascript functions (and scope to run them in)
		ObjectID = MongoDB ObjectID = documents unique identifier (_id)
		DbRef = MongoDB DbRef = reference/pointer to another object
		Symbol = MongoDB Symbol

// MongoDB Shell (JavaScript Shell)
$ mongo
> ...
	help
	exit
	show dbs		// show databases (dir: /usr/local/var/mongodb)
	db				// current db
	use <db>		// switch to <db>
	show collections	// show all db.<collection>
	
	
	
	object = {color: "red", number: 12};	// "document"
	db.collectionName.save(object);
	// requires index "_id" 
	// default: "_id" : {   "$oid" : "51ed4cb9cc93742c160ad87f"}
	
	db.collectionName.find();		// returns all
	db.collectionName.find({number: {'gt':5}});
		5				=  5
		{'$lt' : 5}		<  5
		{'$lte': 5}		<= 5
		{'$gt' : 5}		>  5
		{'$gte': 5}		>= 5
		{'$ne' : 5}		!= 5
		{'$in':[4,5]}	is in array [4,5]
		{'$nin':[4,5]}	NOT in array [4,5]
		{'$in':[4,5],'$gt':4}	is in array [4,5] && > 4
	it								// "iterate" (see more results in shell)	
	
	// .find(findPartialObject) & replace entire object with new object
	db.coll.update(findObject, replaceObject);
	// .find({name:"taylor"}) & replace entire object with new object: {name:"taylor", boyfriend:"tylor", age:"26", languages:["english","spanish","russian"]}
	db.coll.update({name:"taylor"}, {name:"taylor", boyfriend:"tylor", age:"26", languages:["english","spanish","russian"]});
	// .find({name:"taylor"}) set "age" to "26"
	db.coll.update({name:"taylor"}, {'$set':{age:"26"}});
		{'$set' : {age:"26"} }					// set 
		{'$pull': {'languages':'spanish'} }
		{'$push': {'languages':'irish'} }
		
	db.coll.remove();					// remove everything
	db.coll.remove({name:"taylor"});	// .find({name:"taylor"}) & remove


//-------------------- Javascript --------------------

// $ npm install mongodb
// $ mongod &				# run mongod in background

//var mongodb = require('mongodb');
//var mongoClient = mongodb.MongoClient;
var mongoClient = require('mongodb').MongoClient;

var port = 27017;
var host = "localhost";
var database = "exampleDb";
var url = "mongodb://"+host+":"+port+"/"+database;
mongoClient.connect(url, function(dbErr, db){
	if (dbErr)
		console.log(dbErr); 
	
	var collection = db.collection('test');
	
	//---------- Create Collection ----------
	// creates collection once we insert first document (object)
	db.collection('test', function(collErr, collection) {});
	// does NOT create collection (throw err if does not exist)
	db.collection('test', {w:1}, function(collErr, collection) {});
	// creates collection
	db.createCollection('test', function(collErr, collection) {});
	// creates collection if none exists, else throw error
	db.createCollection('test', {w:1}, function(collErr, collection) {});
	
	// Asynchronous = "fire and forgot"
	// {w:1} = respond with result/error
	
	//---------- Find/Query ----------
	collection.find();						// find all
	collection.find({key:"value"});			// find documents "key" = "value"
	collection.find({number: {'gt':5}});	// find documents "number" (key) > 5
		5				=  5
		{'$lt' : 5}		<  5
		{'$lte': 5}		<= 5
		{'$gt' : 5}		>  5
		{'$gte': 5}		>= 5
		{'$ne' : 5}		!= 5
		{'$in':[4,5]}	is in array [4,5]
		{'$nin':[4,5]}	NOT in array [4,5]
		{'$in':[4,5],'$gt':4}	is in array [4,5] && > 4
	collection.find().toArray(function(findErr, items) {});	// Careful: memory usage
	var stream = collection.find().stream();			// Preferred
	stream.on("data", function(item) {});				// as data is deserialized, "data" event calls anonymous function
	stream.on("end", function() {});					// when done, call anonymous function
	
	//---------- Insert Documents (Objects) Asynchronously ----------
	// insert 1 document (object)
	collection.insert(doc);
	// insert 1 document (object) & respond with result
	collection.insert(doc, {w:1}, function(insertErr, result) {});
	// insert array of documents (more efficient) & respond with result
	collection.insert([doc1, doc2, ...], {w:1}, function(insertErr, result) {});
	
	//---------- Update Documents (Objects) Asynchronously ----------
	
	
	//---------- Remove Documents (Objects) Asynchronously ----------
	
	
	db.close();
});
		