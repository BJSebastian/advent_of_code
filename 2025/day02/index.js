import fs from "fs/promises";

function isInvalid(value) {
  const valueString = value.toString();
  const left = valueString.slice(0, valueString.length / 2);
  const right = valueString.slice(valueString.length / 2);
  return left === right;
  // regex answer:
  // return /^(\d+)\1$/.test(valueString);
}

function isInvalid2(value) {
  const valueString = value.toString();
  return /^(\d+)\1+$/.test(valueString);
}

function partOne(ranges) {

  const invalidIds = [];

  // Split the data by comma and log each item.
  ranges.forEach((range) => {
    const [start, end] = range.split("-").map(Number);
    for (let i = start; i <= end; i++) {
      if (isInvalid(i)) {
        invalidIds.push(i);
      }
    }
  });

  console.log(`Part One Answer: ${invalidIds.reduce((s, v) => s + v)}`);
}

function partTwo(ranges) {

  const invalidIds = [];

  // Split the data by comma and log each item.
  ranges.forEach((range) => {
    const [start, end] = range.split("-").map(Number);
    for (let i = start; i <= end; i++) {
      if (isInvalid2(i)) {
        invalidIds.push(i);
      }
    }
  });

  console.log(invalidIds.reduce((s, v) => s + v));
}

// const lines = await fs.readFile("sample.txt", "utf-8");
const lines = await fs.readFile("input.txt", "utf-8");

partOne(lines.split(","));
partTwo(lines.split(","));
