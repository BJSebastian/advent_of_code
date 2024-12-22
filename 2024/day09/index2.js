const fs = require("fs");

async function readInput() {
	// const input = fs.readFileSync("sample.txt", "utf-8");
	const input = fs.readFileSync('input.txt', 'utf-8');
	return input.split("\n").map((x) => x);
}

function isOdd(number) {
	return number % 2 !== 0;
}

function isNumber(str) {
	// Check if the string is empty or just whitespace
	if (str.trim() === "") {
		return false;
	}

	// Use the Number function to convert the string to a number
	const num = Number(str);

	// Check if the converted value is a valid number and not NaN
	return !isNaN(num);
}

function rearrange(disk) {
	for (let i = disk.length - 1; i >= 0; i--) {
		let length = 0;
		if (isNumber(disk[i])) {

			// working backwards, how long is this file?
			const currFileId = disk[i];
			for (let k = i; k >= 0; k--) {
				if (parseInt(disk[k]) === parseInt(currFileId)) {
					length++;
				}
				else {
					// if (parseInt(currFileId) === 8) {
					// 	console.log(`file length for ${currFileId} is: ${length}`);
					// }
					break;
				}
			}

			for (let j = 0; j < disk.length; j++) {
				let freeSpace = 0;
				if (disk[j] === ".") {
					// how long is the free space?
					for (let k = j; k < disk.length; k++) {
						if (disk[k] === ".") {
							freeSpace++;
						}
						else {
							break;
						}
					}

					if (freeSpace >= length && j < i) {
						// swap characters
						for (let k = 0; k < length; k++) {
							const temp = disk[j+k];
							disk[j+k] = disk[i-k];
							disk[i-k] = temp;
						}
						break;
					}

					j+=freeSpace;
				}
			}
		}
		if (length > 0) {
			i-=(length - 1);
		}
	}
	return disk;
}

async function puzzle() {
	// Push each row into an array.
	const rows = await readInput();
	rows.forEach((row) => {
		const disk = row.split("");
		let map = [];
		let fileId = 0;
		for (let i = 0; i < disk.length; i++) {
			const digit = parseInt(disk[i]);
			if (isOdd(i)) {
				// processing free space
				for (let j = 0; j < digit; j++) {
					map.push(".");
				}
			} else {
				// processing a file
				for (let j = 0; j < digit; j++) {
					map.push(fileId.toString());
				}
				fileId++;
			}
		}
		console.log(`orig disk: ${map}`);

		// rearrange
		console.log(`disk map is ${map.length} chars`);
		const optimized = rearrange(map);
		console.log(`optimized: ${optimized}`);
		let checkSum = 0;
		for (let i = 0; i < optimized.length; i++) {
			if (optimized[i] !== ".") {
				checkSum += i * parseInt(optimized[i]); 
			}
		}
		console.log(`checksum: ${checkSum}`);
	});
}

puzzle();
