# Changelog

## 3.0.0

### Changed

- Requires Node.js 20.19 or later.
- Upgraded to winston 3 (was winston 2).
- `timestampFormat` no longer uses moment. A built-in formatter supports `YYYY YY MM M DD D HH H mm m ss s SSS`
  and `[escaped text]`. Other moment tokens are printed as is.
- Metadata is appended after a space instead of being glued to the message.
- Logging methods return the logger.
- The `license` field of `package.json` now says `Apache-2.0`, matching `LICENSE.md` (it said ISC).
- Rewritten in strict TypeScript 6, with ES modules and CommonJS builds and an `exports` map.
- Tooling: Vitest, ESLint (flat config) and Prettier 3 replace Mocha, Chai and TSLint; GitHub Actions replaces Travis CI.

### Added

- `colorize` option, and `NO_COLOR` support.
- `level` accepts the string values (`'debug'`) as well as `LogLevel`.
- Errors in metadata are serialized with name, message and stack.
- Unit tests for the formatter, the message rendering and the logger; a smoke test of the built package.

### Removed

- The `moment`, `chai`, `mocha` and `rimraf` runtime dependencies (the last three were wrongly listed as dependencies).
- The `app/` demo (see `examples/basic.mjs`) and the compodoc script.

## 2.1.2

Last release of the 2.x line.
