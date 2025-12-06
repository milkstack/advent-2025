import { readFileSync } from "fs";

const main = () => {
  const input = readFileSync("./input.txt", "utf-8")
    .split("\n")
    .filter((_) => _ !== "");

  const problems: { width: number; operator: "+" | "*" }[] = [];

  const numbersRows = input.slice(0, input.length - 1);
  const operatorsRow = input[input.length - 1];

  //   use the row of operators to build a set of "problems" of shape {width: number, operator: '+' | '*'}
  let currentWidth = 1; // start at 1 -- solves off by one error with first problem not having a space before
  operatorsRow
    .split("")
    .reverse()
    .forEach((char, index) => {
      if (char === "+" || char === "*") {
        problems.unshift({ width: currentWidth, operator: char });
        currentWidth = 0;
        return;
      }

      currentWidth++;
    });

  let total = 0;
  let cursor = 0;

  problems.forEach((problem) => {
    let localTotal = 0;

    // for each single column of characters within a problem
    for (let i = 0; i < problem.width; i++) {
      const index = cursor + i;
      let numberString = ""; // build a number

      // for each row, still a long string 'xxx xx xxxx '
      // get character at  index
      for (let row of numbersRows) {
        const char = row[index];
        if (char !== "") numberString += char;
      }

      const number = Number(numberString);

      if (localTotal === 0 || problem.operator === "+") {
        localTotal += number;
      } else {
        localTotal *= number;
      }
    }

    // add the problem's width to our cursor, add the answer from the problem and repeat
    cursor += problem.width + 1;

    total += localTotal;
  });

  console.log(total);
};

main();
