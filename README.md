# WoodCutter

WoodCutter is a small logger based on winston and developed in TypeScript.

## Install

```bash
npm install --save woodcutter
```

## Run tests

```bash
npm run test
```

## Usage

```typescript
import * as woodcutter from 'woodcutter';

const logger = new woodcutter.WoodCutter();
logger.info('This is a log');
```