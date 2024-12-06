import { dir } from 'console';
import * as fs from 'fs';

async function readInput() {
  const input = fs.readFileSync('sample.txt', 'utf-8');
  // const input = fs.readFileSync('input.txt', 'utf-8');
  return input.split('\n').map((x) => x);
}

function moveGuard(direction: string, maxCol: number, maxRow: number) {
  switch (direction) {
    
  }
}

async function puzzle() {
  // Get each row into an array.
  const rows = await readInput();
  // turn input into a 2 dimension array...
  const grid = rows.map((str) => str.split(''));

  // console.log(grid);

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const cell = grid[row][col];
      // console.log(`Cell at [${row}, ${col}]: ${cell}`);
      if (cell === "^") {
        console.log(`The guard is at cell: [${row}, ${col}] ...LET'S GO!`);
        grid[row][col] = "X";
      }
    }
  }

  // console.log(`----------`);
  // console.log(grid);

  let currDirection = "up";

}

puzzle();
