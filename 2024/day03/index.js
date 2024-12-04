/* eslint-disable no-console */
const fs = require("fs");

async function readInput() {
	// const input = fs.readFileSync("sample.txt", "utf-8");
	const input = fs.readFileSync('input.txt', 'utf-8');
	return input.split("mul").map((x) => x);
}

async function puzzle() {
	// Get each row into an array.
  let result = 0;
	const instructions = await readInput();
	instructions.forEach((instruction) => {
    console.log(`process instruction: ${instruction}`);
    if (instruction[0] === "(") {
      const index = instruction.indexOf(")");
      if (index > 0 && instruction.includes(",") && instruction.split(',').length > 1) {
        const valueString = instruction.substring(0, index + 1);
        const values = valueString.substring(1, valueString.length - 1).split(',');
        // console.log(`value 1: ${values[0]} value 2: ${values[1]}`);
        if (!isNaN(values[0]) && !isNaN(values[1])) {
          console.log(valueString);
          result += parseInt(values[0]) * parseInt(values[1]);
        }
        else {
          console.log(`bad instruction: ${valueString}`);
        }
      }
    }
    console.log(`-----------------`);
	});
  console.log(`result of adding up all of the results of the multiplications: ${result}`)
}

puzzle();
