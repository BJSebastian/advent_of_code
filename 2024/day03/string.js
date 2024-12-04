function findAllOccurrences(str, substr) {
  const indices = [];
  let index = str.indexOf(substr);

  while (index !== -1) {
    indices.push(index);
    index = str.indexOf(substr, index + 1);
  }

  return indices;
}

const string = "The quick brown fox jumps over the lazy dog and the dog is white and the sky is blue.";
const substring = "the";
const occurrences = findAllOccurrences(string, substring);

console.log(occurrences); // [31]