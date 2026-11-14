/**
 * Log levels, from the most to the least severe.
 * A logger set to a given level emits that level and every more severe one.
 */
export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  VERBOSE = 'verbose',
  DEBUG = 'debug',
  SILLY = 'silly',
}
