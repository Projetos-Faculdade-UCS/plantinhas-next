import { describe, expect, it } from 'vitest';
import { objectToSearchParams } from './utils';

describe('objectToSearchParams', () => {
  it('converts a simple object to search params', () => {
    const result = objectToSearchParams({ a: 1, b: 'test' });
    expect(result.toString()).toBe('a=1&b=test');
  });

  it('ignores keys with undefined values', () => {
    const result = objectToSearchParams({ a: 1, b: undefined, c: 'test' });
    expect(result.toString()).toBe('a=1&c=test');
  });
});
