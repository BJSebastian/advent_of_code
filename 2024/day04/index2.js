/* eslint-disable no-console */
const { count } = require("console");
const fs = require("fs");

async function readInput() {
	const input = fs.readFileSync("sample.txt", "utf-8");
	// const input = fs.readFileSync('input.txt', 'utf-8');
	return input.split("\n").map((x) => x);
}

async function puzzle() {
	// Get each row into an array.
	const rows = await readInput();
	// turn input into a 2 dimension array...
	const grid = rows.map((str) => str.split(""));
	const charsToCheck = ["A", "M"];
	const data = [];
  let xmasCount = 0;

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (grid[i][j] === "S") {
				// console.log(grid[i][j]);

				// 'S' marks the spot! ...the XMAS word search is on!
				let charsFound = 0;

				// search diagnolly upper right
				charsFound = 0;
				for (let k = 0; k < charsToCheck.length; k++) {
					if (i - (k + 1) >= 0 && j + (k + 1) < rows[i].length) {
						if (grid[i - (k + 1)][j + (k + 1)] === charsToCheck[k]) {
							charsFound++;
						}
					}
				}
				if (charsFound === charsToCheck.length) {
					xmasCount++;
					console.log(`${xmasCount}) row: ${i + 1} col: ${j + 1} - an upper right SAM was found`);
					data.push({
						row: i, // up one
						col: j + 2, // right one
					});
				}

				// search diagnolly lower right
				charsFound = 0;
				for (let k = 0; k < charsToCheck.length; k++) {
					if (i + (k + 1) < rows.length && j + (k + 1) < rows[i].length) {
						if (grid[i + (k + 1)][j + (k + 1)] === charsToCheck[k]) {
							charsFound++;
						}
					}
				}
				if (charsFound === charsToCheck.length) {
					xmasCount++;
					console.log(`${xmasCount}) row: ${i + 1} col: ${j + 1} - a lower right SAM was found`);
					data.push({
						row: i + 2, // down one
						col: j + 2, // right one
					});
				}

				// search diagnolly lower left
				charsFound = 0;
				for (let k = 0; k < charsToCheck.length; k++) {
					if (i + (k + 1) < rows.length && j - (k + 1) >= 0) {
						if (grid[i + (k + 1)][j - (k + 1)] === charsToCheck[k]) {
							charsFound++;
						}
					}
				}
				if (charsFound === charsToCheck.length) {
					xmasCount++;
					console.log(`${xmasCount}) row: ${i + 1} col: ${j + 1} - a lower left SAM was found`);
					data.push({
						row: i + 2, // down one
						col: j, // left one
					});
				}

				// search diagnolly upper left
				charsFound = 0;
				for (let k = 0; k < charsToCheck.length; k++) {
					if (i - (k + 1) >= 0 && j - (k + 1) >= 0) {
						if (grid[i - (k + 1)][j - (k + 1)] === charsToCheck[k]) {
							charsFound++;
						}
					}
				}
				if (charsFound === charsToCheck.length) {
					xmasCount++;
					console.log(`${xmasCount}) row: ${i + 1} col: ${j + 1} - an upper left SAM was found`);
					data.push({
						row: i, // up one
						col: j, // left one
					});
				}
			}
		}
	}

	// console.log(data);

	// Step 1: Stringify each object
	const stringifiedObjects = data.map((obj) => JSON.stringify(obj));

	// Step 2: Count occurrences
	const counts = stringifiedObjects.reduce((acc, objStr) => {
		acc[objStr] = (acc[objStr] || 0) + 1;
		return acc;
	}, {});

	// Step 3: Map counts back to original objects
	const result = data.map((obj) => ({
		...obj,
		count: counts[JSON.stringify(obj)],
	}));

	console.log();
	console.log(result);
  console.log();
	console.log(`How many times does SAM appear? ${result.filter((x) => x.count === 2).length / 2}`);
}

puzzle();
