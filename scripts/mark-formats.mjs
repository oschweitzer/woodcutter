// `dist/esm` is ES modules and `dist/cjs` is CommonJS, whatever the package says.
import { writeFileSync } from 'node:fs';

writeFileSync('dist/esm/package.json', '{ "type": "module" }\n');
writeFileSync('dist/cjs/package.json', '{ "type": "commonjs" }\n');
