const fs = require('fs');
const { normalize } = require('path');
let lines = [];
let monkeys = [];

async function readInput() {
	const input = fs.readFileSync('sample.txt', 'utf-8');
	// const input = fs.readFileSync('input.txt', 'utf-8');
	return input.split('\n');
}

function processMonkey(currMonkey) {
	const index = currMonkey.index;
	const mokeyLine = lines[index].split(' ');
	const staringLine = lines[index + 1].split(': ');
	const operationLine = lines[index + 2];
	const testLine = lines[index + 3];
	const trueLine = lines[index + 4];
	const falseLine = lines[index + 5];

	// const monkeyItems = staringLine[1].split(',');
	const operations = operationLine.split(' = ');
	const worryOperations = operations[1].split(' ');

	const trueCommands = trueLine.split(' ');
	const trueMonkey = parseInt(trueCommands[trueCommands.length - 1]);

	const falseCommands = falseLine.split(' ');
	const falseMonkey = parseInt(falseCommands[falseCommands.length - 1]);

	console.log(`Processing monkey: ${mokeyLine[1].substring(0, 1)} with the following items:`);
	console.log(currMonkey.items);
	console.log(`  Operation: ${JSON.stringify(worryOperations)}`);
	console.log(`test line: ${testLine}`);

	const itemsCopy = [...currMonkey.items];
	for (let i = 0; i < itemsCopy.length; i++) {
		processMonkeyItem(currMonkey, worryOperations, itemsCopy[i], testLine, trueMonkey, falseMonkey);
		console.log(monkeys);
		console.log("~~~~~~~~~~");
	}
}

function processMonkeyItem(currMonkey, worryOperations, item, testLine, trueMonkey, falseMonkey) {
	console.log(` - processing monkey item: ${item}`);

	// Monkey inspects an item with a worry level of 79.
	const worryLevel = processWorryLevel(worryOperations, item);
	console.log(` - which has a worry level of: ${worryLevel}`);

	// Worry level is multiplied by 19 to 1501.

	// Monkey gets bored with item. Worry level is divided by 3 to 500.
	const dividedWorryLevel = Math.floor(worryLevel / 3);
	console.log(` - which has a divided worry level of: ${dividedWorryLevel}`);

	// Current worry level is not divisible by 23.
	const testCommands = testLine.split(' ');
	const divisibleBy = parseInt(testCommands[testCommands.length - 1]);
	let throwToMonkey = null;
	if ((dividedWorryLevel % divisibleBy) === 0) {
		console.log(`${worryLevel} IS divisbile by ${divisibleBy}`);
		console.log(`throw item with worry level ${dividedWorryLevel} to monkey: ${trueMonkey}`);
		throwToMonkey = monkeys.find((monkey) => monkey.monkeyNo === trueMonkey);
	} else {
		console.log(`${worryLevel} is not divisbile by ${divisibleBy}`);
		console.log(`throw item with worry level ${dividedWorryLevel} to monkey: ${falseMonkey}`);
		throwToMonkey = monkeys.find((monkey) => monkey.monkeyNo === falseMonkey);
	}

	// Item with worry level 500 is thrown to monkey 3.
	if (throwToMonkey) {
		throwToMonkey.items.push(dividedWorryLevel);
		currMonkey.items.shift();
	}

	currMonkey.inspections++;
}

function processWorryLevel(worryOperations, item) {
	// example of worry items:
	// old * 19
	// old + 6
	// old * old
	// old + 3
	let value1 = 0;
	let value2 = 0;
	let worryLevel = 0;
	console.log(`worry commands: ${JSON.stringify(worryOperations)}`)

	// 1st worry value.
	if (worryOperations[0] === "old") {
		value1 = item;
	} else {
		value1 = parseInt(worryOperations[0]);
	}

	// 2nd worry value.
	if (worryOperations[2] === "old") {
		value2 = item;
	} else {
		value2 = parseInt(worryOperations[2]);
	}

	if (worryOperations[1] === "*") {
		worryLevel = value1 * value2;
	} else if (worryOperations[1] === "+") {
		worryLevel = value1 + value2;
	}

	return worryLevel;
}

async function puzzle() {
	//========================================================================================
	// --- Day 11: Monkey in the Middle ---
	//========================================================================================

	console.log("!!!!!!!! PROGRAM STARTED !!!!!!!!");

	// Get input into an array.
	lines = await readInput();

	// Create monkeys with their items.
	monkeyNo = 0;
	for (let i = 0; i < lines.length; i++) {
		if (lines[i].startsWith('Monkey')) {
			const staringLine = lines[i + 1].split(': ');
			const monkeyItems = staringLine[1].split(',');
			for (let i = 0; i < monkeyItems.length; i++) {
				monkeyItems[i] = parseInt(monkeyItems[i]);
			}
			monkeys.push({
				index: i,
				monkeyNo: monkeyNo,
				inspections: 0,
				items: monkeyItems
			});
			monkeyNo++;
		}
	}

	const noRounds = 20;
	for (let round = 0; round < noRounds; round++) {
		console.log("---------------------------");
		for (let i = 0; i < monkeys.length; i++) {
			processMonkey(monkeys[i]);
			console.log("---------------------------");
		}
	}

	monkeys.sort((a, b) => a.inspections - b.inspections);
	console.log(monkeys);
	const answer = monkeys[monkeys.length - 1].inspections * monkeys[monkeys.length - 2].inspections;
	console.log(`answer is ${answer}`)
}

puzzle();