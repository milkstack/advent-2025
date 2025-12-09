import { readFileSync } from "fs";

type Box = {
  id: number;
  circuitId: number;
  x: number;
  y: number;
  z: number;
};

type Circuit = {
  id: number;
  boxes: Box[];
};

type BoxPair = {
  a: Box;
  b: Box;
  distance: number;
};

const parseInput = (): [Box[], Circuit[]] => {
  const boxes = readFileSync("./input.txt", "utf-8")
    .split("\n")
    .map((row, index) => {
      const arr = row.split(",");

      return {
        id: index,
        circuitId: index,
        x: Number(arr[0]),
        y: Number(arr[1]),
        z: Number(arr[2]),
      };
    });

  const circuits = boxes.map((b) => {
    return { id: b.circuitId, boxes: [b] };
  });

  return [boxes, circuits];
};

const getCountForCircuitId = (circuitId: number): number => {
  return boxes.filter((box) => box.circuitId === circuitId).length;
};

const joinBoxes = (a: Box, b: Box): boolean => {
  const oldCircuit = circuits.find((circuit) => circuit.id === b.circuitId);
  const newCircuit = circuits.find((circuit) => circuit.id === a.circuitId);

  oldCircuit?.boxes.map((box) => {
    box.circuitId = a.circuitId;
  });

  newCircuit!.boxes! = newCircuit!.boxes.concat(oldCircuit!.boxes!);

  if (newCircuit?.boxes.length === boxes.length) return true;

  return false;
};

const getAllCircuitIds = (): number[] => {
  return [...new Set(boxes.map((box) => box.circuitId))];
};

const getDistance = (a: Box, b: Box) => {
  return Math.sqrt(
    Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2)
  );
};

const [boxes, circuits] = parseInput();
const pairs: BoxPair[] = [];
const pairsMap = new Map<string, boolean>();

const main = () => {
  for (let i = 0; i < boxes.length; i++) {
    for (let j = 0; j < boxes.length; j++) {
      if (i === j) continue;

      const a = boxes[i];
      const b = boxes[j];

      const key1 = `${a.id}-${b.id}`;
      const key2 = `${b.id}-${a.id}`;

      if (pairsMap.get(key1) || pairsMap.get(key2)) continue;

      pairs.push({ a, b, distance: getDistance(a, b) });

      pairsMap.set(key1, true);
      pairsMap.set(key2, true);
    }
  }

  const sortedPairs = pairs.sort((a, b) => {
    return a.distance - b.distance;
  });

  //   part 1
  //   for (let i = 0; i < 1000; i++) {
  //     const pair = sortedPairs[i];
  //     joinBoxes(pair.a, pair.b);
  //   }

  //   const allCircuitIds = getAllCircuitIds();
  //   const sortedCircuitIds = allCircuitIds.sort((a, b) => {
  //     const aCount = getCountForCircuitId(a);
  //     const bCount = getCountForCircuitId(b);

  //     return bCount - aCount;
  //   });

  //   let result =
  //     getCountForCircuitId(sortedCircuitIds[0]) *
  //     getCountForCircuitId(sortedCircuitIds[1]) *
  //     getCountForCircuitId(sortedCircuitIds[2]);

  //   console.log(result);

  //   part 2
  let i = 0;
  while (true) {
    const pair = sortedPairs[i];
    i++;
    if (pair.a.circuitId === pair.b.circuitId) {
      continue;
    }

    const shouldBreak = joinBoxes(pair.a, pair.b);

    if (shouldBreak) {
      console.log(pair.a.x * pair.b.x);
      break;
    }
  }
};

main();
