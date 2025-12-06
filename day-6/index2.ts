import { readFileSync } from "fs";

const main = () => {
  const input = readFileSync("./input.txt", "utf-8")
    .split("\n")
    .filter((_) => _ !== "");

  const columns: { width: number; operator: "+" | "*" }[] = [];

  const numbersRows = input.slice(0, input.length - 1);
  const operatorsRow = input[input.length - 1];

  let currentWidth = 1;

  operatorsRow
    .split("")
    .reverse()
    .forEach((char, index) => {
      if (char === "+" || char === "*") {
        columns.unshift({ width: currentWidth, operator: char });
        currentWidth = 0;
        return;
      }

      currentWidth++;
    });

  let total = 0;
  let cursor = 0;

  columns.forEach((column) => {
    let localTotal = 0;

    //   ------------2----------------
    for (let i = 0; i < column.width; i++) {
      const index = cursor + i;
      let numberString = "";

      //   -----------3-----------------
      for (let row of numbersRows) {
        const char = row[index];
        if (char !== "") numberString += char;
      }
      //   -----------/3-----------------

      const number = Number(numberString);

      if (localTotal === 0 || column.operator === "+") {
        localTotal += number;
      } else {
        localTotal *= number;
      }
    }
    cursor += column.width + 1;

    //   ----------/2------------------

    total += localTotal;
  });

  console.log(total);
};

main();
