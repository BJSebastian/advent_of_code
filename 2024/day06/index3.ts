import * as fs from 'fs';

interface Path {
	direction: string;
	index: number;
}

interface GridInfo {
	paths: Path[];
	obstructions: number;
}

async function readInput() {
	const input = fs.readFileSync('input.txt', 'utf-8');
	return input.split('\n').map((x) => x);
}

function moveGuard(
	grid: string[][],
	gridInfo: GridInfo,
	initialDirection: string,
	initialRow: number,
	initialCol: number
): string[][] {
	let direction = initialDirection;
	let row = initialRow;
	let col = initialCol;

	while (true) {
		switch (direction) {
			case 'up':
				row--;
				break;
			case 'right':
				col++;
				break;
			case 'down':
				row++;
				break;
			case 'left':
				col--;
				break;
		}

		if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
			break; // Stop if out of bounds
		}

		if (grid[row][col] === '#') {
			switch (direction) {
				case 'up':
					row++;
					direction = 'right';
					gridInfo.paths.push({
						direction,
						index: row,
					});
					break;
				case 'right':
					col--;
					direction = 'down';
					gridInfo.paths.push({
						direction,
						index: col,
					});
					break;
				case 'down':
					row--;
					direction = 'left';
					gridInfo.paths.push({
						direction,
						index: row,
					});
					break;
				case 'left':
					col++;
					direction = 'up';
					gridInfo.paths.push({
						direction,
						index: col,
					});
					break;
			}
		} else {
			grid[row][col] = 'X';
		}

		if (gridInfo.paths.length >= 4) {
			for (let checkIndex = 0; checkIndex < gridInfo.paths.length; checkIndex++) {
				let pathFound = false;
				switch (direction) {
					case 'up':
						if (
							(gridInfo.paths[checkIndex].direction === 'right' || gridInfo.paths[checkIndex].direction === 'left') &&
							gridInfo.paths[checkIndex].index === row
						) {
							console.log(
								`currently moving ${direction} - obstruction added to row: ${row - 1} col: ${col}`
							);
							pathFound = true;
							gridInfo.obstructions++;
						}
						break;
					case 'right':
						if (
							(gridInfo.paths[checkIndex].direction === 'down' || gridInfo.paths[checkIndex].direction === 'up') &&
							gridInfo.paths[checkIndex].index === col
						) {
							console.log(
								`currently moving ${direction} - obstruction added to row: ${row} col: ${col + 1}`
							);
							pathFound = true;
							gridInfo.obstructions++;
						}
						break;
					case 'down':
						if (
							(gridInfo.paths[checkIndex].direction === 'left' || gridInfo.paths[checkIndex].direction === 'right') &&
							gridInfo.paths[checkIndex].index === row
						) {
							console.log(
								`currently moving ${direction} - obstruction added to row: ${row + 1} col: ${col}`
							);
							pathFound = true;
							gridInfo.obstructions++;
						}
						break;
					case 'left':
						if (
							(gridInfo.paths[checkIndex].direction === 'up' || gridInfo.paths[checkIndex].direction === 'down') &&
							gridInfo.paths[checkIndex].index === col
						) {
							console.log(
								`currently moving ${direction} - obstruction added to row: ${row} col: ${col - 1}`
							);
							pathFound = true;
							gridInfo.obstructions++;
						}
						break;
				}
				if (pathFound) break;
			}
		}
	}

	return grid;
}

function countOccurrences(str: string, substr: string): number {
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

async function puzzle() {
	const rows = await readInput();
	const grid = rows.map((str) => str.split(''));

	let guardRow = 0;
	let guardCol = 0;
	for (let row = 0; row < grid.length; row++) {
		for (let col = 0; col < grid[row].length; col++) {
			const cell = grid[row][col];
			if (cell === '^') {
				console.log(`The guard is at cell: [${row}, ${col}] ...LET'S GO!`);
				grid[row][col] = 'X';
				guardRow = row;
				guardCol = col;
			}
		}
	}

	let guardDirection = 'up';
	const paths: Path[] = [];
	paths.push({
		direction: guardDirection,
		index: guardCol,
	});
	const gridInfo: GridInfo = {
		paths,
		obstructions: 0,
	};
	moveGuard(grid, gridInfo, guardDirection, guardRow, guardCol);

	console.log(`----------`);

	let guardPositions = 0;
	grid.forEach((row) => {
		console.log(
			`row: ${row.join('')} has ${countOccurrences(row.join(''), 'X')} distinct guard positions.`
		);
		guardPositions += countOccurrences(row.join(''), 'X');
	});
	console.log(`There are ${guardPositions} distinct guard positions`);
	console.log();
	console.log(`obstructions: ${gridInfo.obstructions}`);
}

puzzle();
