const fs = require('fs');

async function readInput() {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  return input.split('\n');
}

async function puzzle(increment, down = 1) {
  const values = await readInput();
  let index = increment;
  let treeCount = 0;

  for (let i = down; i < values.length; i += down) {
    const row = values[i];
    const rowIndex = index % row.length;
    if (row[rowIndex] === '#') {
      treeCount++;
    }
    index += increment;
  }

  return treeCount;
}

Promise.all(
    [puzzle(1), puzzle(3), puzzle(5), puzzle(7), puzzle(1, 2)]
  ).then((answers) => {
    // console.log(answers);
    return answers.reduce((product, value) => product * value, 1);
  })
  .then(console.log);
