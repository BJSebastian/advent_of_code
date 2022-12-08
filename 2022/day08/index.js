const fs = require('fs');

async function readInput() {
	// const input = fs.readFileSync('sample.txt', 'utf-8');
	const input = fs.readFileSync('input.txt', 'utf-8');
	return input.split('\n');
}

async function puzzle() {
	//========================================================================================
	// --- Day 8: Treetop Tree House ---
	//========================================================================================

	// Get input into an array.
	const lines = await readInput();
	const rows = [];

	for (const line of lines) {
		rows.push(line.split(''));
	}

	console.log(rows);

	let visibleTrees = 0;
	let bestScenicScore = 0;
	for (let y = 0; y < rows.length; y++) {
		const cols = rows[y];
		for (let x = 0; x < cols.length; x++) {
			if (x === 0) {
				// tree is on the left edge, so its visible.
				visibleTrees++;
			} else if (x === cols.length - 1) {
				// tree is on the right edge, so its visible.
				visibleTrees++;
			} else if (y === 0) {
				// tree is on the top edge, so its visible.
				visibleTrees++;
			} else if (y === rows.length - 1) {
				// tree is on the bottom edge, so its visible.
				visibleTrees++;
			} else {
				let visibleRight = true;
				let visibleLeft = true;
				let visibleTop = true;
				let visibleBottom = true;

				let scenicScoreRight = 0;
				let scenicScoreLeft = 0;
				let scenicScoreTop = 0;
				let scenicScoreBottom = 0;

				// look right
				for (let c = x + 1; c < cols.length; c++) {
					scenicScoreRight++
					if (parseInt(cols[c]) >= parseInt(cols[x])) {
						visibleRight = false;
						break;
					}
				}

				// look left
				if (x > 0) {
					for (let c = x - 1; c > -1; c--) {
						scenicScoreLeft++;
						if (parseInt(cols[c]) >= cols[x]) {
							visibleLeft = false;
							break;
						}
					}
				}

				// look up
				if (y > 0) {
					for (let r = y - 1; r > -1; r--) {
						scenicScoreTop++;
						if (parseInt(rows[r][x]) >= parseInt(cols[x])) {
							visibleTop = false;
							break;
						}
					}
				}

				// look down
				for (let r = y + 1; r < rows.length; r++) {
					scenicScoreBottom++;
					if (parseInt(rows[r][x]) >= parseInt(cols[x])) {
						visibleBottom = false;
						break;
					}
				}

				if (visibleRight) {
					console.log(`row: ${y+1} col: ${x+1} IS visible from the right!`);
				}
				if (visibleLeft) {
					console.log(`row: ${y+1} col: ${x+1} IS visible from the left!`);
				}
				if (visibleTop) {
					console.log(`row: ${y+1} col: ${x+1} IS visible from the top!`);
				}
				if (visibleBottom) {
					console.log(`row: ${y+1} col: ${x+1} IS visible from the bottom!`);
				}

				if (visibleRight || visibleLeft || visibleTop || visibleBottom) {
					visibleTrees++;
				} else {
					console.log(`row: ${y+1} col: ${x+1} is NOT visible from ANY direction!`);
				}

				if (scenicScoreLeft === 0) scenicScoreLeft++;
				if (scenicScoreRight === 0) scenicScoreRight++;
				if (scenicScoreTop === 0) scenicScoreTop++;
				if (scenicScoreBottom === 0) scenicScoreBottom++;

				const scenicScore = scenicScoreLeft * scenicScoreRight * scenicScoreTop * scenicScoreBottom;
				console.log(`Scenic score: ${scenicScore}`);

				if (scenicScore > bestScenicScore) {
					bestScenicScore = scenicScore;
				}

				console.log("----------");
			}
		}
	}

	// --- Part One ---
	console.log(`visible trees is: ${visibleTrees}`);

	// --- Part One ---
	console.log(`best scenic score is: ${bestScenicScore}`);
}

puzzle();