import {LogLevel} from '../lib/log-level.enum';
import {WoodCutter} from '../lib/woodcutter';


function main() {
  const woodcutter = new WoodCutter({
    level: LogLevel.SILLY
  });
  woodcutter.debug("Hey debug", 5, "test", {"hello": "world"});
  woodcutter.info("Hey info");
  woodcutter.error("Hey error");
  woodcutter.verbose("Hey verbose");
  woodcutter.warn("Hey warn");
  woodcutter.silly("Hey silly");
  woodcutter.log(LogLevel.VERBOSE, "Hey log info");
}

main();
