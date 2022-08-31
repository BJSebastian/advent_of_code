const fs = require('fs');

async function readInput() {
	// const input = await fs.promises.readFile('sample.txt', 'utf-8');
	const input = await fs.promises.readFile('input.txt', 'utf-8');
	return input.split('\n');
}

async function puzzle() {

	// Get commands into an array.
	const commands = await readInput();

  aim = 0;
  horizontal = 0;
  depth = 0;

	for (var i = 0; i < commands.length; i++) {

    const commandParms = commands[i].split(" ");
    const action = commandParms[0];
    const measure = parseInt(commandParms[1]);

    // console.log(commands[i]);
    // console.log(`action: ${action} measure: ${measure}`);

    switch(action) {
      case "forward":
        horizontal += measure;
        if (aim > 0) {
          depth += aim * measure;
          console.log("New Depth: ", depth);
        }
        break;
      case "up":
        aim -= measure;
        break;
      case "down":
        aim += measure;
        break;
    }	
	}

  console.log("Aim: ", aim);
	console.log("Horizontal: ", horizontal);
	console.log("Depth: ", depth);
  console.log("Answer: ", horizontal * depth);
}

puzzle();
