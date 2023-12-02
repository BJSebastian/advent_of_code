/* eslint-disable no-console */
const fs = require('fs');

async function readInput() {
  // This is how I originally did this
  // const input = await fs.promises.readFile('sample.txt', 'utf-8');
  // const input = await fs.promises.readFile('input.txt', 'utf-8');

  // cj did it this way:
  // const input = fs.readFileSync('sample2.txt', 'utf-8');
  const input = fs.readFileSync('input2.txt', 'utf-8');
  return input.split('\n').map((x) => x);
}

async function puzzle() {
  // Get each row into an array.
  const rows = await readInput();

  let calibrationValue = 0;

  rows.forEach((row) => {
    let firstDigit = 0;
    let lastDigit = 0;

    console.log(row);

    let convertedRow = row.replaceAll('eightwo', '82');
    convertedRow = convertedRow.replaceAll('oneight', '18');
    convertedRow = convertedRow.replaceAll('threeight', '38');
    convertedRow = convertedRow.replaceAll('fiveight', '58');
    convertedRow = convertedRow.replaceAll('sevenine', '79');
    convertedRow = convertedRow.replaceAll('nineight', '98');
    convertedRow = convertedRow.replaceAll('twoneight', '218');
    convertedRow = convertedRow.replaceAll('twone', '21');
    convertedRow = convertedRow.replaceAll('one', '1');
    convertedRow = convertedRow.replaceAll('two', '2');
    convertedRow = convertedRow.replaceAll('three', '3');
    convertedRow = convertedRow.replaceAll('four', '4');
    convertedRow = convertedRow.replaceAll('five', '5');
    convertedRow = convertedRow.replaceAll('six', '6');
    convertedRow = convertedRow.replaceAll('seven', '7');
    convertedRow = convertedRow.replaceAll('eight', '8');
    convertedRow = convertedRow.replaceAll('nine', '9');

    console.log(`converted row: ${convertedRow}`);

    // get 1st digit
    for (let i = 0; i < convertedRow.length; i += 1) {
      if (parseInt(convertedRow[i], 10)) {
        firstDigit = convertedRow[i];
        break;
      }
    }

    // get last digit
    for (let i = convertedRow.length; i > -1; i -= 1) {
      if (parseInt(convertedRow[i], 10)) {
        lastDigit = convertedRow[i];
        break;
      }
    }

    const rowNumber = firstDigit + lastDigit;
    calibrationValue += parseInt(rowNumber, 10);

    console.log(firstDigit);
    console.log(lastDigit);
    console.log(`row number: ${rowNumber}`);
    console.log('---------------');
  });

  console.log(`calibration value: ${calibrationValue}`);
}

puzzle();
