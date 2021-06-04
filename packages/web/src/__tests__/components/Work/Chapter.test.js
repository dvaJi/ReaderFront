import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import Chapter from '@components/Work/Chapter';

const chapter = {
  language: 'es',
  volume: 1,
  chapter: 30,
  subchapter: 0,
  name: 'dis way',
  download_href: '/download/infection',
  read_path: '/read/infection/es/1/30.0'
};

const work = {
  stub: 'infection',
  chapters: [chapter]
};

it('renders without crashing', () => {
  const wrapper = mountWithIntl(
    <Chapter
      key={1}
      work={work}
      chapter={chapter}
      language={{ id: 1, name: 'es' }}
    />
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('renders with subchapter without crashing', () => {
  const chapter = {
    language: 'es',
    volume: 1,
    chapter: 30,
    subchapter: '0',
    name: 'dis way',
    download_href: '/download/infection',
    read_path: '/read/infection/es/1/30.0'
  };
  const wrapper = mountWithIntl(
    <Chapter
      key={1}
      work={work}
      chapter={chapter}
      language={{ id: 1, name: 'es' }}
    />
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('renders without name without crashing', () => {
  const chapter = {
    language: 'es',
    volume: 1,
    chapter: 30,
    subchapter: '0',
    name: '',
    download_href: '/download/infection',
    read_path: '/read/infection/es/1/30.0'
  };
  const wrapper = mountWithIntl(
    <Chapter
      key={1}
      work={work}
      chapter={chapter}
      language={{ id: 1, name: 'es' }}
    />
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should show a badge if the chapter is the end', () => {
  const onButtonClick = jest.fn();
  const wrapper = mountWithIntl(
    <Chapter
      key={1}
      work={work}
      onclick={onButtonClick}
      chapter={chapter}
      language={{ id: 1, name: 'es' }}
      isEnd={true}
    />
  );

  expect(wrapper.find('#end_chapter')).toBeTruthy();

  wrapper.unmount();
});
