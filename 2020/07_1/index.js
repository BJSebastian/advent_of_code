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

function findParents(rules, type) {
  return rules.filter((rule) => rule.contents[type]);
}

async function puzzle() {
  const input = await fs.promises.readFile(inputFilename, 'utf-8');
  const lines = input.split('\n');
  const bagTypes = new Set();
  const lineParser = parseLine(bagTypes);
  const rules = lines.map(lineParser);
  let parents = findParents(rules, 'shiny gold');
  let totalBags = parents.length;
  const validBagTypes = new Set();
  parents.forEach(({ type }) => validBagTypes.add(type));
  while (true) {
    const results = parents.reduce((grandParents, parent) => {
      const parents = findParents(rules, parent.type);
      parents.forEach(parent => grandParents[parent.type] = parent);
      return grandParents;
    }, {});
    parents = Object.values(results);
    parents.forEach(({ type }) => validBagTypes.add(type));
    totalBags += parents.length;
    if (parents.length === 0) break;
  }
  return validBagTypes.size;
}

puzzle().then(console.log);