/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
const fs = require('fs');

async function readInput() {
  // const input = fs.readFileSync('sample.txt', 'utf-8');
  const input = fs.readFileSync('input.txt', 'utf-8');
  return input.split('\n').map((x) => x);
}

async function puzzle() {
  // Get each line/row into an array.
  const rows = await readInput();
  let totalPoints = 0;

  // process input.
  for (let i = 0; i < rows.length; i += 1) {
    const cards = rows[i].trim().split(':');
    const numbers = cards[1].trim().split('|');
    const winningNumbers = numbers[0].trim().replace('  ', ' ').split(' ');
    const myNumbers = numbers[1].trim().replace('  ', ' ').split(' ');

    // for debugging...
    // console.log(`winning #s: ${winningNumbers} my #s: ${myNumbers}`);

    // find winning numbers for this card.
    let pointsAvailable = 1;
    let pointsEarned = 0;
    for (let j = 0; j < myNumbers.length; j += 1) {
      if (winningNumbers.find((winningNumber) => parseInt(winningNumber, 10) === parseInt(myNumbers[j], 10))) {
        console.log(`processing ${cards[0]}: ${myNumbers[j]} is a winning number... ${pointsAvailable} points earned.`);
        pointsEarned = pointsAvailable;
        pointsAvailable *= 2;
      }
    }
    totalPoints += pointsEarned;
    console.log(`This card earned ${pointsEarned} points!`);
    console.log('------------');
  }

  console.log(`How many points are they worth in total? ${totalPoints}`);
}

puzzle();
