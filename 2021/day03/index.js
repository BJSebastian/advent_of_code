const fs = require('fs');

async function readInput() {
  const input = await fs.promises.readFile('sample.txt', 'utf-8');
  // const input = await fs.promises.readFile('input.txt', 'utf-8');
  return input.split('\n');
}

async function puzzle() {

  onCount = [];
  offCount = []

  // Get commands into an array.
  const bits = await readInput();

  for (let i = 0; i < bits.length; i++) {

    // console.log(bits[i])

    eachBit = Array.from(bits[i]);

    for (let j = 0; j < eachBit.length; j++) {

      if (i === 0) {
        onCount.push(0);
        offCount.push(0);
      }

      if (parseInt(eachBit[j]) === 1) {
        onCount[j]++;
      } else {
        offCount[j]++;
      }

      // console.log(eachBit[j]);
    }

    // console.log("-----");
  }

  let gammaBitString = "";
  let epsilonBits = "";
  for (let i = 0; i < onCount.length; i++) {
    if (onCount[i] > offCount[i]) {
      gammaBitString += "1";
      epsilonBits += "0";
    } else {
      gammaBitString += "0";
      epsilonBits += "1";
    }
  }

  // gamme bits ahve the most common bits.
  console.log("gammaRate binary: ", gammaBitString);

  // epsilon bits have the least common bits.
  console.log("epsilonRate binary: ", epsilonBits);

  // const binary = "10110";
  let decGamma = parseInt(gammaBitString, 2);
  let decEpsilon = parseInt(epsilonBits, 2);

  console.log("gammaRate decimal", decGamma);
  console.log("epsilonRate decimal", decEpsilon);
  console.log("power consumption", decGamma * decEpsilon);

  const oxygenBits = bits;
  console.log("oxygen bits start:" + oxygenBits);
  const gammaBits = Array.from(gammaBitString);
  for (let i = 0; i < gammaBits.length; i++) {
    console.log(`Most common bit for position ${i + 1} is: ${gammaBitString[i]}`);
    let j = oxygenBits.length;
    while (j--) {
      console.log(`${oxygenBits[j].substring(i, i+1)} <--> ${gammaBitString[i]}`)
      if (oxygenBits[j].substring(i, i+1) !== gammaBitString[i]) {
        oxygenBits.splice(j, 1);
      }
    }
    console.log(`oxygen bits after ${i + 1} pass is: ${oxygenBits}`);
    // if (i >= 0) break;
  }
  // let oxygenBitString = "";
  // for (const bit of oxygenBits) {
  //   oxygenBitString += bit;
  // }
  // console.log("oxygen generator rating binary: ", oxygenBitString);

}

puzzle();