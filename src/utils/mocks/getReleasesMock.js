export function getReleases(amount = 2) {
  let releases = [];
  for (let index = 1; index < amount + 1; index++) {
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

export function getPages(amount = 2) {
  let pages = [];
  for (let index = 1; index < amount; index++) {
    pages.push({
      id: index,
      filename: 'page_0' + index + '.jpg',
      height: 100,
      width: 80,
      size: 8090
    });
  }
  return pages;
}

export function getPagesAsFiles(amount = 2) {
  let pages = [];
  for (let index = 1; index < amount; index++) {
    pages.push({
      id: index,
      filename: 'page_0' + index + '.jpg',
      uploaded: false,
      height: 100,
      width: 80,
      file: {
        preview: 'page_0' + index + '.jpg',
        size: 8090,
        type: 'jpg'
      },
      isUploading: false,
      hasError: false
    });
  }
  return pages;
}

export function getPagesUploaded(amount = 2) {
  let pages = [];
  for (let index = 1; index < amount; index++) {
    pages.push({
      id: index,
      filename: 'page_0' + index + '.jpg',
      uploaded: true,
      height: 100,
      width: 80,
      size: 8090
    });
  }
  return pages;
}
