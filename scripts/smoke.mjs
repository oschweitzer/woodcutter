// Loads the built package both ways, as a consumer would, and checks the output.
import { execFileSync } from 'node:child_process';

const run = (args) =>
  execFileSync(process.execPath, args, {
    encoding: 'utf8',
    env: { ...process.env, NO_COLOR: '1' },
  });
const line = /^\d{4}-\d\d-\d\d \d\d:\d\d:\d\d - \[INFO\]\s+ \| hello \{"a":1\}\n$/;

const viaImport = run([
  '--input-type=module',
  '-e',
  "import { WoodCutter } from 'woodcutter'; new WoodCutter().info('hello', { a: 1 });",
]);
const viaRequire = run([
  '-e',
  "const { WoodCutter } = require('woodcutter'); new WoodCutter().info('hello', { a: 1 });",
]);

for (const [name, out] of [
  ['import', viaImport],
  ['require', viaRequire],
]) {
  if (!line.test(out)) {
    console.error(`smoke test failed (${name}): ${JSON.stringify(out)}`);
    process.exit(1);
  }
}
console.log('smoke test OK (import and require)');
