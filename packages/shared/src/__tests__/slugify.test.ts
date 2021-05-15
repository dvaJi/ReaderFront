import { slugify } from '../slugify';

describe('slugify', () => {
  it('should slugify a given string', () => {
    expect(slugify('Hello World')).toBe('hello_world');
  });

  it('should slugify a given string with dots', () => {
    expect(slugify('Hello World...', true)).toBe('hello_world...');
  });

  it('should return an empty string', () => {
    const text = null as unknown;
    expect(slugify(text as string)).toBe('');
  });
});
