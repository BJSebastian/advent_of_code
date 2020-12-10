const fs = require('fs');

async function readInput() {
  const input = await fs.promises.readFile('sample.txt', 'utf-8');
  // const input = await fs.promises.readFile('input.txt', 'utf-8');
  return input.split('\n');
}

async function puzzle() {
  const values = await readInput();
  values.forEach((row) => {
    console.log(row);
  });
}

puzzle();

// command to run this program:
// $ node index.js