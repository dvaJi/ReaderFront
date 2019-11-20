import React from 'react';
import moxios from '@anilanar/moxios';
import { mount } from 'enzyme';
import { render, fireEvent } from '@testing-library/react';

import Form from './Form';

const handleOnSubmit = jest.fn();
const userStorage = {
  email: 'admin@weeabo.com',
  id: 1,
  name: 'The Admin',
  role: 'ADMIN'
};
const work = global.rfMocks.work.work;
let workEmpty = {};

beforeEach(() => {
  moxios.install();
  workEmpty = {
    id: 0,
    name: '',
    stub: '',
    type: '',
    hidden: false,
    demographicId: 0,
    status: 0,
    statusReason: '',
    adult: false,
    visits: 0,
    thumbnail: '',
    works_descriptions: [],
    works_genres: [],
    people_works: []
  };
});

afterEach(() => {
  localStorage.clear();
  console.error = global.originalError;
  moxios.uninstall();
});

it('renders without crashing', () => {
  const wrapper = mount(<Form work={workEmpty} onSubmit={handleOnSubmit} />);
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should fill the form without throwing an error', async () => {
  localStorage.setItem('user', JSON.stringify(userStorage));
  const wrapper = mount(<Form work={workEmpty} onSubmit={handleOnSubmit} />);

  await global.wait(0);

  const inputName = wrapper.find('input[name="name"]');
  inputName.simulate('change', {
    target: { value: 'Test work', name: 'name' }
  });

  const selectStatus = wrapper.find('select[name="status"]');
  selectStatus.simulate('change', {
    target: { value: 1, name: 'status' }
  });

  wrapper.find('input[name="adult"]').simulate('click');

  // Select language
  wrapper.find('button[id="add_language"]').simulate('click');
  await global.wait(0);
  wrapper
    .find('DropdownItem')
    .first()
    .simulate('click');

  const textareaEnglish = wrapper.find('textarea[name="desc-0-1"]');
  textareaEnglish.simulate('change', {
    target: { value: 'Nice manga!', name: 'desc-0-1' }
  });

  wrapper.find('button[id="submit_work"]').simulate('click');
  expect(wrapper).toBeTruthy();
  await wrapper.unmount();
});

it('should throw an error is user is not authenticated', () => {
  console.error = jest.fn();
  const wrapper = mount(<Form work={workEmpty} onSubmit={handleOnSubmit} />);

  expect(() => {
    wrapper.find('button[id="submit_work"]').simulate('click');
  }).toThrowError('User not authenticated');
  wrapper.unmount();
});

it('should allow to upload an image', async () => {
  localStorage.setItem('user', JSON.stringify(userStorage));
  const image = {
    name: 'plot.jpg',
    size: 1000,
    type: 'image/jpeg'
  };

  const { queryByTestId } = render(
    <Form
      work={{ ...workEmpty, uniqid: 'test-work' }}
      onSubmit={handleOnSubmit}
    />
  );

  expect(queryByTestId('work_thumbnail')).toBeNull();

  const fileContents = image;
  const file = new Blob([fileContents], { type: 'text/plain' });

  Object.defineProperty(queryByTestId('uploadCover'), 'files', {
    value: [file]
  });

  fireEvent.change(queryByTestId('uploadCover'));

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

  expect(queryByTestId('work_thumbnail').getAttribute('src')).toBe(
    'http://localhost:8000/works/test-work/plot_updated.jpg'
  );
});

it('should fill the form with the work given', async () => {
  localStorage.setItem('user', JSON.stringify(userStorage));
  const wrapper = mount(<Form work={work} onSubmit={handleOnSubmit} />);

  const inputTitle = wrapper.find('input[name="name"]');
  expect(inputTitle.props().value).toBe(work.name);

  wrapper.unmount();
});

it('should normalize object before submit', async () => {
  let _work = {};
  const cHandleOnSubmit = (e, work) => {
    _work = work;
  };
  localStorage.setItem('user', JSON.stringify(userStorage));
  const wrapper = mount(<Form work={workEmpty} onSubmit={cHandleOnSubmit} />);

  wrapper.find('button[id="submit_work"]').simulate('click');

  await global.wait(0);
  expect(_work.type).toBe('Manga');
  expect(_work.status).toBe(1);
  expect(_work.demographicId).toBe(1);

  wrapper.unmount();
});
