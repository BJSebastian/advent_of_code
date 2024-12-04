const data = [
  { row: 2, col: 3 }, { row: 3, col: 8 },
  { row: 3, col: 8 }, { row: 4, col: 5 },
  { row: 4, col: 3 }, { row: 2, col: 3 },
  { row: 5, col: 3 }, { row: 3, col: 7 },
  { row: 5, col: 5 }, { row: 3, col: 7 },
  { row: 4, col: 5 }, { row: 6, col: 3 },
  { row: 4, col: 3 }, { row: 8, col: 2 },
  { row: 8, col: 4 }, { row: 8, col: 2 },
  { row: 8, col: 6 }, { row: 8, col: 4 },
  { row: 6, col: 8 }, { row: 8, col: 8 },
  { row: 8, col: 6 }, { row: 8, col: 8 },
  { row: 8, col: 9 }, { row: 9, col: 2 },
  { row: 7, col: 6 }
];

// Step 1: Stringify each object
const stringifiedObjects = data.map(obj => JSON.stringify(obj));

// Step 2: Count occurrences
const counts = stringifiedObjects.reduce((acc, objStr) => {
  acc[objStr] = (acc[objStr] || 0) + 1;
  return acc;
}, {});

// Step 3: Map counts back to original objects
const result = data.map(obj => ({
  ...obj,
  count: counts[JSON.stringify(obj)]
}));

console.log(result.filter(x => x.count === 2).length / 2);
