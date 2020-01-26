import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import ReleasePagination from '@components/Releases/ReleasePagination';

const onChange = jest.fn();

it('renders without crashing', () => {
  const wrapper = mountWithIntl(
    <ReleasePagination page={1} onPageChange={onChange} />
  );
  expect(wrapper).toBeTruthy();

  wrapper.unmount();
});

it('should disable the previous button if the page is 0', () => {
  const wrapper = mountWithIntl(
    <ReleasePagination page={0} onPageChange={onChange} />
  );

  const prevButton = wrapper.find('button#prev_page');
  expect(prevButton.props()['disabled']).toBe(true);
  wrapper.unmount();
});

it('should increment page value', async () => {
  let page = 0;
  const changePage = newPage => {
    page = newPage;
  };
  const wrapper = mountWithIntl(
    <ReleasePagination page={page} onPageChange={changePage} />
  );

  const nextButton = wrapper.find('button#next_page');
  nextButton.simulate('click');
  expect(page).toBe(1);
  wrapper.unmount();
});

it('should decrement page value', async () => {
  let page = 2;
  const changePage = newPage => {
    page = newPage;
  };
  const wrapper = mountWithIntl(
    <ReleasePagination page={page} onPageChange={changePage} />
  );

  const prevButton = wrapper.find('button#prev_page');
  prevButton.simulate('click');
  expect(page).toBe(1);
  wrapper.unmount();
});
