import * as fs from 'fs';

async function readInput() {
  // const input = fs.readFileSync('sample.txt', 'utf-8');
  const input = fs.readFileSync('input.txt', 'utf-8');
  return input.split('\n').map((x) => x);
}

function moveGuard(
  grid: string[][],
  direction: string,
  row: number,
  col: number
): string[][] {
  switch (direction) {
    case 'up':
      row--;
      break;
    case 'right':
      col++;
      break;
    case 'down':
      row++;
      break;
    case 'left':
      col--;
      break;
  }
  if (row > -1 && row < grid.length && col > -1 && col < grid[0].length) {
    // console.log(`The guard is at cell: [${row}, ${col}]`);
    if (grid[row][col] === '#') {
      // moveGuard(grid, direction, row, col);
      // return grid;
      switch (direction) {
        case 'up':
          row++;
          direction = 'right';
          break;
        case 'right':
          col--;
          direction = 'down';
          break;
        case 'down':
          row--;
          direction = 'left';
          break;
        case 'left':
          col++;
          direction = 'up';
          break;
      }
      moveGuard(grid, direction, row, col);
    } else {
      grid[row][col] = 'X';
      moveGuard(grid, direction, row, col);
    }
    // grid[row][col] = 'X';
    // moveGuard(grid, direction, row, col);
  }
  return grid;
}

function countOccurrences(str: string, substr: string): number {
  let count = 0;
  let index = 0;

  while (index !== -1) {
    index = str.indexOf(substr, index);
    if (index !== -1) {
      count++;
      index += substr.length;
    }
  }

  return count;
}

async function puzzle() {
  // Get each row into an array.
  const rows = await readInput();
  // turn input into a 2 dimension array...
  const grid = rows.map((str) => str.split(''));

  // console.log(grid);

  let guardRow = 0;
  let guardCol = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const cell = grid[row][col];
      // console.log(`Cell at [${row}, ${col}]: ${cell}`);
      if (cell === '^') {
        console.log(`The guard is at cell: [${row}, ${col}] ...LET'S GO!`);
        grid[row][col] = 'X';
        guardRow = row;
        guardCol = col;
      }
    }
  }

  let guardDirection = 'up';
  moveGuard(grid, guardDirection, guardRow, guardCol);

  console.log(`----------`);

  let guardPositions = 0;
  grid.forEach((row) => {
    console.log(
      `row: ${row.join('')} has ${countOccurrences(row.join(''), 'X')} distinct guard positions.`
    );
    guardPositions += countOccurrences(row.join(''), 'X');
  });
  console.log(`There are ${guardPositions} distict guard positions`);
}

puzzle();
