import { readFileSync } from "fs";

const main = () => {
  const rows = readFileSync("./input.txt", "utf-8").split("\n");

  const startIndex = rows[0].indexOf("S");

  let currentBeamIndeces = [startIndex];
  let splits = 0;

  for (let i = 0; i < rows.length; i++) {
    // for (let i = 0; i < 5; i++) {
    const toAdd: number[] = [];
    const toRemove: number[] = [];
    const row = rows[i];
    for (let j = 0; j < currentBeamIndeces.length; j++) {
      const beamIndex = currentBeamIndeces[j];

      if (row.charAt(beamIndex) === "^") {
        splits++;

        toRemove.push(beamIndex);

        if (
          !toAdd.includes(beamIndex - 1) &&
          !currentBeamIndeces.includes(beamIndex - 1)
        ) {
          toAdd.push(beamIndex - 1);
        }
        if (
          !toAdd.includes(beamIndex + 1) &&
          !currentBeamIndeces.includes(beamIndex + 1)
        ) {
          toAdd.push(beamIndex + 1);
        }
      }
    }
    currentBeamIndeces.push(...toAdd);

    console.log(toAdd, toRemove);

    currentBeamIndeces = currentBeamIndeces.filter(
      (i) => !toRemove.includes(i)
    );
  }

  console.log(splits);
};

main();
