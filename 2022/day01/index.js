const fs = require('fs');

async function readInput() {
	const input = fs.readFileSync('input.txt', 'utf-8');
	return input.split('\n');
}

async function puzzle() {

	const elfCalories = [];
	
	// Get number values into an array.
	const numbers = await readInput();

	let totalCalories = 0;
	numbers.forEach((number) => {
		if (number) {
			totalCalories += parseInt(number);
		}
		else {
			elfCalories.push(totalCalories);
			totalCalories = 0;
		}
	});
	elfCalories.push(totalCalories);

	// Part 1... most calories for any given elf.
	const max = Math.max(...elfCalories);
	console.log(`The most calories for one elf is: ${max}`);
	const index = elfCalories.indexOf(max);

	// Part 2... total calories of top 3 elves.
	const topElves = elfCalories.sort().slice(-3);
	console.log("Total calories for top 3 elves: " + topElves.reduce((a, b) => a + b, 0));
}

puzzle();