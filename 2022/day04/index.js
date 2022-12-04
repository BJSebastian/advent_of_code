const fs = require('fs');

async function readInput() {
	// const input = fs.readFileSync('sample.txt', 'utf-8');
	const input = fs.readFileSync('input.txt', 'utf-8');
	return input.split('\n');
}

async function puzzle() {
	//========================================================================================
	// --- Day 4: Camp Cleanup ---
	//========================================================================================

	// Get number values into an array.
	const pairSets = await readInput();

	//----------------------------------------------------------------------------------------
	// --- Part One ---
	// In how many assignment pairs does one range fully contain the other?
	//----------------------------------------------------------------------------------------
	let pairSetNo = 1;
	let contained = 0;
	for (const pairSet of pairSets) {
		const pairs = pairSet.split(",");
		console.log(`pair set #: ${pairSetNo} is ${pairs[0]} and ${pairs[1]}`);
		const elf1 = pairs[0].split("-");
		const elf2 = pairs[1].split("-");

		if (parseInt(elf1[0]) <= parseInt(elf2[0]) && parseInt(elf1[1]) >= parseInt(elf2[1]) ||
			parseInt(elf2[0]) <= parseInt(elf1[0]) && parseInt(elf2[1]) >= parseInt(elf1[1])) {
			contained += 1;
		}

		pairSetNo++;
	}
	console.log(`Assignment pairs where one range fully contains the other: ${contained}`);

	//----------------------------------------------------------------------------------------
	// --- Part Two ---
	// In how many assignment pairs do the ranges overlap?
	//----------------------------------------------------------------------------------------
	pairSetNo = 1;
	let overlap = 0;
	for (const pairSet of pairSets) {
		const pairs = pairSet.split(",");
		const elf1 = pairs[0].split("-");
		const elf2 = pairs[1].split("-");

		if (
			(parseInt(elf1[0]) >= parseInt(elf2[0]) && parseInt(elf1[0]) <= parseInt(elf2[1])) ||
			(parseInt(elf1[1]) >= parseInt(elf2[0]) && parseInt(elf1[1]) <= parseInt(elf2[1])) ||
			(parseInt(elf2[0]) >= parseInt(elf1[0]) && parseInt(elf2[0]) <= parseInt(elf1[1])) ||
			(parseInt(elf2[1]) >= parseInt(elf1[0]) && parseInt(elf2[1]) <= parseInt(elf1[1]))
		) {
			console.log(`pair set #: ${pairSetNo} is ${pairs[0]} and ${pairs[1]} and overlap`);
			overlap++;
		} else {
			console.log(`pair set #: ${pairSetNo} is ${pairs[0]} and ${pairs[1]}`);
		}

		pairSetNo++;
	}
	console.log(`Assignment pairs where the ranges overlap: ${overlap}`);
}

puzzle();