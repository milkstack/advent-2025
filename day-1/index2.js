const fs = require("fs");

const main = () => {
  let cursor = 50;
  const map = {};
  let zeroHits = 0;

  const input = fs.readFileSync("./input.txt", "utf-8").split(";\n");

  input.forEach((inst) => {
    const dir = inst.substring(0, 1) === "L" ? -1 : 1;
    const amount = Number(inst.substring(1));

    const inc = dir * amount;

    cursor += inc;

    if (cursor > 100) {
      zeroHits += Math.floor(cursor / 100);
    }

    if (cursor < 0) {
      zeroHits++;

      zeroHits += Math.floor(Math.abs(cursor) / 100);
    }

    cursor = cursor % 100;

    if (cursor < 0) cursor = 100 + cursor;

    const key = `${cursor}`;

    const mapVal = map[key];

    map[key] = mapVal ? mapVal + 1 : 1;
  });

  console.log(map["0"]);
};

main();

const crosses = () => {
  let cursor = 50;
  let zeroHits = 0;

  const input = fs.readFileSync("./input.txt", "utf-8").split(";\n");

  input.forEach((inst) => {
    if (!inst) return;
    const dir = inst.substring(0, 1) === "L" ? -1 : 1;
    const amount = Number(inst.substring(1));

    if (isNaN(amount)) return;

    Array(amount)
      .fill(null)
      .forEach(() => {
        cursor += dir;
        if (cursor > 99) {
          cursor = 0;
        }
        if (cursor < 0) {
          cursor = 99;
        }

        if (cursor === 0) zeroHits++;
      });

    // if (cursor === 0) zeroHits++;
  });

  console.log(zeroHits);
};

// consol;

crosses();
