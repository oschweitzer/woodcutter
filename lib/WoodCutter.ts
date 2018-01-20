import * as winston from "winston";
import * as moment from 'moment';

export class WoodCutter {
  private logger:any;

  constructor(configuration?:any) {
    const config = configuration || {
      timestampFormat: 'YYYY-MM-DD HH:mm:ss'
    };

    this.logger = new (winston.Logger)({
      transports: [
        new (winston.transports.Console)({
          timestamp: function() {
            return moment().format(config.timestampFormat)
          },
          formatter: (options) => {
            const format = `${winston.config.colorize(options.level, `[${options.level.toUpperCase()}]`)}`
            + ` - ${options.timestamp()}`
            + `    ${winston.config.colorize(options.level, (options.message ? options.message : ''))}`
            + `  ${winston.config.colorize(options.level, (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' ))}`;
            return format;
          }
        })
      ]
    });
  }

  log(level:string, message:string, metadata?:any) {
    return this.logger.log(level, message, metadata);
  }

  info(message:string, metadata?:any) {
    return this.logger.info(message, metadata);
  }

  error(message:string, metadata?:any) {
    return this.logger.error(message, metadata);
  }

  warn(message:string, metadata?:any) {
    return this.logger.warn(message, metadata);
  }

  debug(message:string, metadata?:any) {
    return this.logger.debug(message, metadata);
  }

  verbose(message:string, metadata?:any) {
    return this.logger.verbose(message, metadata);
  }

  silly(message:string, metadata?:any) {
    return this.logger.silly(message, metadata);
  }

}