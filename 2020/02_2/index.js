const fs = require('fs');

async function readInput() {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  return input.split('\n');
}

async function puzzle() {
  const values = await readInput();

  let validPasswords = 0;

  values.forEach((value) => {
    const ruleParms = value.split(" ");
    const positions = ruleParms[0].split("-");
    const password = ruleParms[2];
    const rule = {charToCheck:ruleParms[1][0], pos1:parseInt(positions[0]), pos2:parseInt(positions[1])};
    const count = password.split(rule.charToCheck).length - 1;

    console.log(`for passwowrd "${password}"... ${rule.charToCheck} must appear either in the ${rule.pos1} or ${rule.pos2} positions, but not both.`);

    foundPositions = 0;
    if (password[rule.pos1 - 1] == rule.charToCheck) foundPositions++;
    if (password[rule.pos2 - 1] == rule.charToCheck) foundPositions++;

    if (foundPositions == 1) {
      validPasswords++;
      console.log("Valid Password");
    }
    else {
      console.log("Invalid Password");
    }
    console.log();

  });

  console.log(`# of valid passwords: ${validPasswords}`);

}

puzzle();

// command to run this program:
// $ node index.js