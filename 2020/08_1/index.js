const fs = require('fs');

async function readInput() {
  // const input = await fs.promises.readFile('sample.txt', 'utf-8');
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  return input.split('\n');
}

async function puzzle() {
  const values = await readInput();

  // add all instructions into an array of objects...
  const instructions = [];
  values.forEach((line) => {
    const [instruct, arg] = line.split(' ');
    instructions.push({
      instruction: instruct,
      direction: arg[0],
      argument: parseInt(arg.substring(1)),
      executed: false
    });
  });

  let accumulator = 0;
  let instIndex = 0;
  let keepExecuting = true;

  while (keepExecuting) {
    if (instructions[instIndex].executed == true) {
      // infiniute loop found, break out of loop...
      keepExecuting = false;
    } else {

      instructions[instIndex].executed = true;

      switch (instructions[instIndex].instruction) {

        case "acc":
          if (instructions[instIndex].direction === "-") {
            accumulator -= instructions[instIndex].argument;
          } else {
            accumulator += instructions[instIndex].argument;
          }
          instIndex++;
          break;

        case "jmp":
          if (instructions[instIndex].direction === "-") {
            instIndex -= instructions[instIndex].argument;
          } else {
            instIndex += instructions[instIndex].argument;
          }
          break;

        case "nop":
          instIndex++;
          break;

      }
    }
  }

  console.log(`Accumulator is: ${accumulator}`);

}

puzzle();