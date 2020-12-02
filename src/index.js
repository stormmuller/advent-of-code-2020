import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

(async () => {
  const args = yargs(hideBin(process.argv)).argv;
  const { run } = await import('./day-' + args.day);
  await run(args);
})();
