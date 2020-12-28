// https://github.com/mariotacke/advent-of-code-2020/tree/master/day-12-rain-risk
const fs = require('fs');
const inputFilename = "input.txt";
const ship = require('./ship');
const ship2 = require('./ship2');

async function puzzle() {
  const input = await fs.promises.readFile(inputFilename, 'utf-8');

  console.log(ship(input));

  console.log(ship2(input));
}

puzzle();