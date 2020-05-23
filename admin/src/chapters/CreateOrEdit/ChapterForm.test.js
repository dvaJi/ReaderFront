import React from 'react';
import { mount } from 'enzyme';

import ChapterForm from './ChapterForm';

const releases = global.rfMocks.releases.getReleases;

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
    language: 1,
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
  const wrapper = mount(
    <ChapterForm chapter={chapterEmpty} onSubmit={handleOnSubmit} />
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should fill the form without throwing an error', async () => {
  localStorage.setItem('user', JSON.stringify(userStorage));
  const wrapper = mount(
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

  wrapper.find('button[id="submit_chapter"]').simulate('click');
  expect(wrapper).toBeTruthy();
  await wrapper.unmount();
});

it('should show an error if user is not authenticated', async () => {
  const wrapper = mount(<ChapterForm chapter={chapterEmpty} />);
  wrapper.find('button[id="submit_chapter"]').simulate('click');
  await global.wait(0);

  expect(wrapper.find('#error_msg')).toBeTruthy();
  wrapper.unmount();
});

it('should show an error if chapters is not greater than 0', async () => {
  localStorage.setItem('user', JSON.stringify(userStorage));
  const wrapper = mount(<ChapterForm chapter={chapterEmpty} />);
  wrapper.find('button[id="submit_chapter"]').simulate('click');

  await global.wait(0);
  expect(wrapper.find('#error_msg')).toBeTruthy();
  wrapper.unmount();
});

it('should normalize object before submit', async () => {
  let _chapter = {};
  const cHandleOnSubmit = (e, chapter) => {
    _chapter = chapter;
  };
  localStorage.setItem('user', JSON.stringify(userStorage));
  const wrapper = mount(
    <ChapterForm chapter={chapterEmpty} onSubmit={cHandleOnSubmit} />
  );

  const inputChapter = wrapper.find('input[name="chapter"]');
  inputChapter.simulate('change', {
    target: { value: '1', name: 'chapter' }
  });
  wrapper.find('button[id="submit_chapter"]').simulate('click');

  await global.wait(0);
  expect(_chapter.language).toBe(1);
  expect(_chapter.stub).toBe('1-0_');
  expect(_chapter.hidden).not.toBeNull();

  wrapper.unmount();
});

it('should fill with the chapter given', async () => {
  localStorage.setItem('user', JSON.stringify(userStorage));
  const wrapper = mount(
    <ChapterForm chapter={releases[0]} onSubmit={handleOnSubmit} />
  );

  const inputName = wrapper.find('input[name="name"]').instance().value;
  const inputVolume = wrapper.find('input[name="volume"]').instance().value;
  const inputChapter = wrapper.find('input[name="chapter"]').instance().value;
  const inputSubchapter = wrapper.find('input[name="subchapter"]').instance()
    .value;

  expect(inputName).toBe(releases[0].name || '');
  expect(parseInt(inputVolume, 0)).toBe(releases[0].volume);
  expect(parseInt(inputChapter, 0)).toBe(releases[0].chapter);
  expect(parseInt(inputSubchapter, 0)).toBe(releases[0].subchapter);

  await wrapper.unmount();
});
