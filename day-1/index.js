const fs = require("fs");

const main = () => {
  let cursor = 50;
  const map = {};
  let zeroHits = 0;

  const input = fs
    .readFileSync("./input.txt", "utf-8")
    .split(";\n")
    .filter((_) => !!_);

  input.forEach((instruction) => {
    const dir = instruction.substring(0, 1) === "L" ? -1 : 1;

    const amount = instruction.substring(1);

    for (i = 0; i < amount; i++) {
      cursor += dir;

      if (cursor > 99) cursor = 0;
      if (cursor < 0) cursor = 99;

      if (cursor === 0) zeroHits++;
    }
  });

  console.log(zeroHits);
};

main();
