const fs = require("fs");

function getMiddleIndex(arr) {
  return Math.floor(arr.length / 2);
}

async function readInput() {
	// const input = fs.readFileSync("sample.txt", "utf-8");
	const input = fs.readFileSync('input.txt', 'utf-8');
	return input.split("\n").map((x) => x);
}

async function puzzle() {
	// Get each row into an array.
	const rows = await readInput();
	const rules = [];
	const updates = [];
	let middlePageNumbers = 0;

	rows.forEach((row) => {
		if (row.includes("|")) {
			const rule = row.split("|");
			if (rule.length === 2) {
				rules.push({
					parent: parseInt(rule[0]),
					child: parseInt(rule[1]),
				});
			}
		} else if (row.includes(",")) {

			// Split the string by commas
			const stringArray = row.split(",");

			// Convert each string in the array to an integer
			updates.push(stringArray.map(Number));
		}
	});

	rules.sort((a, b) => a.parent - b.parent);

	updates.forEach((row, i) => {
		updateValid = true;
		row.forEach((cell, j) => {
			for (let k = j + 1; k < row.length; k++) {
				if (rules.filter(x => x.child == updates[i][j] && x.parent === updates[i][k]).length > 0) {
					updateValid = false;
					break;
				}
			}
		});
		if (updateValid) {
			middlePageNumbers += row[getMiddleIndex(row)];
		}
	});

	console.log(`What do you get if you add up the middle page number from those correctly-ordered updates? ${middlePageNumbers}`);
}

puzzle();
