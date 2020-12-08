const fs = require('fs');

async function readInput() {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  return input.split('\n');
}

async function puzzle() {
  valuesFound = false;
  const values = await readInput();
  console.log(values);
  for (i = 0; i < values.length; i++) {
    if (!valuesFound) {
      for (j = i+1; j < values.length; j++) {
        if (j != i) {
          console.log(values[i], values[j], parseInt(values[i]) + parseInt(values[j]));
          if (parseInt(values[i]) + parseInt(values[j]) == 2020) {
            console.log("^^^ these two entries sum up to 2020!");
            sum = parseInt(values[i]) * parseInt(values[j]);
            console.log("mutliplied together they equal: " + sum);
            // valuesFound = true;
            // break;
          }
        }
      }
    }
    else {
      break;
    }
  }
}

puzzle();

// command to run this program:
// $ node index.js