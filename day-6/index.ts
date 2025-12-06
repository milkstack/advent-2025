import { readFileSync } from "fs";

const main = () => {
  const input = readFileSync("./input.txt", "utf-8")
    .split(/\s/)
    .filter((_) => _ !== "");

  const operators = input.filter((_) => _ === "+" || _ === "*");
  const numbers = input.filter((_) => _ !== "+" && _ !== "*").map(Number);

  const columnCount = operators.length;
  const rowCount = numbers.length / columnCount;

  let total = 0;

  operators.forEach((operator, columnIndex) => {
    let localTotal = 0;
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      const nextVal = numbers[columnIndex + columnCount * rowIndex];

      if (localTotal === 0 || operator === "+") {
        localTotal += nextVal;
        continue;
      }

      localTotal *= nextVal;
    }

    total += localTotal;
  });

  console.log(total);
};

main();
