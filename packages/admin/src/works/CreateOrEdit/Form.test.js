import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';

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
  workEmpty = {
    id: 0,
    name: '',
    stub: '',
    type: 'Manga',
    hidden: false,
    demographicId: 1,
    status: 1,
    statusReason: '',
    adult: false,
    visits: 0,
    thumbnail: '',
    language: 1,
    description: '',
    works_genres: [],
    people_works: []
  };
});

afterEach(() => {
  localStorage.clear();
  console.error = global.originalError;
});

it('renders without crashing', () => {
  const wrapper = mountWithIntl(
    <Form work={workEmpty} onSubmit={handleOnSubmit} />
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should fill the form without throwing an error', async () => {
  localStorage.setItem('user', JSON.stringify(userStorage));
  const wrapper = mountWithIntl(
    <Form work={workEmpty} onSubmit={handleOnSubmit} />
  );

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

  const selectLanguage = wrapper.find('select[name="language"]');
  selectLanguage.simulate('change', {
    target: { value: 1, name: 'language' }
  });

  const textareaEnglish = wrapper.find('textarea[name="description"]');
  textareaEnglish.simulate('change', {
    target: { value: 'Nice manga!', name: 'description' }
  });

  wrapper.find('button[id="submit_work"]').simulate('click');
  expect(wrapper).toBeTruthy();
  await wrapper.unmount();
});

it('should throw an error is user is not authenticated', () => {
  console.error = jest.fn();
  const wrapper = mountWithIntl(
    <Form work={workEmpty} onSubmit={handleOnSubmit} />
  );

  expect(() => {
    wrapper.find('button[id="submit_work"]').simulate('click');
  }).toThrowError('User not authenticated');
  wrapper.unmount();
});

it('should fill the form with the work given', async () => {
  localStorage.setItem('user', JSON.stringify(userStorage));
  const wrapper = mountWithIntl(<Form work={work} onSubmit={handleOnSubmit} />);

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
  const wrapper = mountWithIntl(
    <Form work={workEmpty} onSubmit={cHandleOnSubmit} />
  );

  const inputName = wrapper.find('input[name="name"]');
  inputName.simulate('change', {
    target: { value: 'Test work', name: 'name' }
  });

  wrapper.find('button[id="submit_work"]').simulate('click');

  await global.wait(0);
  expect(_work.type).toBe('Manga');
  expect(_work.status).toBe(1);
  expect(_work.demographicId).toBe(1);

  wrapper.unmount();
});
