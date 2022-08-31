const fs = require('fs');

async function readInput() {
	// const input = await fs.promises.readFile('sample.txt', 'utf-8');
	const input = await fs.promises.readFile('input.txt', 'utf-8');
	return input.split('\n');
}

async function puzzle() {

  onCount = [];
  offCount = []
  
	// Get commands into an array.
	const bits = await readInput();

	for (var i = 0; i < bits.length; i++) {

    // console.log(bits[i])

    eachBit =  Array.from(bits[i]);

    for (var j = 0; j < eachBit.length; j++) {
      
      if (i === 0) {
        onCount.push(0);
        offCount.push(0);
      }

      if (parseInt(eachBit[j]) === 1) {
        onCount[j]++;
      }
      else {
        offCount[j]++;
      }

      // console.log(eachBit[j]);
    }

    // console.log("-----");
  }

  let gammaBits = "";
  let epsilonBits = "";
	for (var i = 0; i < onCount.length; i++) {
    if (onCount[i] > offCount[i]) {
      gammaBits += "1";
      epsilonBits += "0";
    }
    else {
      gammaBits += "0";
      epsilonBits += "1";
    }
  }

  console.log("gammaRate binary: ", gammaBits);
	console.log("epsilonRate binary: ", epsilonBits);

  // const binary = "10110";
  let decGamma = parseInt(gammaBits, 2);
  let decEpsilon = parseInt(epsilonBits, 2);

  console.log("gammaRate decimal", decGamma);
	console.log("epsilonRate decimal", decEpsilon);
  console.log("power consumption", decGamma * decEpsilon);
}

puzzle();
