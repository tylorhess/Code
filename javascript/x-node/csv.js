'use strict';
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
	input: fs.createReadStream('test.csv'),
	crlfDelay: Infinity
});

let people = [];
rl.on('line', (line) => {
	let personArray = line.split(',');
	let personObj = {
		firstName:	personArray[0].trim(),
		lastName:	personArray[1].trim(),
		age:	   +personArray[2].trim()
	};
	people.push(personObj);
});

let readFileClosed = new Promise( (resolve, reject) => {
	rl.on('close', resolve);
});

console.log('unsorted:');
readFileClosed
	.then(printPeople)
	.then(sortPeople)
	.then(printPeople)
	.then(newFile)
	.then(writeToFile);

function sortPeople() {
	people.sort( (person1, person2) => {return person1.age - person2.age;} );
	console.log('sorted:');
}
function printPeople() {
	people.forEach( (person) => {
		console.log(`First: ${person.firstName}, Last: ${person.lastName}, Age: ${person.age}`); 
	});
}
let outputFilename = './output.csv';
function newFile() {
	return new Promise( (resolve, reject) => {
		fs.writeFile(outputFilename, '', (err) => {
			if (err) 
				reject(err);
			else
				resolve();
		});
	});
}
function writeToFile() {
	let file = fs.createWriteStream(outputFilename, {
		flags: 'a' // append to file
	});

	people.forEach( (person) => {
		let line = `${person.firstName},${person.lastName},${person.age}\n`;
		file.write(line);
	});

	// file.end();
}

// rl.on('close', () => {
	
// });
