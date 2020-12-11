const fs = require('fs');
const inputFilename = "input.txt";

// send in an array of numbers and a number,
// function will return true if the sum of any 2 numbers in the array = the number passed in.
function SumFound(numbers, number) {

  let found = false;

  for (let i = 0; i < numbers.length; i++) {
    for (let j = 1; j < numbers.length; j++) {
      if (i != j) {
        const sum = parseInt(numbers[i]) + parseInt(numbers[j]); 
        // for debugging...
        // console.log(`${numbers[i]} + ${numbers[j]} = ${sum}`);
        if (sum === parseInt(number)) {
          found = true;
          break;
        }
      }
    }
    if (found) break;
  }

  console.log(numbers, number, found);

  return found;
}

async function puzzle() {
  const input = await fs.promises.readFile(inputFilename, 'utf-8');
  const lines = input.split('\n');
  const numbers = [];
  lines.forEach((line) => {
    numbers.push(line);
  });

  // let numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
  // let number = 26; // should come back true.
  // let number = 49; // should come back true.
  // let number = 100; // should come back false.
  // console.log(SumFound(numbers, number));

  let startIndex = 0;
  let preamble = 25;

  for (let i = preamble; i < numbers.length; i++) {
    let found = SumFound(numbers.slice(startIndex, startIndex + preamble), numbers[startIndex + preamble ]);
    startIndex++;
    if (!found) break;
  }

}

puzzle();