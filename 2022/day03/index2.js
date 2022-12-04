const fs = require('fs');

async function readInput() {
	// const input = fs.readFileSync('sample.txt', 'utf-8');
	const input = fs.readFileSync('input.txt', 'utf-8');
	return input.split('\n');
}

async function puzzle() {

	// Get rucksacks into an array.
	const rucksacks = await readInput();

	let groupNo = 1;
	let rucksackNo = 1;
	let sum = 0;
	let rucksack1 = '';
	let rucksack2 = '';
	let rucksack3 = ''
	for (const rucksack of rucksacks) {
		// console.log(`handling rucksacke #: ${rucksackNo}`)
		switch (rucksackNo ) {
			case 1:
				rucksack1 = rucksack;
				rucksackNo++;
				break;
			case 2:
				rucksack2 = rucksack;
				rucksackNo++;
				break;
			case 3:
				rucksack3 = rucksack;
				processRucksacks();
				rucksackNo = 1;
				rucksack1 = '';
				rucksack2 = '';
				rucksack3 = '';
				groupNo++;
				break
		}
	}
	console.log(`The sum is: ${sum}`);

	function processRucksacks() {
		const commonItems1 = get_common_characters(rucksack1, rucksack2);
		const commonItems2 = get_common_characters(rucksack2, rucksack3);
		const commonItems3 = get_common_characters(rucksack1, rucksack3);
		const commonItems4 = get_common_characters(commonItems1.join(''), commonItems2.join(''));
		const commonItem = get_common_characters(commonItems4.join(''), commonItems3.join(''))[0];
		if (commonItem) {
			let priority = 0;
			priority = commonItem.toLowerCase().charCodeAt(0) - 96;			
			if (commonItem == commonItem.toUpperCase()) {
				priority += 26;
			}
			console.log(`Group ${groupNo} common character(s): ${commonItem} with priority: ${priority}`);
			sum += priority;
		}
		else {
			console.log(`We don't have a common item for group # ${groupNo}`);
		}
	}

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