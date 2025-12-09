import { readFileSync } from "fs";

const rows = readFileSync("./input.txt", "utf-8")
  .split("\n")
  .filter((line) => line.includes("^") || line.includes("S"));

const map = new Map<string, number>();

const main = () => {
  const startIndex = rows[0].indexOf("S");

  const count = getCount(startIndex, 1);

  console.log(count);
};

const getCount = (startIndex: number, rowIndex: number): number => {
  const key = `${startIndex}-${rowIndex}`;
  const existing = map.get(key);
  if (existing) {
    return existing;
  }

  const row = rows[rowIndex];
  if (!row) return 1;

  if (row.charAt(startIndex) === "^") {
    const result =
      getCount(startIndex - 1, rowIndex + 1) +
      getCount(startIndex + 1, rowIndex + 1);

    map.set(key, result);

    return result;
  }

  const result = getCount(startIndex, rowIndex + 1);

  map.set(key, result);
  return result;
};

main();
