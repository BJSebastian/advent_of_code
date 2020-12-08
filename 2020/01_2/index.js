const fs = require('fs');

async function readInput() {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  return input.split('\n');
}

async function puzzle() {
  valuesFound = false;
  const values = await readInput();
  for (i = 0; i < values.length; i++) {
    if (!valuesFound) {
      for (j = i+1; j < values.length; j++) {
        if (!valuesFound) {
          for (k = j+1; k < values.length; k++) {
            if (j != i && k != i && k != j) {
              console.log(values[i], values[j], values[k], parseInt(values[i]) + parseInt(values[j]) + parseInt(values[k]));
              if (parseInt(values[i]) + parseInt(values[j]) + parseInt(values[k]) == 2020) {
                console.log("^^^ these 3 entries sum up to 2020!");
                sum = parseInt(values[i]) * parseInt(values[j]) * parseInt(values[k]);
                console.log("mutliplied together they equal: " + sum);
                valuesFound = true;
                break;
              }
            }
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