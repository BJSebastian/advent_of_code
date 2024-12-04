/* eslint-disable no-console */
const { count } = require('console');
const fs = require('fs');

async function readInput() {
  const input = fs.readFileSync('sample.txt', 'utf-8');
  // const input = fs.readFileSync('input.txt', 'utf-8');
  return input.split('\n').map((x) => x);
}

// function countOccurrences(str, substr) {
//   let count = 0;
//   let index = 0;

//   while (index !== -1) {
//     index = str.indexOf(substr, index);
//     if (index !== -1) {
//       count++;
//       index += substr.length;
//     }
//   }
//   return count;
// }

async function puzzle() {
  // Get each row into an array.
  const rows = await readInput();
  // turn input into a 2 dimension array...
  const grid = rows.map(str => str.split(''));

  let xmasCount = 0;

  // rows.forEach((row) => {
	// 	console.log(row);
  //   xmasCount += countOccurrences(row, "XMAS");
  //   xmasCount += countOccurrences(row, "SAMX");
  //   console.log(`xmas found ${xmasCount} times in this row`);
  // });

  const charsToCheck = ['M','A','S']; 
  
  // loop across rows...
  for (let i = 0; i < grid.length; i++) {

    // loop across each column within a row...
    for (let j = 0; j < grid[i].length; j++) {

      if (grid[i][j] === "X") {

        // console.log(grid[i][j]);

        // X marks the spot! ...the XMAS word search is on!
        let charsFound = 0;

        // search upward
        for (let k = 0; k < 3; k++) {         
          if (i - (k + 1) >= 0) {
            if (grid[i - (k + 1)][j] === charsToCheck[k]) {
              charsFound++;
            }
          }
        }
        if (charsFound === 3) {
          xmasCount++;
          console.log(`${xmasCount}) row: ${i + 1} col: ${ j + 1} - an upper xmas was found`);
        }

        // search diagnolly upper right
        charsFound = 0;
        for (let k = 0; k < 3; k++) {         
          if (i - (k + 1) >= 0 && j + (k + 1) < rows[i].length) {
            if (grid[i - (k + 1)][j + (k + 1)] === charsToCheck[k]) {
              charsFound++;
            }
          }
        }
        if (charsFound === 3) {
          xmasCount++;
          console.log(`${xmasCount}) row: ${i + 1} col: ${ j + 1} - an upper right xmas was found`);
        }

        // search right
        charsFound = 0;
        for (let k = 0; k < 3; k++) {         
          if (j + (k + 1) < rows[i].length) {
            if (grid[i][j + (k + 1)] === charsToCheck[k]) {
              charsFound++;
            }
          }
        }
        if (charsFound === 3) {
          xmasCount++;
          console.log(`${xmasCount}) row: ${i + 1} col: ${ j + 1} - a right xmas was found`);
        }

        // search diagnolly lower right
        charsFound = 0;
        for (let k = 0; k < 3; k++) {         
          if (i + (k + 1) < rows.length && j + (k + 1) < rows[i].length) {
            if (grid[i + (k + 1)][j + (k + 1)] === charsToCheck[k]) {
              charsFound++;
            }
          }
        }
        if (charsFound === 3) {
          xmasCount++;
          console.log(`${xmasCount}) row: ${i + 1} col: ${ j + 1} - a lower right xmas was found`);
        }

        // search downward
        charsFound = 0;
        for (let k = 0; k < 3; k++) {         
          if (i + (k + 1) < rows.length) {
            if (grid[i + (k + 1)][j] === charsToCheck[k]) {
              charsFound++;
            }
          }
        }
        if (charsFound === 3) {
          xmasCount++;
          console.log(`${xmasCount}) row: ${i + 1} col: ${ j + 1} - a downward xmas was found`);
        }

        // search diagnolly lower left
        charsFound = 0;
        for (let k = 0; k < 3; k++) {         
          if (i + (k + 1) < rows.length && j - (k + 1) >= 0) {
            if (grid[i + (k + 1)][j - (k + 1)] === charsToCheck[k]) {
              charsFound++;
            }
          }
        }
        if (charsFound === 3) {
          xmasCount++;
          console.log(`${xmasCount}) row: ${i + 1} col: ${ j + 1} - a lower left xmas was found`);
        }

        // search left
        charsFound = 0;
        for (let k = 0; k < 3; k++) {         
          if (j - (k + 1) >= 0) {
            if (grid[i][j - (k + 1)] === charsToCheck[k]) {
              charsFound++;
            }
          }
        }
        if (charsFound === 3) {
          xmasCount++;
          console.log(`${xmasCount}) row: ${i + 1} col: ${ j + 1} - a left xmas was found`);
        }

        // search diagnolly upper left
        charsFound = 0;
        for (let k = 0; k < 3; k++) {         
          if (i - (k + 1) >= 0 && j - (k + 1) >= 0) {
            if (grid[i - (k + 1)][j - (k + 1)] === charsToCheck[k]) {
              charsFound++;
            }
          }
        }
        if (charsFound === 3) {
          xmasCount++;
          console.log(`${xmasCount}) row: ${i + 1} col: ${ j + 1} - an upper left xmas was found`);
        }
      }
    }
  }

  console.log();
  console.log(`How many times does XMAS appear? ${xmasCount}`);
}

puzzle();
