import fs from "fs";

// const main = () => {
//   const banks = fs.readFileSync("./input.txt", "utf-8").split("\n");

//   const maxes = banks.map((bank) => {
//     let max = 0;
//     let maxIndex = 0;
//     let second = 0;

//     const arr = bank.split("");
//     arr.forEach((battery, index) => {
//       const joltage = Number(battery);

//       if (joltage > max && index < arr.length - 1) {
//         max = joltage;
//         maxIndex = index;
//         second = 0;
//       } else if (joltage > second && index > maxIndex) {
//         second = joltage;
//       }
//     });

//     return Number(`${max}${second}`);
//   });

//   let sum = 0;
//   maxes.forEach((m) => (sum += m));
//   console.log(sum);
// };

const main = () => {
  const banks = fs.readFileSync("./input.txt", "utf-8").split("\n");

  const maxes = banks.map((bank) => {
    let joltageArray = new Array(12).fill(0);

    const arr = bank.split("");
    arr.forEach((battery, index) => {
      const joltage = Number(battery);

      const lowestIndex = Math.max(12 - (arr.length - index), 0);

      //   console.log(lowestIndex);

      for (let i = lowestIndex; i < 12; i++) {
        // console.log(joltage, joltageArray[i]);

        if (joltage > joltageArray[i]) {
          //   console.log("hello?");
          joltageArray[i] = joltage;

          for (let j = i + 1; j < 12; j++) {
            joltageArray[j] = 0;
          }

          break;
        }
      }
    });

    console.log(joltageArray.join(""));

    return Number(joltageArray.join(""));
  });

  let sum = 0;
  maxes.forEach((m) => (sum += m));
  console.log(sum);
};

main();
