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
	let safeReports = 0;

  rows.forEach((row) => {

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
		// if (row === "6 8 9 12 14 15") {
		// 	console.log(`all increasing: ${allIncreasing}`);
		// 	console.log(`add decreasing: ${allDecreasing}`);
		// 	console.log(`validLevelChange: ${validLevelChange}`);
		// }

		if ((allDecreasing || allIncreasing) && validLevelChange) {
			// for debugging...
			console.log(`Report ${row} is safe.`)
			safeReports++;
		}
		else {
			console.log(`Report ${row} is NOT safe.`)
		}
  });

	console.log(`in this example, ${safeReports} reports are safe.`);
}

puzzle();