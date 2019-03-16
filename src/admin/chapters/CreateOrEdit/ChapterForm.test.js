import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';

import ChapterForm from './ChapterForm';

const handleOnSubmit = jest.fn();
const userStorage = {
  email: 'admin@weeabo.com',
  id: 1,
  name: 'The Admin',
  role: 'ADMIN'
};
let chapterEmpty = {};

beforeEach(() => {
  chapterEmpty = {
    id: 0,
    workId: 0,
    chapter: 0,
    subchapter: 0,
    volume: 0,
    language: 0,
    name: '',
    stub: '',
    uniqid: '',
    hidden: false,
    description: '',
    thumbnail: '',
    releaseDate: new Date()
  };
});

afterEach(() => {
  localStorage.clear();
});

it('renders without crashing', () => {
  const wrapper = mountWithIntl(
    <ChapterForm chapter={chapterEmpty} onSubmit={handleOnSubmit} />
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should fill the form without throwing an error', async () => {
  localStorage.setItem('user', JSON.stringify(userStorage));
  const wrapper = mountWithIntl(
    <ChapterForm chapter={chapterEmpty} onSubmit={handleOnSubmit} />
  );

  const inputName = wrapper.find('input[name="name"]');
  inputName.simulate('change', {
    target: { value: 'Test chapter', name: 'name' }
  });

  const inputVolume = wrapper.find('input[name="volume"]');
  inputVolume.simulate('change', {
    target: { value: '1', name: 'volume' }
  });

  const inputChapter = wrapper.find('input[name="chapter"]');
  inputChapter.simulate('change', {
    target: { value: '1', name: 'chapter' }
  });

  const inputSubchapter = wrapper.find('input[name="subchapter"]');
  inputSubchapter.simulate('change', {
    target: { value: '1', name: 'subchapter' }
  });

  const selectLanguage = wrapper.find('select[name="language"]');
  selectLanguage.simulate('change', { target: { value: 2, name: 'language' } });

  wrapper.find('button[id="submit_chapter"]').simulate('click');
  expect(wrapper).toBeTruthy();
  await wrapper.unmount();
});

it('should throw an error is user is not authenticated', () => {
  console.error = jest.fn();
  const wrapper = mountWithIntl(
    <ChapterForm chapter={chapterEmpty} onSubmit={handleOnSubmit} />
  );

  expect(() => {
    wrapper.find('button[id="submit_chapter"]').simulate('click');
  }).toThrowError('User not authenticated');
  wrapper.unmount();
});

it('should normalize object before submit', async () => {
  let _chapter = {};
  const cHandleOnSubmit = (e, chapter) => {
    _chapter = chapter;
  };
  localStorage.setItem('user', JSON.stringify(userStorage));
  const wrapper = mountWithIntl(
    <ChapterForm chapter={chapterEmpty} onSubmit={cHandleOnSubmit} />
  );

  wrapper.find('button[id="submit_chapter"]').simulate('click');

  await global.wait(0);
  expect(_chapter.language).toBe(1);
  expect(_chapter.stub).toBe('0-0_');
  expect(_chapter.hidden).not.toBeNull();

  wrapper.unmount();
});
