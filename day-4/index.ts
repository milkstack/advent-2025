import fs from "fs";

const cases: number[][] = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const removeRolls = (input: string[][], count: number): number => {
  let countThisIteration = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] !== "@") continue;

      let localCount = 0;

      cases.forEach(([inc, jinc]) => {
        const val = input[i + inc]?.[j + jinc];

        if (!val) return;

        if (val === "@") {
          localCount++;
        }
      });

      if (localCount < 4) {
        input[i][j] = ".";
        countThisIteration++;
      }
    }
  }

  if (countThisIteration === 0) return count;

  return removeRolls(input, count + countThisIteration);
};

const main = () => {
  const input = fs.readFileSync("./input.txt", "utf-8");

  const rows = input.split("\n").map((row) => row.split(""));

  const count = removeRolls(rows, 0);

  console.log(count);
};

main();
