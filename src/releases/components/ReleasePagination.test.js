import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';
import ReleasePagination from './ReleasePagination';

const onChange = jest.fn();

it('renders without crashing', () => {
  mountWithIntl(<ReleasePagination page={1} onPageChange={onChange} />);
});

it('should disable the previous button if the page is 0', () => {
  const wrapper = mountWithIntl(
    <ReleasePagination page={0} onPageChange={onChange} />
  );

  const prevButton = wrapper.find('button#prev_page');
  expect(prevButton.props()['disabled']).toBe(true);
});

it('should increment page value', async () => {
  let page = 0;
  const changePage = newPage => {
    page = newPage;
  };
  const wrapper = mountWithIntl(
    <ReleasePagination page={page} onPageChange={changePage} />
  );

  const nextButton = await wrapper.find('button#next_page');
  await nextButton.simulate('click');
  expect(page).toBe(1);
});

it('should decrement page value', async () => {
  let page = 2;
  const changePage = newPage => {
    page = newPage;
  };
  const wrapper = mountWithIntl(
    <ReleasePagination page={page} onPageChange={changePage} />
  );

  const prevButton = await wrapper.find('button#prev_page');
  await prevButton.simulate('click');
  expect(page).toBe(1);
});
