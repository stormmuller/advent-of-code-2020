import { replace, map, split, forEach } from 'ramda';
import { processFile, splitByNewLine } from '../lib';

export const run = async ({
  file,
  part
}) => {
  const entries = await processFile(`${__dirname}/input/${file}`, parseFile);

  let numberOfInvalidPasswords = 0;

  if (part === 1) {
    numberOfInvalidPasswords = part1(entries);
  }

  if (part === 2) {
    numberOfInvalidPasswords = part2(entries);
  }

  const numberOfValidPasswords = entries.length - numberOfInvalidPasswords;

  console.log(`Number Of Valid Passwords: ${numberOfValidPasswords}`);

};

const part2 = entries => {
  let numberOfInvalidPasswords = 0;

  for (const entry of entries) {
    const letterAtMinPos = entry.password[entry.min - 1];
    const letterAtMaxPos = entry.password[entry.max - 1];

    if (!(entry.letter === letterAtMinPos ^ entry.letter === letterAtMaxPos)) {
      numberOfInvalidPasswords++;
    }
  }

  return numberOfInvalidPasswords;
}

const part1 = entries => {
  let numberOfInvalidPasswords = 0;

  for (const entry of entries) {
    let passwordValid = true;
    let numberOfTimesLetterAppears = 0;

    for (const letter of entry.password) {
      if (letter === entry.letter) {
        numberOfTimesLetterAppears++;

        if (numberOfTimesLetterAppears > entry.max) {
          numberOfInvalidPasswords++;
          passwordValid = false;
          break;
        }
      }
    }

    if (numberOfTimesLetterAppears < entry.min && passwordValid) {
      numberOfInvalidPasswords++;
    }
  }

  return numberOfInvalidPasswords;
}

const parseFile = text => {
  const lines = splitByNewLine(text);

  return map(line => {
    const splitBySpace = split(' ', line);
    const minMaxSplit = split('-', splitBySpace[0]);

    return {
      min: minMaxSplit[0],
      max: minMaxSplit[1],
      letter: replace(':', '', splitBySpace[1]),
      password: splitBySpace[2]
    }
  }, lines);
};