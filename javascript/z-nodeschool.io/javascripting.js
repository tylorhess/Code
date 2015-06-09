

// accessing-array-values
var food = ['apple', 'pizza', 'pear'];
console.log(food[1]);

// array-filtering
var numbers = [1,2,3,4,5,6,7,8,9,10];
var filtered = numbers.filter(function(number){
	return number % 2 === 0;
});
console.log(filtered);

// arrays
var pizzaToppings = ['tomato sauce', 'cheese', 'pepperoni'];
console.log(pizzaToppings);

// foo-loop
var total = 0;
var limit = 10;
for (var i = 0; i < limit; i++)
{
	total += i;
}
console.log(total);

// function-arguments
function math(a, b, c) {
	return a + b * c;
}
console.log(math(53,61,67));

// functions
function eat(food) {
	return food + ' tasted really good.';
}
console.log(eat('bananas'));

// if-statement
var fruit = 'orange';
if (fruit.length > 5){
	console.log('The fruit name has more than five characters.');
} else {
	console.log('The fruit name has five characters or less');
}

// introduction
console.log('hello');


// looping-through-arrays
var pets = ['cat','dog','rat'];
pets.forEach(function(item, index, array) {array[index] = item+'s';});
console.log(pets);

// number-to-string
var n = 128;
console.log(n.toString());


// numbers
var example = 123456789;
console.log(example);

// object-properties
var food = {
  types: 'only pizza'
};
console.log(food.types);

// objects
var pizza = {
  toppings: ['cheese', 'sauce', 'pepperoni'],
  crust: 'deep dish',
  serves: 2
}
console.log(pizza);

// revising-strings
var pizza = 'pizza is alright';
pizza = pizza.replace('alright','wonderful');
console.log(pizza);


// rounding-numbers
var roundUp = 1.5;
rounded = Math.round(roundUp);
console.log(rounded);


// string-length
var example = 'example string';
console.log(example.length);

// string
var someString = 'this is a string';
console.log(someString);


// strings
var someString = 'this is a string';
console.log(someString);


// variables
var example = "some string";
console.log(example);