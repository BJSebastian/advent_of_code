const fs = require('fs');
const cycles = [];
let cycle = 0;
let X = 1;
spriteStart = 0;
spriteEnd = 2;
screenRow = 0;
screenPos = 0;

async function readInput() {
	// const input = fs.readFileSync('sample.txt', 'utf-8');
	const input = fs.readFileSync('input.txt', 'utf-8');
	return input.split('\n');
}

function handleInstruction(instruction, value) {
	if (instruction === 'noop' || instruction === 'addx') {
		let screenChar = ".";
		if (screenPos >= spriteStart && screenPos <= spriteEnd) {
			screenChar = "#";
		}
		cycle++;
		if (screenPos > 39) {
			screenRow++;
			screenPos = 0;
			spriteStart = 0;
			spriteEnd = 2;
			screenChar = "#";
		}
		cycles.push({
			instruction: instruction,
			value: value,
			status: "started",
			no: cycle,
			x: X,
			strength: cycle * X,
			screenRow: screenRow,
			screenPos: screenPos,
			spriteStart: spriteStart,
			spriteEnd: spriteEnd,
			screenChar: screenChar
		})
		screenPos++;
		// for debugging...
		// console.log(JSON.stringify(cycles[cycles.length - 1]));

		if (instruction === 'addx') {
			let screenChar = ".";
			if (screenPos >= spriteStart && screenPos <= spriteEnd) {
				screenChar = "#";
			}
			cycle++;
			if (screenPos > 39) {
				screenRow++;
				screenPos = 0;
				spriteStart = 0;
				spriteEnd = 2;
				screenChar = "#";
			}
			cycles.push({
				instruction: instruction,
				value: value,
				status: "started",
				no: cycle,
				x: X,
				strength: cycle * X,
				screenRow: screenRow,
				screenPos: screenPos,
				spriteStart: spriteStart,
				spriteEnd: spriteEnd,
				screenChar: screenChar
			});
			screenPos++;
			// for debugging...
			// console.log(JSON.stringify(cycles[cycles.length - 1]));
			X += parseInt(value);
			spriteStart = X - 1;
			spriteEnd = X + 1;
			cycles.push({
				instruction: instruction,
				status: "finished",
				value: value,
				no: cycle,
				x: X,
				strength: cycle * X,
				screenRow: screenRow,
				screenPos: screenPos,
				spriteStart: spriteStart,
				spriteEnd: spriteEnd,
				screenChar: screenChar
			});
			// for debugging...
			// console.log(JSON.stringify(cycles[cycles.length - 1]));
		}
	}
}

async function puzzle() {
	//========================================================================================
	// --- Day 10: Cathode-Ray Tube ---
	//========================================================================================

	// Get input into an array.
	const lines = await readInput();

	for (const line of lines) {
		handleInstruction(...line.split(' '));
	}

	const sumCycles = [20, 60, 100, 140, 180, 220];
	let sumSignal = 0;
	for (let i = 0; i < sumCycles.length; i++) {
		const currCycle = cycles.find((cycle) => cycle.no === sumCycles[i] && cycle.status === "started");
		sumSignal += currCycle.strength;
		// for debugging...
		// console.log(`signal strength at cycle ${sumCycles[i]}: ${currCycle.strength}`);
	};

	console.log(`sum of these six signal strengths: ${sumSignal}`);

	//----------------------------------------------------------------------------------------
	// --- Part Two ---
	//----------------------------------------------------------------------------------------
	const outputRows = [];
	for (let r = 0; r < 6; r++) {
		let crtLine = "";
		for (let i = 0; i < 40; i++) {
			const currCycle = cycles.find((cycle) => cycle.screenRow === r && cycle.screenPos === i && cycle.status === "started");
			if (currCycle) {
				crtLine += currCycle.screenChar;
			}
		}
		outputRows.push(crtLine);
	}
	console.log(outputRows);
}

puzzle();