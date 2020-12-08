const fs = require('fs');

async function readInput() {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  return input.split('\n');
}

async function puzzle() {
  const values = await readInput();
  values.shift();
  let index = 3;
  let treeCount = 0;
  values.forEach((row) => {
    const rowIndex = index % row.length;
    if (row[rowIndex] === '#') {
      treeCount++;
    }
    index += 3;
  });
  console.log(treeCount);
}

puzzle();

// command to run this program:
// $ node index.js