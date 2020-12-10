const fs = require('fs');
let answeredYes = [];
let totalAnsweredYes = 0;

function processGroup() {
  console.log(`processing group with ${answeredYes.length} yes answers.`);
  totalAnsweredYes += answeredYes.length;
  // reset array of answers.
  answeredYes = [];
}

async function readInput() {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  return input.split('\n');
}

async function puzzle() {
  const values = await readInput();
  values.forEach((row) => {

    if (row === '') {
      processGroup();
    }
    else {
      for (let i = 0; i < row.length; i++) {
        if (!(answeredYes.includes(row[i]))) {
          answeredYes.push(row[i]);
        } 
      }
    }

  });

  processGroup();

  console.log(`Total yes answers for all groups ${totalAnsweredYes}`);
}

puzzle();