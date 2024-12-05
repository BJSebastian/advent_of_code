/* eslint-disable no-console */
const fs = require('fs');

async function readInput() {

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
	
	// for debugging....
	// console.log(`left list values: ${listLeft}`);
	// console.log(`right list values: ${listRight}`);

	let similarityScore = 0;
	for (let i = 0; i < listLeft.length; i++) {
		const valueLeft = parseInt(listLeft[i]);
		const found = listRight.filter((element) => parseInt(element) === valueLeft);
		// for debugging...
		// console.log(`for row: ${i} left value: ${valueLeft} appears: ${found.length} in right.`);
		similarityScore += valueLeft * found.length;
	}
	console.log(`similarity score between lists: ${similarityScore}`);
}

puzzle();