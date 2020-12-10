const fs = require('fs');
const inputFilename = "input.txt";

// light red bags contain 1 bright white bag, 2 muted yellow bags.
function parseLine(bagTypes) {
  return (line) => {
    const [left, right] = line.split(' contain ');
    const type = left.replace(' bags', '');
    const contents = right.split(', ').reduce((byType, item) => {
      if (item.match(/no other bags/)) return {};
      const [, count, type] = item.match(/^([0-9]+) (.+) bag/);
      bagTypes.add(type);
      byType[type] = +count;
      return byType;
    }, {});
  
    return {
      type,
      contents,
    };
  };
}

function numberOfBagsIn(bags, type) {
  let totalBags = 0;
  const bag = bags[type];

  Object.entries(bag.contents).forEach(([childType, count]) => {
    totalBags += count;
    totalBags += count * numberOfBagsIn(bags, childType);
  });

  return totalBags;
}

async function puzzle() {
  const input = await fs.promises.readFile(inputFilename, 'utf-8');
  const lines = input.split('\n');
  const bagTypes = new Set();
  const lineParser = parseLine(bagTypes);
  const bags = lines.reduce((bags, line) => {
    const rule = lineParser(line);
    bags[rule.type] = rule;
    return bags;
  }, {});

  const gimmeTheAnswer = numberOfBagsIn(bags, 'shiny gold');
  return gimmeTheAnswer;
}

puzzle().then(console.log);