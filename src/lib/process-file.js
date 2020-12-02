import fs from 'fs';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);

export const processFile = async (file, parseFile = noOp) => {
  const text = await readFile(file, 'utf8');

  return parseFile(text);
}

export const noOp = text => text;
export const splitByNewLine = text => text.split('\r\n');