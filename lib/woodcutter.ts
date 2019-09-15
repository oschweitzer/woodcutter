import * as moment from "moment";
import {
  config as winstonConfig,
  Logger,
  LoggerInstance,
  TransportInstance,
  transports
} from "winston";
import { ConfigurationInterface } from "./interfaces/configuration.interface";

export class WoodCutter {
  private logger: LoggerInstance;
  private LEVEL_STRING_SIZE = 9;
  public configuration: ConfigurationInterface;

  constructor(configuration?: ConfigurationInterface) {
    this.configuration = {
      timestampFormat: configuration.timestampFormat || "YYYY-MM-DD HH:mm:ss",
      level: configuration.level || "info"
    };

    this.logger = new Logger({
      transports: [this.configureTransport(this.configuration)],
      level: this.configuration.level
    });
  }

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

  log(level: string, message: string, ...metadata: any[]) {
    return this.logger.log(level, message, ...metadata);
  }

  info(message: string, ...metadata: any[]) {
    return this.logger.info(message, ...metadata);
  }

  error(message: string, ...metadata: any[]) {
    return this.logger.error(message, ...metadata);
  }

  warn(message: string, ...metadata: any[]) {
    return this.logger.warn(message, ...metadata);
  }

  debug(message: string, ...metadata: any[]) {
    return this.logger.debug(message, ...metadata);
  }

  verbose(message: string, ...metadata: any[]) {
    return this.logger.verbose(message, ...metadata);
  }

  silly(message: string, ...metadata: any[]) {
    return this.logger.silly(message, ...metadata);
  }
}
