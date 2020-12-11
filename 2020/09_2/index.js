const fs = require('fs');
const inputFilename = "input.txt";

// send in an array of numbers and a number,
// function will return true if the sum of any 2 numbers in the array = the number passed in.
function sumFound(numbers, number) {

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

function getContiguous(numbers, number) {

  let found = false;
  let low = 999999999;
  let high = 0;

  for (let i = 0; i < numbers.length; i++) {

    // for debugging...
    // console.log("--------");

    let sum = parseInt(numbers[i]);
    // for debugging...
    // console.log(`${sum} = ${numbers[i]}`);

    let contiguousNumbers = [];
    contiguousNumbers.push(parseInt(numbers[i]));
    for (let j = i + 1; j < numbers.length; j++) {
      contiguousNumbers.push(parseInt(numbers[j]));
      sum += parseInt(numbers[j]);
      // for debugging...
      // console.log(`${sum} += ${numbers[j]}`);
      if (sum === parseInt(number)) {
        console.log(`contiguous #s found: ${contiguousNumbers}`);
        found = true;
        break;
      }
    }
    if (found) {
      contiguousNumbers.forEach(number => {
        if (number < low) low = number;
        if (number > high) high = number;
      });
      break;
    }
  }

  return {
    found: found,
    low: low,
    high: high
  };
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
  // let preamble = 5;

  for (let i = preamble; i < numbers.length; i++) {
    let found = sumFound(numbers.slice(startIndex, startIndex + preamble), numbers[startIndex + preamble]);
    startIndex++;
    if (!found) break;
  }

  // found = getContiguous(numbers, 127); // testing against sample.txt
  contiguous = getContiguous(numbers, 104054607); // just plugging in answer from step 1.

  console.log(`contiguous found ${contiguous.found} with a low of ${contiguous.low} and a high of ${contiguous.high} with a sum of ${contiguous.low+contiguous.high}`);

}

puzzle();