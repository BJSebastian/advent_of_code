const fs = require('fs');

async function readInput() {
	
	// This is how I originally did this
	// const input = await fs.promises.readFile('sample.txt', 'utf-8');
	// const input = await fs.promises.readFile('input.txt', 'utf-8');

	// cj did it this way:
	const input = fs.readFileSync('sample.txt', 'utf-8');
	return input.split('\n').map((x) => parseInt(x));
}

async function puzzle() {

	// Get number values into an array.
	const numbers = await readInput();

	numbers.forEach((number) => {
		console.log(number);
	});

}

puzzle();