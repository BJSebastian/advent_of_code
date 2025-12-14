/* eslint-disable no-console */
const fs = require("fs");

async function readInput() {
  // This is how I originally did this
  // const input = await fs.promises.readFile('sample.txt', 'utf-8');
  // const input = await fs.promises.readFile('input.txt', 'utf-8');

  // cj did it this way:
  // const input = fs.readFileSync("sample.txt", "utf-8");
  const input = fs.readFileSync('input.txt', 'utf-8');
  return input.split("\n").map((x) => x);
}

async function puzzle() {
  // Get each row into an array.
  const rows = await readInput();
  let currPosition = 50;
  let positionsAtZero = 0;

  rows.forEach((row) => {
    // console.log(`row: ${row}`);
    if (row.length > 0) {
      let positions = parseInt(row.slice(1), 10);
      if (row[0] === "L") {
				if (positions > 100) {
					positions = parseInt(row.slice(-2), 10);
				}
        currPosition -= positions;
        if (currPosition < 0) {
          currPosition += 100;
        }
        console.log(`rotate left ${positions} positions to point at ${currPosition}`);
      } else {
				if (positions > 100) {
					positions = parseInt(row.slice(-2), 10);
				}
        currPosition += positions;
        if (currPosition >= 100) {
          currPosition -= 100;
        }
        console.log(`rotate right: ${positions} positions to point at ${currPosition}`);
      }
      if (currPosition === 0) {
        positionsAtZero += 1;
      }
    }
  });
  console.log(`Positions at zero: ${positionsAtZero}`);
}

puzzle();
