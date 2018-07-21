export function getReleases(amount = 10) {
  let releases = [];
  for (let index = 1; index < amount; index++) {
    let work = { stub: '' };
    let chapter = {
      id: 'test-' + index,
      language: '',
      volume: 0,
      chapter: 0,
      thumbnail: 'thumb.png',
      subchapter: index % 2 === 0 ? 0 : 1,
      work: work
    };
    releases.push(chapter);
  }
  return releases;
}
