import { basename } from 'path';
import { getFileExtension, generateChapterDir } from '../utils';

describe('getFileExtension', () => {
  it('detects the extension', () => {
    const extension = getFileExtension('page_001.jpg');
    expect(extension).toBe('jpg');
  });

  it('should return undefined if file has no extension', () => {
    const extension = getFileExtension('page_001_broken');
    expect(extension).toBeUndefined();
  });
});

describe('generateChapterDir', () => {
  it('generate a path of the file', () => {
    const chapter = { uniqid: '12345' };
    const work = { uniqid: '98765' };
    const path = generateChapterDir(chapter, work, 'page-1.png');
    expect(typeof basename(path)).toBe('string');
  });

  it('generate a path of the directory if filename is undefined', () => {
    const chapter = { uniqid: '12345' };
    const work = { uniqid: '98765' };
    const path = generateChapterDir(chapter, work);
    expect(typeof basename(path)).toBe('string');
  });
});
