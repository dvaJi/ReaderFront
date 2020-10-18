import React from 'react';
import { Form } from 'reactstrap';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';

import { mountWithIntl } from 'utils/enzyme-intl';
import { actions } from 'utils/enzyme-actions';
import SignupContainer, { SIGNUP } from './SignupContainer';

it('should render without throwing an error', async () => {
  const wrapper = mountWithIntl(
    <MockedProvider mocks={[]} addTypename={false}>
      <MemoryRouter initialEntries={['/auth/signup']}>
        <Route path="/auth/signup">
          <SignupContainer />
        </Route>
      </MemoryRouter>
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    expect(wrapper).toBeTruthy();
    wrapper.unmount();
  });
});

it('should render without throwing an error', async () => {
  const mocks = [
    {
      request: {
        query: SIGNUP,
        variables: {
          name: 'user01',
          email: 'test@example.com',
          password: '123456'
        }
      },
      result: {
        data: {
          userSignup: {
            token: 'f4k3T0k3N',
            user: {
              name: 'user01',
              email: 'test@example.com',
              role: 'user'
            }
          }
        }
      }
    }
  ];

  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={['/auth/signup']}>
        <Route path="/auth/signup">
          <SignupContainer />
        </Route>
      </MemoryRouter>
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    const form = wrapper.find(Form);
    const inputUsername = form.find('input[name="name"]');
    inputUsername.simulate('change', { target: { value: 'user01' } });

    const inputEmail = form.find('input[name="email"]');
    inputEmail.simulate('change', { target: { value: 'test@example.com' } });

    const inputPasword = form.find('input[name="password"]');
    inputPasword.simulate('change', { target: { value: '123456' } });

    form.simulate('submit');

    expect(wrapper.find('#signup_success_alert')).toBeDefined();
    wrapper.unmount();
  });
});

it('should render an error', async () => {
  const wrapper = mountWithIntl(
    <MockedProvider mocks={[]} addTypename={false}>
      <MemoryRouter initialEntries={['/auth/signup']}>
        <Route path="/auth/signup">
          <SignupContainer />
        </Route>
      </MemoryRouter>
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    const form = wrapper.find(Form);
    const inputUsername = form.find('input[name="name"]');
    inputUsername.simulate('change', { target: { value: 'user01' } });

    const inputEmail = form.find('input[name="email"]');
    inputEmail.simulate('change', { target: { value: 'test@example.com' } });

    const inputPasword = form.find('input[name="password"]');
    inputPasword.simulate('change', { target: { value: '123456' } });

    form.simulate('submit');

    expect(wrapper.find('#signup_error_alert')).toBeDefined();

    wrapper.unmount();
  });
});
