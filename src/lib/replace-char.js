export const replaceChar = (index, replacement, sample) => {
  return sample.substr(0, index) + replacement + sample.substr(index + replacement.length);
}