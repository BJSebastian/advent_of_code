const fs = require('fs');

async function readInput() {
	// const input = fs.readFileSync('sample.txt', 'utf-8');
	const input = fs.readFileSync('input.txt', 'utf-8');
	return input.split('\n');
}

async function getHand(choice) {
	switch (choice) {
		case "A":
		case "X":
			return {
				choice: "Rock",
					points: 1
			};
			break;
		case "B":
		case "Y":
			return {
				choice: "Paper",
					points: 2
			};
			break;
		case "C":
		case "Z":
			return {
				choice: "Scissors",
					points: 3
			};
			break;
	}
}

async function puzzle() {
	const rounds = await readInput();
	let roundNo = 1;
	let totalPoints = 0;
	for (const round of rounds) {
		const choices = round.split(' ');
		const oppHand = await getHand(choices[0]);
		const myHand = await getHand(choices[1]);
		let pointsWon = 0;
		if (myHand.choice === "Rock" && oppHand.choice === "Scissors" ||
			myHand.choice === "Paper" && oppHand.choice === "Rock" ||
			myHand.choice === "Scissors" && oppHand.choice === "Paper") {
			pointsWon = 6;
		} else if (myHand.choice === oppHand.choice) {
			pointsWon = 3;
		}
		console.log(`Round #${roundNo} opponent chooses ${oppHand.choice} for ${oppHand.points} points and you choose ${myHand.choice} for ${myHand.points} points and won ${pointsWon} total for round ${myHand.points + pointsWon}`);
		totalPoints += myHand.points + pointsWon;
		roundNo++;
	}
	console.log(`Your total points: ${totalPoints}`)
}

puzzle();