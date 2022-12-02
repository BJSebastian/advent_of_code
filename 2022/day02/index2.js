const fs = require('fs');

async function readInput() {
	// const input = fs.readFileSync('sample.txt', 'utf-8');
	const input = fs.readFileSync('input.txt', 'utf-8');
	return input.split('\n');
}

async function getOppHand(choice) {
	switch (choice) {
		case "A":
			return {
				choice: "Rock",
					points: 1
			};
			break;
		case "B":
			return {
				choice: "Paper",
					points: 2
			};
			break;
		case "C":
			return {
				choice: "Scissors",
					points: 3
			};
			break;
	}
}

async function getMyHand(oppHand, myChoice) {
	switch (myChoice) {
		case "X":
			// I need to lose.
			switch (oppHand.choice) {
				case "Rock":
					return {
						choice: "Scissors",
							points: 3
					};
					break;
				case "Paper":
					return {
						choice: "Rock",
							points: 1
					};
					break;
				case "Scissors":
					return {
						choice: "Paper",
							points: 2
					};
					break;
			}
			break;
		case "Y":
			// We nned to draw.
			return oppHand;
			break;
		case "Z":
			// I need to win.
			switch (oppHand.choice) {
				case "Rock":
					return {
						choice: "Paper",
							points: 2
					};
					break;
				case "Paper":
					return {
						choice: "Scissors",
							points: 3
					};
					break;
				case "Scissors":
					return {
						choice: "Rock",
							points: 1
					};
					break;
			}
			break;
	}
}

async function puzzle() {
	const rounds = await readInput();
	let roundNo = 1;
	let totalPoints = 0;
	for (const round of rounds) {
		const choices = round.split(' ');
		const oppHand = await getOppHand(choices[0]);
		const myHand = await getMyHand(oppHand, choices[1]);
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