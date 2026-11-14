import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LogLevel, WoodCutter } from '../src/index.js';

const ESCAPE = '\u001b[';
let written: string[];

// winston's console transport writes through `console._stdout`, which Vitest replaces.
const consoleStdout = (console as unknown as { _stdout: NodeJS.WriteStream })._stdout;

beforeEach(() => {
  written = [];
  const capture = (chunk: string | Uint8Array): boolean => {
    written.push(String(chunk));
    return true;
  };
  vi.spyOn(process.stdout, 'write').mockImplementation(capture);
  vi.spyOn(consoleStdout, 'write').mockImplementation(capture);
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

const lines = () => written.join('').split('\n').filter(Boolean);

describe('WoodCutter', () => {
  it('logs an info line with a timestamp, a level tag and the message', () => {
    new WoodCutter({ colorize: false }).info('hello', { a: 1 });
    expect(lines()).toHaveLength(1);
    expect(lines()[0]).toMatch(/^\d{4}-\d\d-\d\d \d\d:\d\d:\d\d - \[INFO\]\s+ \| hello \{"a":1\}$/);
  });

  it('uses a custom timestamp format', () => {
    new WoodCutter({ colorize: false, timestampFormat: '[T]' }).info('x');
    expect(lines()[0]).toBe('T - [INFO]    | x');
  });

  it('defaults to the info level', () => {
    const logger = new WoodCutter({ colorize: false });
    logger.debug('hidden');
    logger.verbose('hidden');
    logger.silly('hidden');
    logger.info('shown');
    logger.warn('shown');
    logger.error('shown');
    expect(lines()).toHaveLength(3);
  });

  it.each([
    [LogLevel.ERROR, 1],
    [LogLevel.WARN, 2],
    [LogLevel.INFO, 3],
    [LogLevel.VERBOSE, 4],
    [LogLevel.DEBUG, 5],
    [LogLevel.SILLY, 6],
  ])('at level %s emits %i levels', (level, count) => {
    const logger = new WoodCutter({ colorize: false, level });
    logger.error('e');
    logger.warn('w');
    logger.info('i');
    logger.verbose('v');
    logger.debug('d');
    logger.silly('s');
    expect(lines()).toHaveLength(count);
  });

  it('accepts a level as a string', () => {
    const logger = new WoodCutter({ colorize: false, level: 'debug' });
    logger.debug('shown');
    expect(lines()).toHaveLength(1);
  });

  it('log() takes the level as an argument and formats placeholders', () => {
    new WoodCutter({ colorize: false }).log(LogLevel.WARN, 'Hey %s', 'you');
    expect(lines()[0]).toMatch(/\[WARN\]\s+ \| Hey you$/);
  });

  it('returns itself so calls can be chained', () => {
    const logger = new WoodCutter({ colorize: false });
    expect(logger.info('a').warn('b')).toBe(logger);
    expect(lines()).toHaveLength(2);
  });

  it('colors lines by default', () => {
    vi.stubEnv('NO_COLOR', '');
    new WoodCutter().error('red');
    expect(written.join('')).toContain(ESCAPE);
  });

  it('does not color lines when colorize is false', () => {
    new WoodCutter({ colorize: false }).error('plain');
    expect(written.join('')).not.toContain(ESCAPE);
  });

  it('does not color lines when NO_COLOR is set', () => {
    vi.stubEnv('NO_COLOR', '1');
    new WoodCutter().error('plain');
    expect(written.join('')).not.toContain(ESCAPE);
  });

  it('works without any configuration', () => {
    expect(() => new WoodCutter()).not.toThrow();
  });
});
