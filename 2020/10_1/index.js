const fs = require('fs');
const inputFilename = "input.txt";
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
const numbers = [];
const differences = [];
const uniqueDifferences = new Set();

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
    console.log(`Current adapter ${number} with a difference of ${number - currNumber}`);
    currNumber = number;
  });

  // device has a built-in adapter is always 3 higher than the highest adapter.
  const deviceAdapter = currNumber + 3;
  differences.push(deviceAdapter - currNumber);
  uniqueDifferences.add(deviceAdapter - currNumber);
  console.log(`Device adapter ${deviceAdapter} with a difference of ${deviceAdapter - currNumber}`);

  console.log("--------");
  // console.log(uniqueDifferences);
  uniqueDifferences.forEach(diff => {
    console.log(`There are ${countOccurrences(differences, diff)} differences of ${diff} jolts.`);
  });

}

puzzle();