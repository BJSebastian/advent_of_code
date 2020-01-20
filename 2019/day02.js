//==========================================================================================
//  Advent of Code 2019
//  --- Day 2: 1202 Program Alarm ---
//==========================================================================================
const fs = require('fs')
const readline = require('readline')

const readInterface = readline.createInterface({
  input: fs.createReadStream('input02.txt'),
  output: process.stdout,
  console: false,
  terminal: false
});

//------------------------------------------------------------------------------------------
//  Process Intcode Program.
//  ----------------------------------------------------------------------------------------
//  An Intcode program is a list of integers separated by commas (like 1,0,0,3,99). 
//  To run one, start by looking at the first integer (called position 0). Here, you will 
//  find an opcode - either 1, 2, or 99. The opcode indicates what to do; for example, 99 
//  means that the program is finished and should immediately halt. Encountering an unknown 
//  opcode means something went wrong.
//------------------------------------------------------------------------------------------
function processIntCodes(intcodes) {

  // For debugging: print each element in the intcodes array passed in...
  // intcodes.forEach(function (entry) {
  //   console.log("process intcode: " + entry);
  // });

  for (let i = 0; i < intcodes.length; i+=4) {
    
    if (intcodes[i] == 1) {
      intcodes[intcodes[i+3]] = Number(intcodes[intcodes[i+1]]) + Number(intcodes[intcodes[i+2]]);
    }
    else if (intcodes[i] == 2) {
      intcodes[intcodes[i+3]] = Number(intcodes[intcodes[i+1]]) * Number(intcodes[intcodes[i+2]]);
    }
    else if (intcodes[i] == 99) {
      break;
    }
    else {
      console.log("Unknown opcode encountered");
    }
  }

  return intcodes;
}

let answer1 = 0, answer2 = 0;

//------------------------------------------------------------------------------------------
//  Run test scenarios through intcode prcoessor.
//------------------------------------------------------------------------------------------
// let test = "1,0,0,0,99";
// let test = "2,3,0,3,99";
// let test = "2,4,4,5,99,0";
// let test = "1,1,1,4,99,5,6,0,99"
// let intcodes = test.split(",");
// intcodes = processIntCodes(intcodes);
// console.log(intcodes);
// console.log("Program complete!");

//------------------------------------------------------------------------------------------
//  Run input file through intcode prcoessor.
//------------------------------------------------------------------------------------------

readInterface.on('line', function (line) {

  intcodes = line.split(",");

  //--- Part One ---
  // before running the program, replace position 1 with the value 12 
  // and replace position 2 with the value 2.
  intcodes[1] = 12;
  intcodes[2] = 2;
  intcodes = processIntCodes(intcodes);

  // What value is left at position 0 after the program halts?
  answer1 = intcodes[0];

  //--- Part Two ---
  let outputFound = false;
  for (let x = 0; x <= 99; x++) {
    for (let y = 0; y <= 99; y++) {
      // reset the data.
      intcodes = line.split(",");
      intcodes[1] = x;
      intcodes[2] = y;
      intcodes = processIntCodes(intcodes);

      // What value is left at position 0 after the program halts?
      if (intcodes[0] == 19690720) {
        outputFound = true;
        answer2 = 100 * x + y;
      }
    }
    if (outputFound) break;
  }

});

readInterface.on('close', function () {
  console.log("Part 1: Value at position 0: " + answer1.toString());
  console.log("Part 2: 100 * noun + verb: " + answer2.toString());
  console.log("Program complete!");
});

