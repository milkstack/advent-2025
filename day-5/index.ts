import fs from "fs";

const main = () => {
  const input = fs.readFileSync("./input.txt", "utf-8").split("\n");

  const splitIndex = input.indexOf("");

  const fresh = input.slice(0, splitIndex).map((range) => range.split("-"));

  let count = 0;

  const available = input.slice(splitIndex + 1).map((item) => {
    let isFresh = false;
    for (let range of fresh) {
      const [min, max] = range;

      if (Number(item) >= Number(min) && Number(item) <= Number(max)) {
        count++;
        return true;
      }
    }

    // console.log(item, isFresh);
    return false;
  });

  console.log(count);
};

const result = main();

// console.log(result);
