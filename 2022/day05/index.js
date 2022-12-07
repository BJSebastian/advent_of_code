const fs = require('fs');

async function readSupplyStacks() {
	// const input = fs.readFileSync('sample-stacks.txt', 'utf-8');
	const input = fs.readFileSync('input-stacks.txt', 'utf-8');
	return input.split('\n');
}

async function readInput() {
	// const input = fs.readFileSync('sample.txt', 'utf-8');
	const input = fs.readFileSync('input.txt', 'utf-8');
	return input.split('\n');
}

async function puzzle() {
	//========================================================================================
	// --- Day 5: Supply Stacks ---
	//========================================================================================

	// Get supply stacks input into an array.
	const supplyStacks = await readSupplyStacks();

	//----------------------------------------------------------------------------------------
	// SETUP THE DATA...
	// This will be used for both parts.
	//----------------------------------------------------------------------------------------
	let lineNo = 1;
	let noStacks = 0;
	const stacks = [];
	for (const supplyStack of supplyStacks) {

		// skip the last line of stacks input, it just shows each stack #...
		if (lineNo !== supplyStacks.length) {

			const currStacks = supplyStack.split('');
			if (noStacks === 0) {
				noStacks = (currStacks.length + 1) / 4;
				console.log(`We have a total of ${noStacks} stacks.`)
				for (let i = 0; i < noStacks; i++) {
					// Create an array of stack objects...
					// Each stack object contains:
					// 1) The index of the stack (not really needed, but helpful when logging out the object)
					// 2) A crates array for all the crates in this stack.
					stacks.push({
						stackIndex: i,
						crates: []
					});
				}
			}

			// Populate our stack objects (array).
			let stackIndex = 0;
			for (let i = 0; i < currStacks.length; i += 4) {
				if (currStacks[i] !== ' ') {
					console.log(`Line # ${lineNo} - stack index #${stackIndex} contains a crate.`);
					stacks[stackIndex].crates.push(currStacks[i + 1]);
				} else {
					console.log(`Line # ${lineNo} - stack index #${stackIndex} is empty.`);
				}
				stackIndex++;
			}
		}

		lineNo++;
	}

	// console.log(`stacks before moves:`);
	// console.log(stacks);
	console.log();
	console.log("moves...");

	// Get moves input into an array.
	const moves = await readInput();

	//----------------------------------------------------------------------------------------
	// --- Part One ---
	// After the rearrangement procedure completes, what crate ends up on top of each stack?
	//----------------------------------------------------------------------------------------

	// for (const move of moves) {
	// 	const moveInfo = move.split(' ');
	// 	console.log(moveInfo);
	// 	const numCrates = parseInt(moveInfo[1]);
	// 	const fromStackIndex = parseInt(moveInfo[3]) - 1;
	// 	const toStackIndex = parseInt(moveInfo[5]) - 1;
	// 	console.log(`Move ${numCrates} crate(s) from stack index# ${fromStackIndex} to stack index# ${toStackIndex}`);
	// 	for (let i = 0; i < numCrates; i++) {

	// 		// add one crate to the new stack.
	// 		stacks[toStackIndex].crates.unshift(stacks[fromStackIndex].crates[0]);

	// 		// remove one crate from the old stack.
	// 		stacks[fromStackIndex].crates.shift();

	// 	}
	// }

	// console.log(`stacks after moves:`);
	// console.log(stacks);

	// let output = "";
	// for (let i = 0; i < stacks.length; i++) {
	// 	output += stacks[i].crates[0];
	// }

	// console.log(`Answer: ${output}`);

	//----------------------------------------------------------------------------------------
	// --- Part Two ---
	// After the rearrangement procedure completes, what crate ends up on top of each stack?
	//----------------------------------------------------------------------------------------
	for (const move of moves) {
		const moveInfo = move.split(' ');
		console.log(moveInfo);
		const numCrates = parseInt(moveInfo[1]);
		const fromStackIndex = parseInt(moveInfo[3]) - 1;
		const toStackIndex = parseInt(moveInfo[5]) - 1;
		// console.log(`Move ${numCrates} crate(s) from stack index# ${fromStackIndex} to stack index# ${toStackIndex}`);

		// create set to move.
		const cratesToMove = [];
		for (let i = 0; i < numCrates; i++) {

			// add one crate to the set to move.
			cratesToMove.push(stacks[fromStackIndex].crates[0]);

			// remove one crate from the old stack.
			stacks[fromStackIndex].crates.shift();

		}

		// Move the set to the new stack (in reverse order)
		for (let i = cratesToMove.length - 1; i > -1; i--) {
			stacks[toStackIndex].crates.unshift(cratesToMove[i]);
		}

	}

	// console.log(`stacks after moves:`);
	// console.log(stacks);

	let output = "";
	for (let i = 0; i < stacks.length; i++) {
		output += stacks[i].crates[0];
	}

	console.log(`Answer: ${output}`);

}

puzzle();