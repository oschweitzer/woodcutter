const pad = (value: number, size = 2): string => String(value).padStart(size, '0');

const TOKENS = /\[([^\]]*)\]|YYYY|YY|MM|M|DD|D|HH|H|mm|m|ss|s|SSS/g;

/**
 * Format a date in local time with a small, moment-like pattern.
 * See `ConfigurationInterface.timestampFormat` for the supported tokens.
 */
export function formatTimestamp(date: Date, pattern: string): string {
  return pattern.replace(TOKENS, (token: string, literal?: string) => {
    if (literal !== undefined) {
      return literal;
    }
    switch (token) {
      case 'YYYY':
        return pad(date.getFullYear(), 4);
      case 'YY':
        return pad(date.getFullYear() % 100);
      case 'MM':
        return pad(date.getMonth() + 1);
      case 'M':
        return String(date.getMonth() + 1);
      case 'DD':
        return pad(date.getDate());
      case 'D':
        return String(date.getDate());
      case 'HH':
        return pad(date.getHours());
      case 'H':
        return String(date.getHours());
      case 'mm':
        return pad(date.getMinutes());
      case 'm':
        return String(date.getMinutes());
      case 'ss':
        return pad(date.getSeconds());
      case 's':
        return String(date.getSeconds());
      default:
        return pad(date.getMilliseconds(), 3);
    }
  });
}
