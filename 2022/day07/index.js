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
		
		switch(line.substring(0, 1)) {
			case "$":
				const commandInfo = line.substring(2).split(' ');
				console.log("command: " + line.substring(2));
				if (line.substring(2) === 'cd ..') {
					// pop the most recent directory off of the directory stack.
					dirStack.pop();
				}
				break;
			default:
				const lineInfo = line.split(' ');
				if (lineInfo[0] === "dir") {
					const newDir = { dir: lineInfo[1], size: 0 };
					dirInfo.push(newDir);
					dirStack.push(newDir)
					console.log(`- ${lineInfo[1]} (${lineInfo[0]})}`);
				}
				else {
					console.log(`- ${lineInfo[1]} (file, size=${lineInfo[0]})}`);
					for (const dir in dirStack) {
						dir.size += parseInt(lineInfo[0]);
					}
				}
				break;
		}
	}

	console.log(dirInfo);

	//----------------------------------------------------------------------------------------
	// --- Part Two ---
	// 
	//----------------------------------------------------------------------------------------

}

puzzle();