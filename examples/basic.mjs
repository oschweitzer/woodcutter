import { LogLevel, WoodCutter } from '../dist/esm/index.js';

const logger = new WoodCutter({ level: LogLevel.SILLY });

logger.error('Hey error');
logger.warn('Hey warn');
logger.info('Hey info');
logger.verbose('Hey verbose');
logger.debug('Hey debug', 5, 'test', { hello: 'world' });
logger.silly('Hey silly');
logger.log(LogLevel.INFO, 'Hey %s', 'log');
logger.error('Failed to save', { error: new Error('disk full') });
