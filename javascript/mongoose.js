// Load mongoose package
let mongoose = require('mongoose');

// connect to 'poolGameTrackerApp' database using MongoDB (if it does NOT exist, create it)
mongoose.connect('mongodb://localhost/poolGameTrackerApp');

//----- Schema -----//
// create 'Player' schema
let PlayerSchema = new mongoose.Schema({
  // id: ???,
  name: String,
  wins: { type: Number, default: 0 },
  updated_at: { type: Date, default: Date.now }
});
// create 'Game' schema
let GameSchema = new mongoose.Schema({
  // id: ???,
  winner: Object,	// winnerId?
  loser: Object,	// loserId?
  updated_at: { type: Date, default: Date.now }
});

//----- Schema Types -----//
String
Number
Date
Buffer
Boolean
Map
Schema.Types.ObjectId
Schema.Types.Decimal128
Object|{}|Schema.Types.Mixed
Array|[]
	[String]	// [Array] of [String]
	[Number]	// [Array] of [Number]
	...
	[[]]		// [Array] of [Array]
	[[String]]	// [Array] of [Array] of [String]

// Create models based on schemas
let Player = mongoose.model('Player', PlayerSchema);
let Game   = mongoose.model('Game',   GameSchema);

//----- Create -----//
// create & save player instance
Player.create( 	{name: 'Ryan'},		/* same as */	let player = new Player({name: 'Tylor'}); 
				callback 							player.save( callback );
);

//----- Find (Read) -----//
// get [Array] of all [Player] objects
Player.find( callback ); // res = [Array] of [Player] objects
// get [Array] only of [Player] objects that match queryObject
Player.find( queryObject, callback );
Player.find( {name:'Jo'}, callback );
Player.find( {name:/^J/}, callback ); // starts with 'J'
Player.find( {name:/o$/}, callback ); // ends   with 'o'
	.where('updated_at').gt(oneYearAgo)
	.exec(callback);
Model.findById(id, callback)

//----- Update -----//
// only updates provided properties
Model.findByIdAndUpdate(id, update, options, callback);
Model.findOneAndUpdate(queryObject, update, options, callback);
Model.update(queryObject, update,  options,      callback); 
Model.update({name:'Jo'}, {age:9}, {multi:true}, callback);

//----- Remove (Delete) -----//
Model.remove(queryObject, callback);
Model.findByIdAndRemove(id, options, callback);
Model.findOneAndRemove(queryObject, options, callback);



function callback(err, res) {
	  if(err)
	    console.log(err);
	  else
	    console.log(res);
}