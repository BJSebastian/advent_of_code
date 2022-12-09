const fs = require('fs');
const tailPositions = new Set();
const headPos = [1, 1]; // row, col
const tailPos = [1, 1]; // row, col

async function readInput() {
	const input = fs.readFileSync('sample.txt', 'utf-8');
	// const input = fs.readFileSync('input.txt', 'utf-8');
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

		// Move Tail.

		// is the tail still adjacent to the head?
		if (tailPos[0] < headPos[0] - 1 ||
			tailPos[0] > headPos[0] + 1 ||
			tailPos[1] < headPos[1] - 1 ||
			tailPos[1] > headPos[1] + 1) {
			if (headPos[0] > tailPos[0]) {
				tailPos[0]++;
			}
			if (headPos[0] < tailPos[0]) {
				tailPos[0]--;
			}
			if (headPos[1] > tailPos[1]) {
				tailPos[1]++;
			}
			if (headPos[1] < tailPos[1]) {
				tailPos[1]--;
			}
			tailPositions.add(JSON.stringify([tailPos[0], tailPos[1]]));
		}
	}
}

async function puzzle() {
	//========================================================================================
	// --- Day 9: Rope Bridge ---
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