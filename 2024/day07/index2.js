/* eslint-disable no-console */
const fs = require("fs");

async function readInput() {
	// const input = fs.readFileSync("sample.txt", "utf-8");
	const input = fs.readFileSync('input.txt', 'utf-8');
	return input.split("\n").map((x) => x);
}

function calculateAllCombinations(numbers) {
	const operators = ['+', '*', '||'];
	const results = new Set();

	// Helper function to evaluate expressions with explicit operator precedence
	function evaluateExpressionWithPrecedence(expression) {
			const tokens = expression.split(/(\+|\*|\|\|)/);
			let currentResult = parseInt(tokens[0], 10);
			let i = 1;

			while (i < tokens.length) {
					const operator = tokens[i];
					const nextNumber = parseInt(tokens[i + 1], 10);

					if (operator === '+') {
							currentResult += nextNumber;
					} else if (operator === '*') {
							currentResult *= nextNumber;
					} else if (operator === '||') {
							currentResult = parseInt(`${currentResult}${nextNumber}`, 10);
					}

					i += 2;
			}

			return currentResult;
	}

	function generateExpressions(index, currentExpression) {
			if (index === numbers.length - 1) {
					// Evaluate the final expression when we reach the end
					const result = evaluateExpressionWithPrecedence(currentExpression);
					results.add(result);
					return;
			}

			for (const operator of operators) {
					generateExpressions(index + 1, `${currentExpression}${operator}${numbers[index + 1]}`);
			}
	}

	// Start generating expressions from the first number
	generateExpressions(0, `${numbers[0]}`);

	// Return all unique results as an array
	return Array.from(results);
}

async function puzzle() {
	// Get each row into an array.
	const rows = await readInput();
	const operators = ["*", "/", "+", "-"];
	let totalCalibration = 0;
	rows.forEach((row) => {
		// console.log(row);
		const values = row.split(":");
		const numbers = values[1].trim().split(" ");

		console.log(`test value: ${values[0]} - numbers: ${numbers}`);
		const results = calculateAllCombinations(numbers);
		// console.log(`results: ${JSON.stringify(results)}`);
		for (i = 0; i < results.length; i++) {
			// console.log(`checking result: ${results[i]}`);
			if (results[i] === parseInt(values[0])) {
				// console.log(`matching result: ${results[i]}`);
				totalCalibration += results[i];
				break;
			}
		}
	});
	console.log(`total calibration result: ${totalCalibration}`);
}

puzzle();
