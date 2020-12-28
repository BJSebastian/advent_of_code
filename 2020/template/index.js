const fs = require('fs');
const inputFilename = "sample.txt";

async function puzzle() {
  const input = await fs.promises.readFile(inputFilename, 'utf-8');
  const lines = input.split('\n');
  lines.forEach((line) => {
    console.log(line);
  });
}

puzzle();

// command to run this program:
// $ node index.js