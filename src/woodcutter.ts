import winston from 'winston';
import type { ConfigurationInterface } from './configuration.js';
import { LogLevel } from './log-level.js';
import { renderLine, renderMessage } from './render.js';
import { formatTimestamp } from './timestamp.js';

const DEFAULT_TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss';

/**
 * A small console logger built on winston.
 *
 * ```ts
 * const logger = new WoodCutter({ level: LogLevel.DEBUG });
 * logger.info('Server started', { port: 3000 });
 * ```
 */
export class WoodCutter {
  private readonly logger: winston.Logger;
  private readonly configuration: Required<ConfigurationInterface>;

  constructor(configuration: ConfigurationInterface = {}) {
    this.configuration = {
      level: configuration.level ?? LogLevel.INFO,
      timestampFormat: configuration.timestampFormat ?? DEFAULT_TIMESTAMP_FORMAT,
      colorize: configuration.colorize ?? !process.env.NO_COLOR,
    };

    const colorizer = winston.format.colorize();
    this.logger = winston.createLogger({
      level: this.configuration.level,
      transports: [
        new winston.transports.Console({
          format: winston.format.printf(({ level, message }) => {
            const line = renderLine(
              formatTimestamp(new Date(), this.configuration.timestampFormat),
              level,
              String(message),
            );
            return this.configuration.colorize ? colorizer.colorize(level, line) : line;
          }),
        }),
      ],
    });
  }

  /**
   * Log at the given level.
   * @param level Log level.
   * @param message Text to log; it may contain `util.format` placeholders.
   * @param metadata Extra values. A trailing object is appended as JSON.
   */
  public log(level: LogLevel | `${LogLevel}`, message: string, ...metadata: unknown[]): this {
    this.logger.log(level, renderMessage(message, metadata));
    return this;
  }

  public error(message: string, ...metadata: unknown[]): this {
    return this.log(LogLevel.ERROR, message, ...metadata);
  }

  public warn(message: string, ...metadata: unknown[]): this {
    return this.log(LogLevel.WARN, message, ...metadata);
  }

  public info(message: string, ...metadata: unknown[]): this {
    return this.log(LogLevel.INFO, message, ...metadata);
  }

  public verbose(message: string, ...metadata: unknown[]): this {
    return this.log(LogLevel.VERBOSE, message, ...metadata);
  }

  public debug(message: string, ...metadata: unknown[]): this {
    return this.log(LogLevel.DEBUG, message, ...metadata);
  }

  public silly(message: string, ...metadata: unknown[]): this {
    return this.log(LogLevel.SILLY, message, ...metadata);
  }
}
