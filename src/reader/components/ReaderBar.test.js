import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';
import { MemoryRouter } from 'react-router-dom';
import ReaderBar from './ReaderBar';

it('renders without crashing', () => {
  let chapter = {
    chapter: 20,
    volume: 2,
    subchapter: 0,
    language: 'es'
  };

  let chapters = [chapter, chapter, chapter];

  let work = {
    stub: 'infection'
  };

  mountWithIntl(
    <MemoryRouter>
      <ReaderBar
        chapter={chapter}
        chapters={chapters}
        work={work}
        prevChapter={1}
        nextChapter={-1}
      />
    </MemoryRouter>
  );
});

it('renders without any work or chapter', () => {
  mountWithIntl(
    <MemoryRouter>
      <ReaderBar
        chapter={{}}
        chapters={{}}
        work={{}}
        prevChapter={-1}
        nextChapter={-1}
      />
    </MemoryRouter>
  );
});
