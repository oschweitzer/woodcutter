import { describe, expect, it } from 'vitest';
import { levelTag, renderLine, renderMessage } from '../src/render.js';

describe('renderMessage', () => {
  it('returns the message alone', () => {
    expect(renderMessage('Hey', [])).toBe('Hey');
  });

  it('appends a trailing object as JSON', () => {
    expect(renderMessage('Hey', [{ hello: 'world' }])).toBe('Hey {"hello":"world"}');
  });

  it('ignores an empty trailing object', () => {
    expect(renderMessage('Hey', [{}])).toBe('Hey');
  });

  it('formats other arguments like util.format', () => {
    expect(renderMessage('Hey', [5, 'test'])).toBe('Hey 5 test');
    expect(renderMessage('Hey %s', ['you'])).toBe('Hey you');
  });

  it('combines both', () => {
    expect(renderMessage('Hey debug', [5, 'test', { hello: 'world' }])).toBe(
      'Hey debug 5 test {"hello":"world"}',
    );
  });

  it('serializes errors with their name, message and stack', () => {
    const error = new Error('disk full');
    const out = JSON.parse(renderMessage('Failed', [{ error }]).slice('Failed '.length)) as {
      error: { name: string; message: string; stack: string };
    };
    expect(out.error.name).toBe('Error');
    expect(out.error.message).toBe('disk full');
    expect(out.error.stack).toContain('disk full');
  });

  it('formats a bare error argument with util.format', () => {
    expect(renderMessage('Failed:', [new Error('boom')])).toContain('Error: boom');
  });
});

describe('renderLine', () => {
  it('pads the level tag to a fixed width', () => {
    expect(levelTag('info')).toBe('[INFO]   ');
    expect(levelTag('verbose')).toBe('[VERBOSE]');
  });

  it('builds the line', () => {
    expect(renderLine('2026-11-04 09:05:07', 'warn', 'careful')).toBe(
      '2026-11-04 09:05:07 - [WARN]    | careful',
    );
  });
});
