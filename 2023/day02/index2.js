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
  let gameSum = 0;

  rows.forEach((row) => {
    const gameInfo = row.split(':');
    const sets = gameInfo[1].split(';');
    // const gameNoInfo = gameInfo[0].split(' ');
    // const gameID = parseInt(gameNoInfo[1], 10);
    let fewestBlue = 0;
    let fewestRed = 0;
    let fewestGreen = 0;
    // for debugging...
    // console.log(`Game #: ${gameID} # of sets: ${sets.length}`);
    for (let i = 0; i < sets.length; i += 1) {
      const cubes = sets[i].split(',');
      // for debugging...
      // console.log(`  Set #: ${i + 1}: has ${cubes.length} cubes`);
      for (let j = 0; j < cubes.length; j += 1) {
        const cubeInfo = cubes[j].trim().split(' ');
        // for debugging...
        // console.log(`    Cube is ${cubeInfo[1]} - ${cubeInfo[0]}`);
        const cubeCount = parseInt(cubeInfo[0], 10);
        // eslint-disable-next-line default-case
        switch (cubeInfo[1]) {
          case 'blue':
            if (cubeCount > fewestBlue) {
              fewestBlue = cubeCount;
            }
            break;
          case 'red':
            if (cubeCount > fewestRed) {
              fewestRed = cubeCount;
            }
            break;
          case 'green':
            if (cubeCount > fewestGreen) {
              fewestGreen = cubeCount;
            }
            break;
        }
      }
    }
    const gamePower = fewestBlue * fewestRed * fewestGreen;
    gameSum += gamePower;
    // for debugging...
    // console.log('----------------');
  });
  console.log(`What is the sum of the power of these sets? ${gameSum}`);
}

puzzle();
