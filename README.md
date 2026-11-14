# WoodCutter

[![CI](https://github.com/oschweitzer/woodcutter/actions/workflows/ci.yml/badge.svg)](https://github.com/oschweitzer/woodcutter/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/woodcutter)](https://www.npmjs.com/package/woodcutter)

A small, typed console logger built on [winston](https://github.com/winstonjs/winston).
One line per message: timestamp, level, text and optional JSON metadata, colored by level.

```
2026-11-14 13:11:38 - [INFO]    | Server started {"port":3000}
2026-11-14 13:11:38 - [WARN]    | Cache is cold
2026-11-14 13:11:38 - [ERROR]   | Failed to save {"error":{"name":"Error","message":"disk full","stack":"…"}}
```

## Install

```bash
npm install woodcutter
```

Requires Node.js 20.19 or later. The package ships ES modules and CommonJS, with types.

## Usage

```typescript
import { LogLevel, WoodCutter } from 'woodcutter';

const logger = new WoodCutter({ level: LogLevel.DEBUG });

logger.info('Server started', { port: 3000 });
logger.debug('Cache lookup', 'user:42', 5); // extra values are formatted like util.format
logger.warn('Retrying %s in %d ms', 'upload', 500); // so are placeholders
logger.error('Failed to save', { error: new Error('disk full') }); // errors keep name, message and stack
logger.log(LogLevel.VERBOSE, 'Same as logger.verbose()');
```

Every method returns the logger, so calls can be chained.

### Levels

From the most to the least severe: `error`, `warn`, `info` (default), `verbose`, `debug`, `silly`.
A logger emits its level and every more severe one. The `level` option takes a `LogLevel` or its
string value (`'debug'`).

### Options

| Option            | Default                          | Description                                                 |
| ----------------- | -------------------------------- | ----------------------------------------------------------- |
| `level`           | `info`                           | Most verbose level to emit.                                 |
| `timestampFormat` | `YYYY-MM-DD HH:mm:ss`            | Local time. Tokens: `YYYY YY MM M DD D HH H mm m ss s SSS`. |
| `colorize`        | `true`, unless `NO_COLOR` is set | Color each line by level.                                   |

Text in square brackets is kept as is in `timestampFormat`: `'[at] HH:mm'` prints `at 09:05`.

## Upgrading from 2.x

Version 3 keeps the API (`WoodCutter`, `LogLevel`, `ConfigurationInterface`) and the line format. What changed:

- **Node.js 20.19 or later** is required.
- **winston 3** replaces winston 2. If you passed winston objects around, update them.
- **`timestampFormat` no longer uses moment.** The tokens above are supported; other moment tokens
  (`dddd`, `MMM`, `Z`…) are printed as is. Replace them or use the supported ones.
- Metadata is appended after a space (`message {"a":1}`); it used to be glued to the message.
- Errors in metadata are serialized with their name, message and stack (they used to print as `{}`).
- Methods return the logger instead of winston's return value.
- New: `colorize` option and `NO_COLOR` support.

## Development

```bash
npm install
npm test            # unit tests (Vitest)
npm run lint        # ESLint, strict type-checked rules
npm run build       # ES modules and CommonJS in dist/
npm run test:smoke  # loads the built package with import and require
npm run example     # prints one line per level (after a build)
```

## License

[Apache-2.0](LICENSE.md)
