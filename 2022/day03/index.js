const fs = require('fs');

async function readInput() {
	// const input = fs.readFileSync('sample.txt', 'utf-8');
	const input = fs.readFileSync('input.txt', 'utf-8');
	return input.split('\n');
}

async function puzzle() {

	// Get number values into an array.
	const rucksacks = await readInput();

	let rucksackNo = 1;
	let sum = 0;
	for (const rucksack of rucksacks) {
		const compartment1 = rucksack.slice(0, rucksack.length / 2)
		const compartment2 = rucksack.slice(rucksack.length / 2, rucksack.length)
		console.log(`rucksack #${rucksackNo} compartment 1: ${compartment1} - compartment 2: ${compartment2}`);
		const commonItem = get_common_characters(compartment1, compartment2)[0];
		let priority = 0;
		priority = commonItem.toLowerCase().charCodeAt(0) - 96;			
		if (commonItem == commonItem.toUpperCase()) {
			priority += 26;
		}
		console.log(`common character(s): ${commonItem} with priority: ${priority}`);
		sum += priority;
	}
	console.log(`The sum is: ${sum}`);

	function get_common_characters(str1, str2) {
    const set1 = new Set(str1.split(''))
    const set2 = new Set(str2.split(''))
    const result = []
    for(let char of set1.values()){
			if(set2.has(char)) result.push(char)
    }
    return result
	}

}

puzzle();