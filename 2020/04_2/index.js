const fs = require('fs');

async function readInput() {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  return input.split('\n');
}

async function puzzle() {
  const values = await readInput();
  const credsNeeded = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  const validEyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
  let creds = {};
  let validPassports = 0;
  values.forEach((row) => {

    // check for line break/start of new passport...
    if (row === '') {

      if (creds) {

        // for debugging: print out all credentials for current passport.
        // console.log(creds);

        // does our credentials meet the requirements?
        let validCreds = true;
        credsNeeded.forEach(element => {
          if (!creds.hasOwnProperty(element)) {
            validCreds = false;
          } else {
            switch (element) {
              case "byr":
                if (parseInt(creds.byr) < 1920 || parseInt(creds.byr) > 2002) {
                  console.log("byr invalid!");
                  validCreds = false;
                }
                break;
              case "iyr":
                if (parseInt(creds.iyr) < 2010 || parseInt(creds.iyr) > 2020) {
                  console.log("iyr invalid!");
                  validCreds = false;
                }
                break;
              case "eyr":
                if (parseInt(creds.eyr) < 2020 || parseInt(creds.eyr) > 2030) {
                  console.log("eyr invalid!");
                  validCreds = false;
                }
                break;
              case "hgt":
                let height = 0;
                switch (creds.hgt.substring(creds.hgt.length - 2)) {
                  case "cm":
                    height = parseInt(creds.hgt.substring(0, creds.hgt.length - 2));
                    console.log(`hgt cm is: ${height}`);
                    if (height < 150 || height > 193) {
                      console.log("hgt cm invalid!");
                      validCreds = false;
                    }
                    break;
                  case "in":
                    height = parseInt(creds.hgt.substring(0, creds.hgt.length - 2));
                    console.log(`hgt in is: ${height}`);
                    if (height < 59 || height > 76) {
                      console.log("hgt in invalid!");
                      validCreds = false;
                    }
                    break;
                  default:
                    validCreds = false;
                }
                break;
              case "hcl":
                console.log(`hair is: ${creds.hcl}`);
                if (creds.hcl[0] != '#') {
                  console.log("1st char of hair invalid!");
                  validCreds = false;
                }
                else if (!(/^[0-9a-f]+$/.test(creds.hcl.substring(1)))) {
                  console.log(`hair: ${creds.hcl.substring(1)} is not all 0-9 or a-f`);
                  validCreds = false;
                  // but wait!... is hair all characters a-f?
                  // if (!(/^[a-f]+$/.test(creds.hcl.substring(1)))) {
                  //   console.log(`hair: ${creds.hcl.substring(1)} is not all a-f`);
                  //   validCreds = false;
                  // }
                }
                break;
              case "ecl":
                if (!(validEyeColors.includes(creds.ecl))) {
                  console.log(`${creds.ecl} is not a valid eye color!`);
                  validCreds = false;
                }
                break;
              case "pid":
                if (!(creds.pid.length === 9)) {
                  console.log(`${creds.pid} is not 9 digits!`);
                  validCreds = false;
                }
                else if (!(/^[0-9]+$/.test(creds.pid))) {
                  console.log(`${creds.pid} is not all numeric!`);
                  validCreds = false;
                }
                break;
              case "cid":
                break;

            }
          }
        });
        if (validCreds) {
          console.log("valid passport!");
          validPassports++;
        } else {
          console.log("invalid passport :(");
        }

      }

      // reset credentials object
      console.log();
      console.log('new passport found:');
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