import fs from 'fs';
import { promisify } from 'util';

export const run = async ({ 
  file
}) => {
  const readFile = promisify(fs.readFile);
  const text = await readFile(`${__dirname}/input/${file}`, 'utf8');

  const arr = text.split('\r\n');

  for (let i = 0; i < arr.length; i++) {
    const comparingTo = Number(arr[i]);
    for (let j = i + 1; j < arr.length; j++) {
      const comparingAgainst = Number(arr[j]);
      const sum = comparingTo + comparingAgainst;

      if (sum === 2020) {
        const product = comparingTo * comparingAgainst;

        console.log(`Sum of ${comparingTo} and ${comparingAgainst} is ${sum}`);
        console.log(`Product of ${comparingTo} and ${comparingAgainst} is ${product}`);
      }
    }    
  }

  console.log();
};