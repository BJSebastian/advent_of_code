/* eslint-disable no-console */
const fs = require('fs');

async function readInput() {

  // const input = fs.readFileSync('sample.txt', 'utf-8');
  const input = fs.readFileSync('input.txt', 'utf-8');
  return input.split('\n').map((x) => x);
}

function checkRow(row) {
	// console.log(`check row: ${row}`);
	const rowValues = row.split(" ");
	let allIncreasing = true;
	let allDecreasing = true;
	let validLevelChange = true;
	for (let i = 1; i < rowValues.length; i++) {
		if (parseInt(rowValues[i]) <= parseInt(rowValues[i - 1])) {
			allIncreasing = false;
		}

		if (parseInt(rowValues[i]) >= parseInt(rowValues[i - 1])) {
			allDecreasing = false;
		}

		let levelChange = 0;
		if (parseInt(rowValues[i]) > parseInt(rowValues[i - 1])) {
			levelChange = parseInt(rowValues[i]) - parseInt(rowValues[i - 1]);
		}
		else {
			levelChange = parseInt(rowValues[i - 1]) - parseInt(rowValues[i]);
		}
		if (levelChange < 1 || levelChange > 3) {
			validLevelChange = false;
		}
	}

	// for debugging...
	if ((allDecreasing || allIncreasing) && validLevelChange) {
		console.log(`Report ${row} is safe.`)
	}

	return ((allDecreasing || allIncreasing) && validLevelChange);
}

async function puzzle() {
  // Get each row into an array.
  const rows = await readInput();
	let safeReports = 0;

  rows.forEach((row) => {
		if (checkRow(row)) {
			safeReports++;
		}
		else {
			// Problem Dampener...
			const rowValues = row.split(" ");
			for (let i = 0; i < rowValues.length; i++) {
				// create a new row minus the current value we are on to see if this will work
				// missing this one value...
				const newValues = [];
				for (let j = 0; j < rowValues.length; j++) {
					if (j !== i) {
						newValues.push(rowValues[j]);
					}
				}
				const newRow = newValues.join(" ");
				if (checkRow(newRow)) {
					console.log(`Report ${row} is safe via the probelm dampener.`);
					safeReports++;
					break;
				}
			}
		}
  });

	console.log(`in this example, ${safeReports} reports are safe.`);
}

puzzle();