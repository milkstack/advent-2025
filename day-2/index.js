const fs = require("fs");

const fitsPattern = (
  patternArray,
  smallestPatternArray,
  stringArray,
  originalString
) => {
  if (patternArray.length >= originalString.length || !stringArray.length) {
    const isMatch =
      patternArray.join("") === originalString &&
      smallestPatternArray.join("") !== originalString;

    return isMatch;
  }
  const length = smallestPatternArray.length;
  const toMatch = stringArray.slice(0, length);

  const smallestPatternString = smallestPatternArray.join("");
  const toMatchString = toMatch.join("");

  if (smallestPatternString === toMatchString) {
    return fitsPattern(
      patternArray.concat(toMatchString.split("")),
      smallestPatternArray,
      stringArray.slice(length),
      originalString
    );
  }

  return fitsPattern(
    patternArray.concat([toMatchString[0]]),
    patternArray.concat([toMatchString[0]]),
    stringArray.slice(1),
    originalString
  );
};

["1212123121212"].forEach((_) => {
  const firstChar = _[0];
  const allButFirst = _.substring(1).split("");

  fitsPattern([firstChar], [firstChar], allButFirst, _);
});

const main = () => {
  let tally = 0;

  const input = fs
    .readFileSync("./input.txt", "utf-8")
    .split(",")
    .filter((_) => !!_)
    .map((_) => _.split("-"));

  input.forEach((range) => {
    const min = Number(range[0]);
    const max = Number(range[1]);

    for (i = min; i <= max; i++) {
      const _ = `${i}`;

      const firstChar = _[0];
      const allButFirst = _.substring(1).split("");

      const fits = fitsPattern([firstChar], [firstChar], allButFirst, _);

      if (fits) {
        tally += i;
      }
    }
  });

  console.log(tally);
};

main();
