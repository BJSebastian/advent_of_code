const fs = require('fs');

async function readInput() {
  // const input = await fs.promises.readFile('sample.txt', 'utf-8');
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  return input.split('\n');
}

function runInstructions(instructions) {
  let accumulator = 0;
  let instIndex = 0;
  let keepExecuting = true;
  let executionCounter = 0;
  let programWorked = false;

  while (keepExecuting) {
    if (instructions[instIndex].executed == true) {
      // infiniute loop found, break out of loop...
      keepExecuting = false;
    } else {
      executionCounter++;
      instructions[instIndex].executionCount = executionCounter;
      instructions[instIndex].executed = true;
      instructions[instIndex].accum = accumulator;

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

      if (instIndex + 1 > instructions.length) {
        programWorked = true;
        keepExecuting = false;
      }
    }
  }

  return {
    accumulator: accumulator,
    worked: programWorked
  };
}

async function puzzle() {
  const values = await readInput();

  // add all instructions into an array of objects
  // each object will have an "instruction" and an "argument".
  const instructions = [];
  values.forEach((line) => {
    const [instruct, arg] = line.split(' ');
    instructions.push({
      instruction: instruct,
      direction: arg[0],
      argument: parseInt(arg.substring(1)),
      executed: false,
      executionCount: 0,
      accum: 0
    });
  });

  const program = runInstructions(JSON.parse(JSON.stringify(instructions)));
  console.log(`Boot program ${program.worked ? "worked" : "failed" } and the accumulator is: ${program.accumulator}`);

  // run the program repeatedly by switching each nop to jmp or jmp to nop until we have a good execution.
  for (let i = 0; i < instructions.length; i++) {

    // only try program where we are making a change to the instructions (so only for jmp or nop instructions)
    if (instructions[i].instruction === "jmp" ||
      instructions[i].instruction === "nop") {

      // create a clone of the instructions array to execute with.
      const instructionSet = JSON.parse(JSON.stringify(instructions));
      if (instructionSet[i].instruction === "jmp") {
        instructionSet[i].instruction = "nop";
      } else if (instructionSet[i].instruction === "nop") {
        instructionSet[i].instruction = "jmp";
      }
      const program = runInstructions(JSON.parse(JSON.stringify(instructionSet)));
      console.log(`Boot program ${program.worked ? "worked" : "failed" } and the accumulator is: ${program.accumulator}`);
      if (program.worked) {
        break;
      }

    }
  }
}

puzzle();