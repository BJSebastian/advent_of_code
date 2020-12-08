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
    const minMax = ruleParms[0].split("-");
    const password = ruleParms[2];
    const rule = {charToCheck:ruleParms[1][0], minTimes:parseInt(minMax[0]), maxTimes:parseInt(minMax[1])};
    const count = password.split(rule.charToCheck).length - 1;

    console.log(`for passwowrd "${password}"... ${rule.charToCheck} must appear a min of: ${rule.minTimes} times and a max of ${rule.maxTimes} times.`);
    console.log(`${rule.charToCheck} appears ${count} times`);
    if (count >= rule.minTimes && count <= rule.maxTimes) {
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