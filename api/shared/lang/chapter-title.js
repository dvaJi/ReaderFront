export function chapterTitle({ chapter, f }) {
  const subchapter = chapter.subchapter !== 0 ? '.' + chapter.subchapter : '';
  const volumeTxt = f({
    id: 'volume',
    defaultMessage: 'Volume'
  });
  const chapterTxt = f({
    id: 'chapter',
    defaultMessage: 'Chapter'
  });
  const volume = chapter.volume > 0 ? `${volumeTxt} ${chapter.volume} ` : '';
  return `${volume}${chapterTxt} ${chapter.chapter}${subchapter}${
    chapter.name !== '' ? `: ${chapter.name}` : ''
  }`;
}
