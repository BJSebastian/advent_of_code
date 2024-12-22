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
	let replaced = false;
	// console.log(`disk length: ${disk.length}`);
	const startingDisk = disk.join('');
	console.log(`starting disk: ${disk.join('')}`);
	for (let i = disk.length - 1; i >= 0; i--) {
		// console.log(`looking at right position ${i} with char ${disk[i]}`);
		if (isNumber(disk[i])) {
			for (let j = 0; j < disk.length; j++) {
				// console.log(`looking at right position ${j} with char ${disk[j]}`);
				if (disk[j] === ".") {
					if (j < i) {
						// swap characters
						const temp = disk[j];
						disk[j] = disk[i];
						disk[i] = temp;
						// console.log(`swapping ${j} with ${i}... new disk: ${disk.join('')}`);
						// console.log(` updated disk: ${disk.join('')}`);
						// console.log(`--------------------`);
						replaced = true;
						break;
					}
				}
			}
		}
		if (replaced) {
			break;
		}
	}
	if (startingDisk !== disk.join('')) {
		return rearrange(disk);
	}
	else {
		// console.log(`weve reached the end!`);
		// console.log(`returning disk: ${disk.join('')}`);
		return disk.join('');
	}
}

async function puzzle() {
	// Get each row into an array.
	const rows = await readInput();
	rows.forEach((row) => {
		console.log(row);
		const disk = row.split("");
		let map = "";
		let fileId = 0;
		for (let i = 0; i < disk.length; i++) {
			const digit = parseInt(disk[i]);
			if (isOdd(i)) {
				// processing free space
				for (let j = 0; j < digit; j++) {
					map += ".";
				}
			} else {
				// processing a file
				for (let j = 0; j < digit; j++) {
					map += fileId;
				}
				fileId++;
			}
		}
		console.log(map);

		// rearrange
		console.log(`disk map is ${map.length} chars`);
		// const optimized = rearrange(map.split(""));
		// console.log(`optimized: ${optimized}`);

	});
}

puzzle();
