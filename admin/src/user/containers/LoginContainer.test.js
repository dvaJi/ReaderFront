import React from 'react';
import { Form } from 'reactstrap';
import { mountWithIntl } from 'utils/enzyme-intl';
import { actions } from 'utils/enzyme-actions';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter, Route } from 'react-router-dom';

import LoginContainer, { LOGIN } from './LoginContainer';
import { GlobalStateProvider } from 'state';

it('should render without throwing an error', async () => {
  const wrapper = mountWithIntl(
    <GlobalStateProvider>
      <MockedProvider mocks={[]} addTypename={false}>
        <MemoryRouter>
          <LoginContainer />
        </MemoryRouter>
      </MockedProvider>
    </GlobalStateProvider>
  );

  await actions(wrapper, async () => {
    expect(wrapper).toBeTruthy();
    wrapper.unmount();
  });
});

it('should login without throwing an error', async () => {
  const mocks = [
    {
      request: {
        query: LOGIN,
        variables: { email: 'iam@god.com', password: 'h4ck3rm4n' }
      },
      result: {
        data: {
          userLogin: {
            token: 'f4k3T0k3N',
            user: {
              name: 'Admin',
              email: 'iam@god.com',
              role: 'admin'
            }
          }
        }
      }
    }
  ];

  const wrapper = mountWithIntl(
    <GlobalStateProvider>
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/auth/login']}>
          <Route path="/auth/login">
            <LoginContainer
              router={{ location: { pathname: 'AS' } }}
              user={{ isLoading: false, error: null }}
            />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    </GlobalStateProvider>
  );

  await actions(wrapper, async () => {
    const form = wrapper.find(Form);
    const inputEmail = form.find('input[name="email"]');
    inputEmail.simulate('change', { target: { value: 'test@example.com' } });
    const inputPasword = form.find('input[name="password"]');
    inputPasword.simulate('change', { target: { value: '123456' } });

    form.simulate('submit');

    wrapper.update();

    expect(wrapper.find('error_alert').exists()).toBe(false);

    wrapper.unmount();
  });
});

it('should render an error if login not match', async () => {
  const mocks = [
    {
      request: {
        query: LOGIN,
        variables: { email: 'iam@god.com', password: 'h4ck3rm4n2' }
      },
      result: {
        data: {
          errors: [{ message: 'Invalid Credentials' }]
        }
      }
    }
  ];

  const wrapper = mountWithIntl(
    <GlobalStateProvider>
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <LoginContainer
            router={{ location: { pathname: 'AS' } }}
            user={{ isLoading: false, error: null }}
          />
        </MemoryRouter>
      </MockedProvider>
    </GlobalStateProvider>
  );

  await actions(wrapper, async () => {
    const form = wrapper.find(Form);
    const inputEmail = form.find('input[name="email"]');
    inputEmail.simulate('change', { target: { value: 'iam@god.com' } });
    const inputPasword = form.find('input[name="password"]');
    inputPasword.simulate('change', { target: { value: 'h4ck3rm4n' } });

    form.simulate('submit');

    wrapper.update();

    expect(wrapper.find('error_alert')).toBeTruthy();

    wrapper.unmount();
  });
});
