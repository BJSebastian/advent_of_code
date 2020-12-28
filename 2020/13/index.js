// https://github.com/mariotacke/advent-of-code-2020/tree/master/day-13-shuttle-search
const fs = require('fs');
const inputFilename = "input.txt";
const shuttle = require('./shuttle');
const shuttle2 = require('./shuttle2');

async function puzzle() {
  const input = await fs.promises.readFile(inputFilename, 'utf-8');

  console.log(shuttle(input));

  console.log(shuttle2(input));
}

puzzle();