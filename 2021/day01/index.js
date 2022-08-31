const fs = require('fs');

async function readInput() {
	
	// const input = await fs.promises.readFile('sample.txt', 'utf-8');
	// const input = await fs.promises.readFile('input.txt', 'utf-8');

	// cj did it this way:
	const input = fs.readFileSync('input.txt').toString();

	return input.split('\n').map((x) => parseInt(x));
}

async function puzzle() {

	// Get number values into an array.
	const numbers = await readInput();

	// Solved the 1st puzzle via the old for each, this worked like a charm, BUT wasn't a good
	// way to solve part 2, which is solved below.
	let prevMeasurement = 999999;
	let numIncreases = 0;
	numbers.forEach((measurement) => {
		if (measurement > prevMeasurement) {
			numIncreases++;
			// console.log(`${measurement} (increased)`);
		} else {
			// console.log(`${measurement} (decreased)`);
		}
		prevMeasurement = measurement;
	});
	console.log(`There aree ${numIncreases} measurements that are larger than the previous measurement.`);

	// Part 2 for the "sliding window" is ALLOT easier to solve simply looping the array 
	// -vs- a for each without a current index.
	let totalDepthIncreases = 0;
	let totalSumIncreases = 0;
	for (var i = 0; i < numbers.length; i++) {

		// if (numbers[i + 1] - numbers[i] > 0) totalDepthIncreases++;
		if (numbers[i + 1] > numbers[i]) totalDepthIncreases++;

		const a = numbers[i] + numbers[i + 1] + numbers[i + 2];
		const b = numbers[i + 1] + numbers[i + 2] + numbers[i + 3];
		// if (b - a > 0) totalSumIncreases++;
		if (b > a) totalSumIncreases++;
	
	}
	console.log("total depth increases: ", totalDepthIncreases);
	console.log("total sum increases: ", totalSumIncreases);

}

puzzle();