function calculateAllCombinations(numbers) {
	const operators = ["+", "*"];
	const results = new Set();

	// Helper function to evaluate expressions with explicit operator precedence
	function evaluateExpressionWithPrecedence(expression) {
		const tokens = expression.split(/(\+|\*)/);
		let currentResult = parseInt(tokens[0], 10);
		let i = 1;

		while (i < tokens.length) {
			const operator = tokens[i];
			const nextNumber = parseInt(tokens[i + 1], 10);

			if (operator === "+") {
				currentResult += nextNumber;
			} else if (operator === "*") {
				currentResult *= nextNumber;
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

// Example usage with an array of 4 numbers
const numbers = [11, 6, 16, 20];
const allResults = calculateAllCombinations(numbers);
console.log(`All possible results: ${allResults}`);
