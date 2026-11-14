import { format } from 'node:util';

const LEVEL_TAG_WIDTH = 9;

/** Make errors visible in JSON: `JSON.stringify(new Error('x'))` is `{}`. */
function replacer(_key: string, value: unknown): unknown {
  return value instanceof Error
    ? { name: value.name, message: value.message, stack: value.stack }
    : value;
}

function isMetadata(value: unknown): value is object {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Turn a message and its extra arguments into the text of a log line.
 *
 * - A trailing object is metadata: it is appended as JSON (when not empty).
 * - Any other extra argument is formatted like `util.format` does, so
 *   `info('Hey %s', 'you')` and `info('Hey', 5)` both work.
 */
export function renderMessage(message: string, args: unknown[]): string {
  const rest = [...args];
  const last = rest[rest.length - 1];
  const metadata = isMetadata(last) && !(last instanceof Error) ? last : undefined;
  if (metadata) {
    rest.pop();
  }
  const text = rest.length > 0 ? format(message, ...rest) : message;
  if (!metadata || Object.keys(metadata).length === 0) {
    return text;
  }
  return `${text} ${JSON.stringify(metadata, replacer)}`;
}

/** `[INFO]   ` : the level in capitals, in brackets, padded to a fixed width. */
export function levelTag(level: string): string {
  return `[${level.toUpperCase()}]`.padEnd(LEVEL_TAG_WIDTH, ' ');
}

export function renderLine(timestamp: string, level: string, text: string): string {
  return `${timestamp} - ${levelTag(level)} | ${text}`;
}
