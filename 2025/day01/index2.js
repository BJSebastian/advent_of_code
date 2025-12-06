/* eslint-disable no-console */
const fs = require("fs");

async function readInput() {
  // This is how I originally did this
  // const input = await fs.promises.readFile('sample.txt', 'utf-8');
  // const input = await fs.promises.readFile('input.txt', 'utf-8');

  // cj did it this way:
  // const input = fs.readFileSync("sample.txt", "utf-8");
  const input = fs.readFileSync("input.txt", "utf-8");
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
      const startingPosition = currPosition;
      let positions = parseInt(row.slice(1), 10);
      const allPositions = positions;

      if (row[0] === "L") {
        //----------------------------------------------------------------------------------
        // turning dial to the left
        //----------------------------------------------------------------------------------
        if (positions > 100) {
          positions = parseInt(row.slice(-2), 10);
        }

        currPosition -= positions;

        if (currPosition < 0) {
          currPosition += 100;
        }

        // if we are turning the dial to the left...
        // and the current position is now greater than the staring position...
        // we know we crossed over 0 at least once.
        if (startingPosition !== 0 && currPosition !== 0 && currPosition > startingPosition) {
          positionsAtZero += 1;
          console.log(`<-- crossed zero going left from ${startingPosition} to ${currPosition}`);
        }

        console.log(`rotate left ${positions} positions to point at ${currPosition}`);
      } else {
        //----------------------------------------------------------------------------------
        // turning dial to the right
        //----------------------------------------------------------------------------------
        if (positions > 100) {
          positions = parseInt(row.slice(-2), 10);
        }

        currPosition += positions;

        if (currPosition >= 100) {
          currPosition -= 100;
        }

        // if we are turning the dial to the right...
        // and the current position is now less than the starting position...
        // we know we crossed over 0 at least once.
        if (startingPosition !== 0 && currPosition !== 0 && currPosition < startingPosition) {
          positionsAtZero += 1;
          console.log(`--> crossed zero going right from ${startingPosition} to ${currPosition}`);
        }

        console.log(`rotate right: ${positions} positions to point at ${currPosition}`);
      }
      if (allPositions >= 100) {
        positionsAtZero += Math.floor(allPositions / 100);
      }
      if (currPosition === 0) {
        positionsAtZero += 1;
      }
    }
  });
  console.log(`Positions at zero: ${positionsAtZero}`);
}

puzzle();
