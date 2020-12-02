import fs from 'fs';
import { promisify } from 'util';
import { sum, product } from 'ramda';

const TOTAL = 2020;

export const run = async ({
  file,
  part
}) => {
  const readFile = promisify(fs.readFile);
  const text = await readFile(`${__dirname}/input/${file}`, 'utf8');

  const arr = text.split('\r\n');
  const numbers = [];

  callRecursively(numbers, arr, partLookup[part]);
};

const callRecursively = (numbers, arr, maxLevel, level = 0, i = -1) => {
  for (let j = i + 1; j < arr.length; j++) {
    numbers[level] = Number(arr[j]);

    if (level !== maxLevel - 1) {
      callRecursively(numbers, arr, maxLevel, level + 1, j);
    } else {
      const sumOfNumbers = sum(numbers);

        if (sumOfNumbers === TOTAL) {
          const productOfNumbers = product(numbers);

          console.log(`Sum of ${numbers} is ${sumOfNumbers}`);
          console.log(`Product of ${numbers} is ${productOfNumbers}`);
        }
    }
  }
};

const partLookup = {
  [1]: 2,
  [2]: 3
};