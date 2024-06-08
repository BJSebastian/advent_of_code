/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
const fs = require('fs');

async function readInput() {
  const input = fs.readFileSync('sample.txt', 'utf-8');
  // const input = fs.readFileSync('input.txt', 'utf-8');
  return input.split('\n').map((x) => x);
}

async function puzzle() {
  // Get each line/row into an array.
  const rows = await readInput();

  // process input.
  for (let i = 0; i < rows.length; i += 1) {
    console.log(rows[i]);
  }
}

puzzle();
