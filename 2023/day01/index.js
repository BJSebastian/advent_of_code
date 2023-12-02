/* eslint-disable no-console */
const fs = require('fs');

async function readInput() {
  // This is how I originally did this
  // const input = await fs.promises.readFile('sample.txt', 'utf-8');
  // const input = await fs.promises.readFile('input.txt', 'utf-8');

  // cj did it this way:
  // const input = fs.readFileSync('sample.txt', 'utf-8');
  const input = fs.readFileSync('input.txt', 'utf-8');
  return input.split('\n').map((x) => x);
}

async function puzzle() {
  // Get each row into an array.
  const rows = await readInput();

  let calibrationValue = 0;

  rows.forEach((row) => {
    let firstDigit = 0;
    let lastDigit = 0;

    // get 1st digit
    for (let i = 0; i < row.length; i += 1) {
      if (parseInt(row[i], 10)) {
        firstDigit = row[i];
        break;
      }
    }

    // get last digit
    for (let i = row.length; i > -1; i -= 1) {
      if (parseInt(row[i], 10)) {
        lastDigit = row[i];
        break;
      }
    }

    const rowNumber = firstDigit + lastDigit;
    calibrationValue += parseInt(rowNumber, 10);

    console.log(row);
    console.log(firstDigit);
    console.log(lastDigit);
    console.log(`row number: ${rowNumber}`);
    console.log('---------------');
  });

  console.log(`calibration value: ${calibrationValue}`);
}

puzzle();
