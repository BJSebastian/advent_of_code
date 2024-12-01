/* eslint-disable no-console */
const fs = require('fs');

async function readInput() {
  // This is how I originally did this
  // const input = await fs.promises.readFile('sample.txt', 'utf-8');
  // const input = await fs.promises.readFile('input.txt', 'utf-8');

  // cj did it this way:
  // const input = fs.readFileSync('sample.txt', 'utf-8');
  const input = fs.readFileSync('input.txt', 'utf-8');
  return input.split('\n').map((x) => x);
}

async function puzzle() {
  // Get each row into an array.
  const rows = await readInput();
	const listLeft = [];
	const listRight = [];

  rows.forEach((row) => {
    const rowValues = row.split("   ");
		if (rowValues.length >= 2) {
			listLeft.push(rowValues[0]);
			listRight.push(rowValues[1]);
		}
  });

	listLeft.sort(function(a, b) {
		return a - b;
	});

	listRight.sort(function(a, b) {
		return a - b;
	});
	
	// for debugging....
	// console.log(`left list values: ${listLeft}`);
	// console.log(`right list values: ${listRight}`);

	let totalDistance = 0;
	for (let i = 0; i < listLeft.length; i++) {
		let distance = 0;
		const valueLeft = parseInt(listLeft[i]);
		const valueRight = parseInt(listRight[i]);
		if (valueLeft > valueRight) {
			distance = valueLeft - valueRight;
		}
		else {
			distance = valueRight - valueLeft;
		}
		console.log(`distance for row: ${i} with left value: ${valueLeft} and right value: ${valueRight} is: ${distance}`);
		totalDistance += distance;
	}
	console.log(`total distance between lists: ${totalDistance}`);
}

puzzle();