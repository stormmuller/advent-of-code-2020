import { sum, product } from 'ramda';
import { processFile, replaceChar, splitByNewLine } from '../lib';

export const run = async ({
  file,
  part
}) => {
  const lines = await processFile(`${__dirname}/input/${file}`, splitByNewLine);
  let treesEncountered = 0;

  if (part === 1) {
    treesEncountered = calculate(lines)(1, 7);
  }

  if (part === 2) {
    const treesPerSlope = [];
    treesPerSlope.push(calculate(lines)(1, 1));
    treesPerSlope.push(calculate(lines)(1, 3));
    treesPerSlope.push(calculate(lines)(1, 5));
    treesPerSlope.push(calculate(lines)(1, 7));
    treesPerSlope.push(calculate(lines)(2, 1));

    treesEncountered = sum(treesPerSlope);
    console.log(`Number of trees encountered: ${product(treesPerSlope)}`);
  }

  console.log(`Number of trees encountered: ${treesEncountered}`);
};

const calculate = (lines) => (maxRise, maxRun) => {
  let treesEncountered = 0;
  let rise = 0, run = maxRun;

  const width = lines[0].length;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let lineCopy = line;

    if (rise === maxRise) {
      const index = run % width;
      const char = line[index];
      run += maxRun;

      if (char === '#') {
        treesEncountered++;
        lineCopy = replaceChar(index, 'X', lineCopy);
      } else {
        lineCopy = replaceChar(index, '0', lineCopy);
      }

      rise = 0;
    }

    console.log(lineCopy);

    rise++;
  }

  console.log(`Trees encountered: ${treesEncountered} for slop: ${maxRise}:${maxRun}`);

  return treesEncountered;
}