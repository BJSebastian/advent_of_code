const fs = require('fs');

// for part 2 this is a list of all questions where someone answered yes.
let answeredYes = [];

// this is a list of each person (in the group) answers (as a string)
let personAnswers = [];

// this will be the final answer.
let totalAnsweredYes = 0;

function processGroup() {
  
  let questionsEveryoneAnsweredYes = 0;
  answeredYes.forEach(question => {
    let questionPersonAnsweredYes = 0;
    personAnswers.forEach(person => {
      for (let i = 0; i < person.length; i++) {
        if (person[i] == question) {
          questionPersonAnsweredYes++;
          break;
        }
      }
    });
    if (questionPersonAnsweredYes == personAnswers.length) {
      questionsEveryoneAnsweredYes++;
    }
  });

  totalAnsweredYes += questionsEveryoneAnsweredYes;

  console.log(`processing group with ${questionsEveryoneAnsweredYes} questions where everyone answered yes.`);

  // reset array of answers.
  answeredYes = [];
  personAnswers = [];
}

async function readInput() {
  const input = await fs.promises.readFile('input.txt', 'utf-8');
  return input.split('\n');
}

async function puzzle() {
  const values = await readInput();
  values.forEach((row) => {

    if (row === '') {
      processGroup();
    }
    else {
      personAnswers.push(row);
      for (let i = 0; i < row.length; i++) {
        if (!(answeredYes.includes(row[i]))) {
          answeredYes.push(row[i]);
        } 
      }
    }

  });

  processGroup();

  console.log(`Total questions where everyone answered yes: ${totalAnsweredYes}`);
}

puzzle();