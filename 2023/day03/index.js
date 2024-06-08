/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
const fs = require('fs');

async function readInput() {
  // const input = fs.readFileSync('sample.txt', 'utf-8');
  const input = fs.readFileSync('input.txt', 'utf-8');
  return input.split('\n').map((x) => x);
}

const isDigit = (char) => /[0-9]/.test(char);
const isSymbol = (char) => char !== '.' && !isDigit(char);

// function checkPart(checkValue) {
//   return (checkValue === '/' || checkValue === '-' || checkValue === '*' || (checkValue !== '0' && !parseInt(checkValue, 10) && (checkValue !== '.')));
// }

async function puzzle() {
  fs.writeFileSync('output.txt', 'starting program\n', (err) => {
    // In case of a error throw err.
    if (err) throw err;
  });

  // Get each line/row into an array.
  const rows = await readInput();
  const grid = [];
  const parts = [];
  let partSum = 0;

  // load the 2d array.
  for (let i = 0; i < rows.length; i += 1) {
    const rowArray = [...rows[i]];
    // to create a 2d array, just push the row array into the grid array.
    // so now we have a (row) array within the (grid) array.
    grid.push(rowArray);

    let number = '';
    let coords = [];
    for (let j = 0; j < rowArray.length; j += 1) {
      if (isDigit(rowArray[j], 10)) {
        number += rowArray[j];
        coords.push([i, j]);
      } else if (number.length) {
        parts.push({
          partNo: parseInt(number.trim(), 10),
          coords,
          isPart: false,
        });
        number = '';
        coords = [];
      }
    }
    // DON'T FORGET!!!... to process the last item.
    if (number.length) {
      parts.push({
        partNo: parseInt(number.trim(), 10),
        coords,
        isPart: false,
      });
      number = '';
      coords = [];
    }
  }

  // print out the 2d array
  // for (let i = 0; i < grid.length; i += 1) {
  //   let line = '';
  //   for (let j = 0; j < grid[i].length; j += 1) {
  //     line += `${grid[i][j]} `;
  //   }
  //   console.log(line);
  // }

  // print out parts
  // for (let i = 0; i < parts.length; i += 1) {
  //   console.log(parts[i]);
  // }

  // print out parts
  for (let i = 0; i < parts.length; i += 1) {
    // check coords
    for (const coords of parts[i].coords) {
      // check above (when necessary)
      if (coords[0] > 0) {
        if (isSymbol(grid[coords[0] - 1][coords[1]])) {
          parts[i].isPart = true;
        }
      }
      // check above right (when necessary)
      if (coords[0] > 0 && coords[1] < grid[coords[0]].length - 1) {
        if (isSymbol(grid[coords[0] - 1][coords[1] + 1])) {
          parts[i].isPart = true;
        }
      }

      // check right (when necessary)
      if (coords[1] < grid[coords[0]].length - 1) {
        if (isSymbol(grid[coords[0]][coords[1] + 1])) {
          parts[i].isPart = true;
        }
      }

      // check below right (when necessary)
      if (coords[0] < grid.length - 1 && coords[1] < grid[coords[0]].length - 1) {
        if (isSymbol(grid[coords[0] + 1][coords[1] + 1])) {
          parts[i].isPart = true;
        }
      }

      // check below (when necessary)
      if (coords[0] < grid.length - 1) {
        if (isSymbol(grid[coords[0] + 1][coords[1]])) {
          parts[i].isPart = true;
        }
      }

      // check below left (when necessary)
      if (coords[0] < grid.length - 1 && coords[1] > 0) {
        if (isSymbol(grid[coords[0] + 1][coords[1] - 1])) {
          parts[i].isPart = true;
        }
      }

      // check left (when necessary)
      if (coords[1] > 0) {
        if (isSymbol(grid[coords[0]][coords[1] - 1])) {
          parts[i].isPart = true;
        }
      }

      // check above left (when necessary)
      if (coords[0] > 0 && coords[1] > 0) {
        if (isSymbol(grid[coords[0] - 1][coords[1] - 1])) {
          parts[i].isPart = true;
        }
      }
    }

    if (parts[i].isPart) {
      partSum += parts[i].partNo;
    }

    fs.appendFileSync('output.txt', `${JSON.stringify(parts[i])}\n`, (err) => {
      if (err) {
        console.error(err);
      }
    });

    console.log(parts[i]);
  }

  console.log(`What is the sum of all of the part numbers in the engine schematic? ${partSum}`);

  fs.appendFileSync('output.txt', `What is the sum of all of the part numbers in the engine schematic? ${partSum}\n`, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

puzzle();
