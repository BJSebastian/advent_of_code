const fs = require('fs');

async function readInput() {
	const input = fs.readFileSync('sample.txt', 'utf-8');
	// const input = fs.readFileSync('input.txt', 'utf-8');
	return input.split('\n');
}

async function puzzle() {
	//========================================================================================
	// --- --- Day 7: No Space Left On Device --- ---
	//========================================================================================

	// Get number values into an array.
	const lines = await readInput();
	const dirInfo = [];
	const dirStack = [];

	//----------------------------------------------------------------------------------------
	// --- Part One ---
	// 
	//----------------------------------------------------------------------------------------
	for (const line of lines) {

		const lineInfo = line.replace("\r", "").split(' ');

		// 	// console.log(lineInfo);

		switch (lineInfo[0]) {

			case "$":

				if (lineInfo[1] === 'cd') {
					if (lineInfo[2] === '..') {
						dirInfo.push(dirStack[dirStack.length -1]);
						dirStack.pop();
					}
					else {
						console.log(`creating directory ${lineInfo[2]}`);
						const newDir = {
							dir: lineInfo[2],
							size: 0
						};
						dirStack.push(newDir);
					}
				}
				break;

			default:

				if (lineInfo[0] === "dir") {
					console.log(`- ${lineInfo[1]} (dir)`);
				} else {
					console.log(`- ${lineInfo[1]} (file, size=${lineInfo[0]})}`);

					for (let i = 0; i < dirStack.length; i++) {
						dirStack[i].size += parseInt(lineInfo[0]);
					}

				}
				break;
		}
	}

	for (const dir of dirStack) {
		dirInfo.push(dir);
	}

	console.log(dirInfo);

	let totalSize = 0;
	for (const dir of dirInfo) {
		if (dir.size <= 100000) {
			totalSize += dir.size;
		}
	}

	console.log(`sum of the total sizes of directories under 100000: ${totalSize}`);

	//----------------------------------------------------------------------------------------
	// --- Part Two ---
	// 
	//----------------------------------------------------------------------------------------

}

puzzle();
