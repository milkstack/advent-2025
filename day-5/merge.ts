import fs from "fs";

const getRanges = (freshRanges: number[][]) => {
  const newRanges: number[][] = [];
  let merges = 0;
  let hitIndexes: number[] = [];

  freshRanges.forEach((rangeA, aIndex) => {
    for (let bIndex = 0; bIndex < freshRanges.length; bIndex++) {
      if (aIndex === bIndex) continue;
      if (hitIndexes.includes(aIndex) || hitIndexes.includes(bIndex)) continue;

      const rangeB = freshRanges[bIndex];
      const [aMin, aMax] = rangeA;
      const [bMin, bMax] = rangeB;

      if ((aMin <= bMax && aMin >= bMin) || (bMin <= aMax && bMin >= aMin)) {
        merges++;
        hitIndexes.push(aIndex);
        hitIndexes.push(bIndex);
        return newRanges.push(mergeRanges(rangeA, rangeB));
      }
    }

    if (!hitIndexes.includes(aIndex)) return newRanges.push(rangeA);
  });

  if (merges === 0) {
    return freshRanges;
  }

  return getRanges(newRanges);
};

const mergeRanges = (rangeA: number[], rangeB: number[]) => {
  const all = rangeA.concat(rangeB);

  const min = Math.min(...all);
  const max = Math.max(...all);

  return [min, max];
};

const main = () => {
  const start = Date.now();
  const input = fs.readFileSync("./input.txt", "utf-8").split("\n");

  const splitIndex = input.indexOf("");

  const freshRanges = input.slice(0, splitIndex).map((range) => {
    return range.split("-").map((_) => Number(_));
  });

  let count = 0;

  const ranges = getRanges(freshRanges);

  for (let [min, max] of ranges) {
    count += 1 + max - min;
  }

  const end = Date.now();

  console.log(end - start);
  return count;
};

main();
