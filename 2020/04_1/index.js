const fs = require('fs');

async function readInput() {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  return input.split('\n');
}

async function puzzle() {
  const values = await readInput();
  const credsNeeded = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  let creds = {};
  let validPassports = 0;
  values.forEach((row) => {

    // check for line break/start of new passport...
    if (row === '') {

      if (creds) {

        // for debugging: print out all credentials for current passport.
        // console.log(creds);

        // does our credentials meet the requirements?
        let allCredsFound = true;
        credsNeeded.forEach(element => {
          if (!creds.hasOwnProperty(element)) {
            allCredsFound = false;
            // break;
          }
        });
        if (allCredsFound) {
          console.log("valid passport!");
          validPassports++;
        }
        // else {
        //   console.log("invalid passport :(");
        // }

      }

      // reset credentials object
      // console.log();
      // console.log('new passport found:');
      creds = {};

    } else {
      let fields = row.split(" ");
      fields.forEach(element => {
        entry = element.split(":");
        // console.log(`key: ${entry[0]} value: ${entry[1]}`);
        creds[entry[0]] = entry[1];
      });

      // for debugging:
      // console.log(`row: ${row}`);

    }
  });

  console.log();
  console.log(`# of valid passports: ${validPassports}`);
}

puzzle();

// command to run this program:
// $ node index.js