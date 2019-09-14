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
import {WoodCutter} from 'woodcutter';


function main() {
  const woodcutter = new WoodCutter({
    level: 'silly'
  });
  woodcutter.debug("Hey debug", 5, "test", {"hello": "world"});
  woodcutter.info("Hey info");
  woodcutter.error("Hey error");
  woodcutter.verbose("Hey verbose");
  woodcutter.warn("Hey warn");
  woodcutter.silly("Hey silly");
  woodcutter.log('verbose', "Hey log info");
}

main();
```
