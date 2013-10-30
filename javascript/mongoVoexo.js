var mongoClient = require('mongodb').MongoClient;

var port = 27017;
var host = "localhost";
var database = "ticker";
var collName = "ticker";
var url = "mongodb://"+host+":"+port+"/"+database;


mongoClient.connect(url, function(dbErr, db){
	if (dbErr)
		console.log(dbErr); 
	
	db.collection(collName, {w:1}, function(collErr, collection) {
		if (collErr)
			console.log(collErr);
		
		collection.find().toArray(function(findErr, items) {
			if (findErr)
				console.log(findErr);
			//for (object in items)
			for (var i = 0; i < 10 && i < items.length; i++)
				console.log(items[i]);
		});
	});
});