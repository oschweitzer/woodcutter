import { LogLevel } from '../log-level.enum';

/**
 * Logger configuration information
 */
export interface ConfigurationInterface {
  /**
   * String representing a timestamp format,
   * it uses momentjs library underneath (https://momentjs.com/docs/#/displaying/format/)
   */
  timestampFormat?: string;

  /**
   * Chosen log level for the logger.
   */
  level?: LogLevel;
}
