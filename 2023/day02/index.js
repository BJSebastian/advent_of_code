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
    const gameNoInfo = gameInfo[0].split(' ');
    const sets = gameInfo[1].split(';');
    const gameID = parseInt(gameNoInfo[1], 10);
    let includeGame = true;
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
        // eslint-disable-next-line default-case
        switch (cubeInfo[1]) {
          case 'red':
            if (parseInt(cubeInfo[0], 10) > 12) {
              includeGame = false;
            }
            break;
          case 'green':
            if (parseInt(cubeInfo[0], 10) > 13) {
              includeGame = false;
            }
            break;
          case 'blue':
            if (parseInt(cubeInfo[0], 10) > 14) {
              includeGame = false;
            }
            break;
        }
        if (!includeGame) {
          break;
        }
      }
    }
    if (includeGame) {
      // for debugging...
      // console.log('INCLUDE this game!');
      gameSum += gameID;
    }
    // for debugging...
    // console.log('----------------');
  });
  console.log(`What is the sum of the IDs of those games? ${gameSum}`);
}

puzzle();
