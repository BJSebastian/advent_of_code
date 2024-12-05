const fs = require("fs");

async function readInput() {
	// const input = fs.readFileSync("sample.txt", "utf-8");
	const input = fs.readFileSync('input.txt', 'utf-8');
	return input.split("\n").map((x) => x);
}

async function puzzle() {
	const rows = await readInput();
	const rules = [];
	const updates = [];
	let middlePageNumbers = 0;

	rows.forEach((row) => {
		if (row.includes("|")) {
			const rule = row.split("|");
			if (rule.length === 2) {
				rules.push({
					parent: parseInt(rule[0]),
					child: parseInt(rule[1])
				});
			}
		} else if (row.includes(",")) {
			const stringArray = row.split(",");
			updates.push(stringArray.map(Number));
		}
	});

	rules.sort((a, b) => a.parent - b.parent);

	updates.forEach((row, i) => {
		updateValid = true;
		row.forEach((cell, j) => {
			for (let k = j + 1; k < row.length; k++) {
				if (rules.filter(x => x.child == updates[i][j] && x.parent === updates[i][k]).length > 0) {
					updateValid = false;
					// reverse the numbers
					const tempPage = updates[i][j];
					updates[i][j] = updates[i][k];
					updates[i][k] = tempPage;
				}
			}
		});
		if (!updateValid) middlePageNumbers += row[Math.floor(row.length / 2)];
	});
	console.log(`Add up middle page numbers after correctly ordering those updates? ${middlePageNumbers}`);
}

puzzle();
