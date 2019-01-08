import React from 'react';
import moxios from '@anilanar/moxios';
import { mountWithIntl } from 'enzyme-react-intl';

import Form from './Form';

const handleOnSubmit = jest.fn();
const userStorage = {
  email: 'admin@weeabo.com',
  id: 1,
  name: 'The Admin',
  role: 'ADMIN'
};
const post = global.rfMocks.posts.getPost;
let postEmpty = {};

beforeEach(() => {
  moxios.install();
  postEmpty = {
    id: 0,
    userId: 0,
    content: '',
    category: 0,
    uniqid: '',
    type: 0,
    title: '',
    stub: '',
    status: 0,
    sticky: false,
    language: 0,
    thumbnail: ''
  };
});

afterEach(() => {
  localStorage.clear();
  console.error = global.originalError;
  moxios.uninstall();
});

it('renders without crashing', () => {
  const wrapper = mountWithIntl(
    <Form post={postEmpty} onSubmit={handleOnSubmit} />
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should fill the form without throwing an error', async () => {
  localStorage.setItem('user', JSON.stringify(userStorage));
  const wrapper = mountWithIntl(
    <Form post={postEmpty} onSubmit={handleOnSubmit} />
  );

  const inputTitle = wrapper.find('input[name="title"]');
  inputTitle.simulate('change', {
    target: { value: 'Test post', name: 'title' }
  });

  const mdEditor = wrapper.find('.public-DraftEditor-content');
  mdEditor.simulate(
    'paste',
    global.createPasteEvent(`<b>bold</b> <i>italic</i> <br/> stuff`)
  );

  const selectLanguage = wrapper.find('select[name="language"]');
  selectLanguage.simulate('change', { target: { value: 2, name: 'language' } });

  const selectStatus = wrapper.find('select[name="status"]');
  selectStatus.simulate('change', {
    target: { value: 1, name: 'status' }
  });

  const selectType = wrapper.find('select[name="category"]');
  selectType.simulate('change', { target: { value: 1, name: 'category' } });

  wrapper.find('button[id="submit_post"]').simulate('click');
  expect(wrapper).toBeTruthy();
  await wrapper.unmount();
});

it('should throw an error is user is not authenticated', () => {
  console.error = jest.fn();
  const wrapper = mountWithIntl(
    <Form post={postEmpty} onSubmit={handleOnSubmit} />
  );

  expect(() => {
    wrapper.find('button[id="submit_post"]').simulate('click');
  }).toThrowError('User not authenticated');
  wrapper.unmount();
});

it('should allow to upload an image', async () => {
  const image = {
    name: 'plot.jpg',
    size: 1000,
    type: 'image/jpeg'
  };

  const wrapper = mountWithIntl(
    <Form post={postEmpty} onSubmit={handleOnSubmit} />
  );

  const fileContents = image;
  const file = new Blob([fileContents], { type: 'text/plain' });

  const fileInput = wrapper.find('input[id="uploadCover"]');
  fileInput.simulate('change', {
    target: {
      files: file
    }
  });

  await global.wait(0);
  let request = moxios.requests.mostRecent();
  await request.respondWith({
    status: 200,
    statusText: 'OK',
    response: {
      file: 'plot_updated.jpg'
    }
  });

  await global.wait(0);
  expect(wrapper.state().post.thumbnail).toBe('plot_updated.jpg');

  wrapper.unmount();
});

it('should fill the form with the post given', async () => {
  localStorage.setItem('user', JSON.stringify(userStorage));
  const wrapper = mountWithIntl(<Form post={post} onSubmit={handleOnSubmit} />);

  await global.wait(0);
  const thumbnail = wrapper.find('img[id="post_thumbnail"]');
  expect(thumbnail).toBeTruthy();
  expect(thumbnail.prop('src')).toContain(post.thumbnail);

  const inputTitle = wrapper.find('input[name="title"]');
  expect(inputTitle.props().value).toBe('Lorem Ipsum 1');

  wrapper.unmount();
});

it('should normalize object before submit', async () => {
  let _post = {};
  const cHandleOnSubmit = (e, post) => {
    _post = post;
  };
  localStorage.setItem('user', JSON.stringify(userStorage));
  const wrapper = mountWithIntl(
    <Form post={postEmpty} onSubmit={cHandleOnSubmit} />
  );

  wrapper.find('button[id="submit_post"]').simulate('click');

  await global.wait(0);
  expect(_post.language).toBe(1);
  expect(_post.category).toBe(1);
  expect(_post.status).toBe(1);

  wrapper.unmount();
});
