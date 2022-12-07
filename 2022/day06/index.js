const fs = require('fs');

async function readInput() {
	// const input = fs.readFileSync('sample.txt', 'utf-8');
	const input = fs.readFileSync('input.txt', 'utf-8');
	return input;
}

async function puzzle() {
	//========================================================================================
	// --- Day 6:  ---
	//========================================================================================

	// Get input into an array.
	const input = await readInput();
	const datastream = input.split('');

	//----------------------------------------------------------------------------------------
	// --- Part One ---
	// 
	//----------------------------------------------------------------------------------------
	const last4 = [];
	let pos = 1;
	for (const char of datastream) {
		last4.push(char);
		console.log(`current char is: ${char} and the last 4 length is: ${last4.length}`);
		if (last4.length === 4) {
			// are all 4 unique?
			const charSet = new Set(last4);
			const uniqueChars = [...charSet];
			console.log(`set length is: ${uniqueChars.length}`);
			if (uniqueChars.length === 4) {
				// start of packet found
				break;
			}
			last4.shift();
		}
		pos++;
	}
	console.log(pos);

	//----------------------------------------------------------------------------------------
	// --- Part Two ---
	// 
	//----------------------------------------------------------------------------------------
	const last14 = [];
	pos = 1;
	for (const char of datastream) {
		last14.push(char);
		console.log(`current char is: ${char} and the last 14 length is: ${last14.length}`);
		if (last14.length === 14) {
			// are all 14 unique?
			const charSet = new Set(last14);
			const uniqueChars = [...charSet];
			console.log(`set length is: ${uniqueChars.length}`);
			if (uniqueChars.length === 14) {
				// start of packet found
				break;
			}
			last14.shift();
		}
		pos++;
	}
	console.log(pos);
}

puzzle();