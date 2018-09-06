import React from 'react';
import { shallow } from 'enzyme';
import ImagesList from './ImagesList';
import { getRelease } from '../../utils/mocks/getReleasesMock';

function handleChapterChange(chapter) {
  //
}
const chapter = getRelease();
const pages = [
  {
    id: 1,
    filename: 1 + 'l.png',
    thumb_url: '/root/' + 1 + 'l.png'
  },
  {
    id: 2,
    filename: 2 + 'l.png',
    thumb_url: '/root/' + 2 + 'l.png'
  }
];

it('should render while loading and cascade mode without throwing an error', () => {
  const wrapper = shallow(
    <ImagesList
      loading={true}
      cascade={true}
      pageSelected={1}
      onPageSelected={2}
      onChapterChange={handleChapterChange}
      chapter={chapter}
      pages={pages}
    />
  );
});

it('should render loaded with cascade mode without throwing an error', () => {
  const wrapper = shallow(
    <ImagesList
      loading={false}
      cascade={true}
      pageSelected={1}
      onPageSelected={2}
      onChapterChange={handleChapterChange}
      chapter={chapter}
      pages={pages}
    />
  );
});

it('should render loaded without cascade mode without throwing an error', () => {
  const wrapper = shallow(
    <ImagesList
      loading={false}
      cascade={false}
      pageSelected={1}
      onPageSelected={2}
      onChapterChange={handleChapterChange}
      chapter={chapter}
      pages={pages}
    />
  );
});
