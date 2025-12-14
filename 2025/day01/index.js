const fs = require("fs");

async function readInput() {
  // cj did it this way:
  const input = fs.readFileSync("sample.txt", "utf-8");
  // const input = fs.readFileSync('input.txt', 'utf-8');
  return input.split("\n").map((x) => x);
}

async function puzzle() {
  // Get each row into an array.
  const rows = await readInput();
  let answer = 0;

  rows.forEach((row) => {
    console.log(`row: ${row}`);
  });
  console.log(`The answer is: ${answer}`);
}

puzzle();
