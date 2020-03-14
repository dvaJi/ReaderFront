import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import * as nextRouter from 'next/router';

import Header from '@components/layout/header';

jest.mock('@components/layout/RouteNavItem', () => ({ children }) => (
  <a>{children}</a>
));

it('should render Public Nav without throwing an error', () => {
  const wrapper = mountWithIntl(<Header />);

  expect(wrapper.find('nav')).toBeTruthy();
  expect(wrapper.find('nav').prop('style').display).toBe('flex');
  wrapper.unmount();
});

it('should render Admin Nav without throwing an error', () => {
  nextRouter.withRouter = jest.fn();
  nextRouter.withRouter.mockImplementation(() => () => Component => props => (
    <Component {...props} router={{ pathname: '/admincp/dashboard' }} />
  ));
  nextRouter.useRouter = jest.fn();
  nextRouter.useRouter.mockImplementation(() => ({
    route: '/admincp/dashboard',
    query: {},
    pathname: '/admincp/dashboard'
  }));

  const wrapper = mountWithIntl(<Header />);

  expect(wrapper.find('nav')).toBeTruthy();
  wrapper.unmount();
});

it('should hidden if the path is /read without throwing an error', () => {
  nextRouter.useRouter = jest.fn();
  nextRouter.useRouter.mockImplementation(() => ({
    route: '/read/grateful_dead/es/1/3.0',
    pathname: '/read/grateful_dead/es/1/3.0',
    query: {
      slug: 'grateful_dead',
      lang: 'es',
      volume: '2',
      chapter: '3.0'
    }
  }));
  const wrapper = mountWithIntl(<Header />);

  expect(wrapper.find('nav')).toBeTruthy();
  expect(wrapper.find('nav').prop('style').display).toBe('none');
  wrapper.unmount();
});
