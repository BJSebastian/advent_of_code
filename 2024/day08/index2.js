/* eslint-disable no-console */
const fs = require('fs');

async function readInput() {
	// const input = fs.readFileSync('sample.txt', 'utf-8');
	const input = fs.readFileSync('input.txt', 'utf-8');
	return input.split('\n').map((x) => x);
}

function countOccurrences(str, substr) {
	let count = 0;
	let index = 0;

	while (index !== -1) {
		index = str.indexOf(substr, index);
		if (index !== -1) {
			count++;
			index += substr.length;
		}
	}

	return count;
}

function setAntinode(grid, row, col, up, down, left, right) {
	row = row - up;
	row = row + down;
	col = col - left;
	col = col + right;
	if (row > -1 && row < grid.length && col > -1 && col < grid[0].length) {
		grid[row][col] = "#";
		setAntinode(grid, row, col, up, down, left, right);
	}
	return grid;
}

async function puzzle() {
	// Get each row into an array.
	const rows = await readInput();
	// turn input into a 2 dimension array...
	const grid = rows.map((str) => str.split(''));
	const antennae = [];

	// console.log(grid);

	for (let row = 0; row < grid.length; row++) {
		for (let col = 0; col < grid[row].length; col++) {
			if (grid[row][col] !== ".") {
				console.log(`found ${grid[row][col]} at row: ${row} col: ${col} `);
				antennae.push({
					char: grid[row][col],
					row: parseInt(row),
					col: parseInt(col)
				})
			}
		}
	}

	antennae.forEach(antenna => {
		console.log(`processing antenna: ${antenna.char} at row: ${antenna.row} col: ${antenna.col} `);
		const neighbors = antennae.filter(x => x.char === antenna.char && x.row !== antenna.row && x.col !== antenna.col);
		neighbors.forEach(neighbor => {
			console.log(`-- processing nighboring antenna: ${neighbor.char} at row: ${neighbor.row} col: ${neighbor.col} `);
			let up = 0;
			let down = 0;
			let left = 0;
			let right = 0;
			if (antenna.row < neighbor.row) {
				up = neighbor.row - antenna.row;
			}
			else {
				down = antenna.row - neighbor.row;
			}
			if (antenna.col < neighbor.col) {
				left = neighbor.col - antenna.col;
			}
			else {
				right = antenna.col - neighbor.col;
			}
			setAntinode(grid, antenna.row, antenna.col, up, down, left, right);
		});
	});

	// console.log(grid);

	console.log(`----------`);

	let antinodes = 0;
	grid.forEach((row) => {
		console.log(
			`row: ${row.join('')} has ${row.length - countOccurrences(row.join(''), '.')} antinodes.`
		);
		antinodes += row.length - countOccurrences(row.join(''), '.');
	});
	console.log(`There are ${antinodes} antinodes`);
}

puzzle();
