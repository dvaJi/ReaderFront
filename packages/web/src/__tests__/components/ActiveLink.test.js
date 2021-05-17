import React from 'react';
import { mount } from 'enzyme';

it('renders without crashing', async () => {
  jest.doMock('next/router', () => ({
    withRouter: component => {
      component.defaultProps = {
        ...component.defaultProps,
        router: {
          pathname: '/something'
        }
      };

      return component;
    }
  }));

  const { default: ActiveLink } = await import('@components/ActiveLink');

  const wrapper = mount(
    <ActiveLink href={'/lol'} activeClassName="active">
      <a>UwU</a>
    </ActiveLink>
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('adds "active" classname', async () => {
  const { default: ActiveLink } = await import('@components/ActiveLink');

  const wrapper = mount(
    <ActiveLink href={'/something'} activeClassName="active">
      <a>UwU</a>
    </ActiveLink>
  );
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
