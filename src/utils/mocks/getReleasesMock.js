export function getReleases(amount = 2) {
  let releases = [];
  for (let index = 1; index < amount; index++) {
    let work = { name: 'Test1', stub: 'test1', uniqid: 'wqioweas' };
    let chapter = {
      id: index,
      language: 1,
      volume: 0,
      chapter: 0,
      name: 'Test ' + index,
      stub: 'test-' + index,
      thumbnail: 'thumb.png',
      subchapter: index % 2 === 0 ? 0 : 1,
      work: work
    };
    releases.push(chapter);
  }
  return releases;
}

export function getRelease() {
  let work = { name: 'Test1', stub: '', uniqid: 'wqioweas' };
  return {
    id: 1,
    uniqid: 'test-1',
    language: 1,
    volume: 0,
    chapter: 0,
    name: 'Test 1',
    stub: 'test-1',
    thumbnail: 'thumb.png',
    subchapter: 1,
    work: work
  };
}
