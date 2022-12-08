const fs = require('fs');

async function readInput() {
	// const input = fs.readFileSync('sample.txt', 'utf-8');
	const input = fs.readFileSync('input.txt', 'utf-8');
	return input.split('\n');
}

async function puzzle() {
	//========================================================================================
	// --- Day 7: No Space Left On Device --- ---
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
	let outermostDirSize = 0;
	for (const dir of dirInfo) {
		if (dir.size <= 100000) {
			totalSize += dir.size;
		}
		if (dir.dir === '/') {
			outermostDirSize = dir.size;
		}
	}

	console.log(`sum of the total sizes of directories under 100000: ${totalSize}`);

	//----------------------------------------------------------------------------------------
	// --- Part Two ---
	// Find the smallest directory that, if deleted, would free up enough space on the '
	// filesystem to run the update.
	// What is the total size of that directory?
	//----------------------------------------------------------------------------------------
	console.log();
	console.log("Part 2...");
	console.log("---------");
	console.log();
	console.log(`Outermost dir size: ${outermostDirSize}`);
	const unUsedSpace = 70000000 - outermostDirSize;
	console.log(`Current size of unused space: ${unUsedSpace}`);
	const spaceNeeded = 30000000 - unUsedSpace;
	console.log(`Space needed: ${spaceNeeded}`);
	let dirSize = 0;
	for (const dir of dirInfo) {
		if (dir.size >= spaceNeeded) {
			console.log(`evaluating ${dir.size}`);
			if (dirSize === 0 || dir.size < dirSize) {
				dirSize = dir.size;
			}
		}
	}

	console.log(`total size of directory to delete: ${dirSize}`);
}

puzzle();
