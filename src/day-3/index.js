import { replace, map, split, forEach } from 'ramda';
import { processFile, splitByNewLine } from '../lib';

export const run = async ({
  file,
  part
}) => {
  const lines = await processFile(`${__dirname}/input/${file}`, splitByNewLine);
  let treesEncountered = 0;

  if (part === 1) {
    treesEncountered = part1(lines);
  }

  console.log(`Number of trees encountered: ${treesEncountered}`);
};

const part1 = lines => {
  let treesEncountered = 0;
  let drop = 0;

  const maxDrop = 1;
  const maxRun = 3;
  const width = lines[0].length;

  for (let i = 0; i < lines.length; i++) {
    if (drop === maxDrop) {
      const line = lines[i];

      const index = (i * maxRun) % width;
      const char = line[index];

      if (char === '#') {
        treesEncountered++;
      } 

      drop = 0;
    }

    drop++;
  }

  return treesEncountered;
}