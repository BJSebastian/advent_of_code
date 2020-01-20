//==========================================================================================
//  Advent of Code 2019
//  --- Day 1: The Tyranny of the Rocket Equation ---
//==========================================================================================
const fs = require('fs') 
const readline = require('readline')

const readInterface = readline.createInterface({
    input: fs.createReadStream('input01.txt'),
    output: process.stdout,
    console: false,
    terminal: false
});

function fuelCounterUpper(mass) {
    
    fuel_required = (Math.floor(mass / 3)) - 2;

    // --- Part 2 ---
    // use recursion to get the fuel needed to carry the fuel...
    if (fuel_required > 0)
        fuel_required += fuelCounterUpper(fuel_required)
    else
        fuel_required = 0

    return fuel_required;
}

total_fuel_requirement = 0;

readInterface.on('line', function(line) {
    total_fuel_requirement += fuelCounterUpper(line);
});

readInterface.on('close', function () {
    console.log("Total fuel requirement: " + total_fuel_requirement.toString());
    console.log("Program complete!");
});
