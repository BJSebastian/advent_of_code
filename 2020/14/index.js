// https://github.com/mariotacke/advent-of-code-2020/tree/master/day-14-docking-data
const fs = require('fs');
// const inputFilename = "sample.txt";
const inputFilename = "input.txt";
const docking = require('./docking');
const docking2 = require('./docking2');

async function puzzle() {
  const input = await fs.promises.readFile(inputFilename, 'utf-8');

  console.log(docking(input));

  console.log(docking2(input));
}

puzzle();
