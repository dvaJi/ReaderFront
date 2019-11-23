import React from 'react';
import moxios from '@anilanar/moxios';
import { mountWithIntl } from 'utils/enzyme-intl';
import { actions } from 'utils/enzyme-actions';

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

it('renders without crashing', async () => {
  const wrapper = mountWithIntl(
    <Form post={postEmpty} onSubmit={handleOnSubmit} />
  );

  await actions(wrapper, async () => {
    expect(wrapper).toBeTruthy();
    wrapper.unmount();
  });
});

it('should fill the form without throwing an error', async () => {
  localStorage.setItem('user', JSON.stringify(userStorage));
  const wrapper = mountWithIntl(
    <Form post={postEmpty} onSubmit={handleOnSubmit} />
  );

  await actions(wrapper, async () => {
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
    selectLanguage.simulate('change', {
      target: { value: 2, name: 'language' }
    });

    const selectStatus = wrapper.find('select[name="status"]');
    selectStatus.simulate('change', {
      target: { value: 1, name: 'status' }
    });

    const selectType = wrapper.find('select[name="category"]');
    selectType.simulate('change', { target: { value: 1, name: 'category' } });

    wrapper.find('button[id="submit_post"]').simulate('click');
    expect(wrapper).toBeTruthy();
    wrapper.unmount();
  });
});

it('should throw an error is user is not authenticated', async () => {
  console.error = jest.fn();
  const wrapper = mountWithIntl(
    <Form post={postEmpty} onSubmit={handleOnSubmit} />
  );

  await actions(wrapper, async () => {
    expect(() => {
      wrapper.find('button[id="submit_post"]').simulate('click');
    }).toThrowError('User not authenticated');
    wrapper.unmount();
  });
});

it('should allow to upload an image', async () => {
  const wrapper = mountWithIntl(
    <Form
      post={{ ...postEmpty, uniqid: 'test.123' }}
      onSubmit={handleOnSubmit}
    />
  );

  await actions(wrapper, async () => {
    const IMAGES = [global.createFile('page_01.jpg', 1234, 'image/jpeg')];

    const fileInput = wrapper.find('input[id="uploadCover"]');
    fileInput.simulate('change', {
      target: {
        files: IMAGES
      }
    });

    await global.wait(1000);

    let request = moxios.requests.mostRecent();
    await request.respondWith({
      status: 200,
      statusText: 'OK',
      response: {
        file: 'plot_updated.jpg'
      }
    });

    await global.wait(0);

    expect(wrapper.find('#post_thumbnail').props().src).toBe(
      'http://localhost:8000/images/blog/test.123/plot_updated.jpg'
    );
  });
});

it('should fill the form with the post given', async () => {
  localStorage.setItem('user', JSON.stringify(userStorage));
  const wrapper = mountWithIntl(<Form post={post} onSubmit={handleOnSubmit} />);
  await actions(wrapper, async () => {
    await global.wait(0);

    const inputTitle = wrapper.find('input[name="title"]');
    expect(inputTitle.props().value).toBe('Lorem Ipsum 1');

    wrapper.unmount();
  });
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

  await actions(wrapper, async () => {
    wrapper.find('button[id="submit_post"]').simulate('click');

    await global.wait(0);
    expect(_post.language).toBe(1);
    expect(_post.category).toBe(1);
    expect(_post.status).toBe(1);

    wrapper.unmount();
  });
});
