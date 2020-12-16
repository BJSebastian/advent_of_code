const fs = require('fs');
const {
  isNumber
} = require('util');
const inputFilename = "sample_2.txt";
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
const numbers = [];
const differences = [];
const uniqueDifferences = new Set();
let adapterArrangements = 0;

function addAdapter(number) {
  let adapterAdded = false;
  for (let i = 1; i < 4; i++) {
    if (countOccurrences(numbers, number + i) > 0) {
      adapterAdded = true;
      addAdapter(number + i);
    }
  }
  if (!adapterAdded) {
    adapterArrangements++;
  }
}

async function puzzle() {
  const input = await fs.promises.readFile(inputFilename, 'utf-8');
  const lines = input.split('\n');
  lines.forEach((line) => {
    numbers.push(parseInt(line));
  });

  // NOTE: In order to sort an array of numbers you have to get a bit funky!
  // This is because the array.sort() method only sorts an array alphabetically by default.
  numbers.sort((a, b) => a - b);
  let currNumber = 0;
  numbers.forEach((number) => {
    differences.push(number - currNumber);
    uniqueDifferences.add(number - currNumber);
    currNumber = number;
  });

  // device has a built-in adapter is always 3 higher than the highest adapter.
  const deviceAdapter = currNumber + 3;
  differences.push(deviceAdapter - currNumber);
  uniqueDifferences.add(deviceAdapter - currNumber);

  console.log("figuring it out! please wait...");

  // recursively figure out all possible arrangements.
  // NOTE: This works pretty well for sample 1 and 2, BUT takes forever for the puzzle input...
  addAdapter(0);

  console.log(`There are a total of ${adapterArrangements} distinct arrangements.`);

}

puzzle();