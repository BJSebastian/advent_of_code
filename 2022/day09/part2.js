const fs = require('fs');
const tailPositions = new Set();
const headPos = [1, 1]; // row, col
const tailsPos = [
	[1, 1],
	[1, 1],
	[1, 1],
	[1, 1],
	[1, 1],
	[1, 1],
	[1, 1],
	[1, 1],
	[1, 1]
]; // row, col

async function readInput() {
	// const input = fs.readFileSync('sample2.txt', 'utf-8');
	const input = fs.readFileSync('input.txt', 'utf-8');
	return input.split('\n');
}

function handleMotion(direction, steps) {

	// Move Head.
	const stepCount = parseInt(steps);
	for (let i = 0; i < stepCount; i++) {
		switch (direction) {
			case "R":
				headPos[1] += 1;
				break;
			case "U":
				headPos[0] += 1;
				break;
			case "L":
				headPos[1] -= 1;
				break;
			case "D":
				headPos[0] -= 1;
				break;
		}

		// Move Tail(s).
		for (let tailIndex = 0; tailIndex < tailsPos.length; tailIndex++) {
			if (tailIndex === 0) {
				moveTail(headPos, tailsPos[tailIndex], tailIndex);
			}
			else {
				moveTail(tailsPos[tailIndex - 1], tailsPos[tailIndex], tailIndex);
			}
		}
	}
}

function moveTail(firstKnot, nextKnot, tailIndex) {
	if (nextKnot[0] < firstKnot[0] - 1 ||
		nextKnot[0] > firstKnot[0] + 1 ||
		nextKnot[1] < firstKnot[1] - 1 ||
		nextKnot[1] > firstKnot[1] + 1) {
		if (firstKnot[0] > nextKnot[0]) {
			nextKnot[0]++;
		}
		if (firstKnot[0] < nextKnot[0]) {
			nextKnot[0]--;
		}
		if (firstKnot[1] > nextKnot[1]) {
			nextKnot[1]++;
		}
		if (firstKnot[1] < nextKnot[1]) {
			nextKnot[1]--;
		}
		if (tailIndex === tailsPos.length - 1) {
			tailPositions.add(JSON.stringify([nextKnot[0], nextKnot[1]]));
		}
	}
}

async function puzzle() {
	//========================================================================================
	// --- Day 9: Rope Bridge --- Part Two ---
	//========================================================================================

	// Get input into an array.
	const lines = await readInput();

	tailPositions.add(JSON.stringify([1, 1]));

	for (const line of lines) {
		handleMotion(...line.split(' '));
	}

	console.log(`positions the tail of the rope visit at least once is: ${tailPositions.size}`);
}

puzzle();