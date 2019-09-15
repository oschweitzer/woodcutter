import * as moment from 'moment';
import {config as winstonConfig, Logger, LoggerInstance, TransportInstance, transports} from 'winston';
import {ConfigurationInterface} from './interfaces/configuration.interface';
import {LogLevel} from './log-level.enum';

/**
 * Class representing the Woodcutter logger.
 * @class
 */
export class WoodCutter {
  private logger: LoggerInstance;
  private LEVEL_STRING_SIZE = 9;
  private readonly configuration: ConfigurationInterface;

  /**
   * Create a Woodcutter logger instance.
   * @param configuration {object} - Configuration object.
   */
  constructor(configuration?: ConfigurationInterface) {
    this.configuration = {
      timestampFormat: configuration.timestampFormat || "YYYY-MM-DD HH:mm:ss",
      level: configuration.level || LogLevel.INFO
    };

    this.logger = new Logger({
      transports: [this.configureTransport(this.configuration)],
      level: this.configuration.level
    });
  }

  /**
   * Create a console transport with appropriate format.
   * @param userConfiguration {} - Configuration object provided by the user.
   */
  private configureTransport(
    userConfiguration: ConfigurationInterface
  ): TransportInstance {
    return new transports.Console({
      timestamp: function() {
        return moment().format(userConfiguration.timestampFormat);
      },
      formatter: options => {
        return winstonConfig.colorize(
          options.level,
          `${options.timestamp()} - ${(
            "[" +
            options.level.toUpperCase() +
            "]"
          ).padEnd(this.LEVEL_STRING_SIZE, " ")} | ${
            options.message ? options.message : ""
          }${
            options.meta && Object.keys(options.meta).length
              ? JSON.stringify(options.meta)
              : ""
          }`
        );
      }
    });
  }

  /**
   *
   * @param level {object} - Log level.
   * @param message {string} - String to log.
   * @param metadata {object} - Metadata object to log.
   */
  log(level: LogLevel, message: string, ...metadata: any[]) {
    return this.logger.log(level, message, ...metadata);
  }

  /**
   *
   * @param message {string} - String to log.
   * @param metadata {object} - Metadata object to log.
   */
  info(message: string, ...metadata: any[]) {
    return this.logger.info(message, ...metadata);
  }

  /**
   *
   * @param message {string} - String to log.
   * @param metadata {object} - Metadata object to log.
   */
  error(message: string, ...metadata: any[]) {
    return this.logger.error(message, ...metadata);
  }

  /**
   *
   * @param message {string} - String to log.
   * @param metadata {object} - Metadata object to log.
   */
  warn(message: string, ...metadata: any[]) {
    return this.logger.warn(message, ...metadata);
  }

  /**
   *
   * @param message {string} - String to log.
   * @param metadata {object} - Metadata object to log.
   */
  debug(message: string, ...metadata: any[]) {
    return this.logger.debug(message, ...metadata);
  }

  /**
   *
   * @param message {string} - String to log.
   * @param metadata {object} - Metadata object to log.
   */
  verbose(message: string, ...metadata: any[]) {
    return this.logger.verbose(message, ...metadata);
  }

  /**
   *
   * @param message {string} - String to log.
   * @param metadata {object} - Metadata object to log.
   */
  silly(message: string, ...metadata: any[]) {
    return this.logger.silly(message, ...metadata);
  }
}
