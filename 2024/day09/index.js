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
    if (isNumber(disk[i])) {
      for (let j = 0; j < disk.length; j++) {
        if (disk[j] === ".") {
          if (j < i) {
            // swap characters
            const temp = disk[j];
            disk[j] = disk[i];
            disk[i] = temp;
          }
        }
      }
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

    // rearrange
    console.log(`disk map is ${map.length} chars`);
    const optimized = rearrange(map);
    console.log(`optimized: ${optimized}`);
    let checkSum = 0;
    for (let i = 0; i < optimized.length; i++) {
      if (optimized[i] === ".") {
        break;
      }
      else {
        checkSum += i * parseInt(optimized[i]); 
      }
    }
    console.log(`checksum: ${checkSum}`);
	});
}

puzzle();
