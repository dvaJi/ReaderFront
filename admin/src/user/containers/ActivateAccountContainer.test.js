import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { actions } from 'utils/enzyme-actions';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';

import ActivateAccountContainer, { ACTIVATE } from './ActivateAccountContainer';

it('should render without throwing an error', async () => {
  const wrapper = mountWithIntl(
    <MockedProvider mocks={[]} addTypename={false}>
      <MemoryRouter
        initialEntries={[
          '/auth/activate_account?email=test@aa.com&token=t0k3n'
        ]}
      >
        <Route path="/auth/activate_account?email=test@aa.com&token=t0k3n">
          <ActivateAccountContainer />
        </Route>
      </MemoryRouter>
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    expect(wrapper).toBeTruthy();
    wrapper.unmount();
  });
});

it('should show a success message if account is activated', async () => {
  const mocks = [
    {
      request: {
        query: ACTIVATE,
        variables: { email: 'test@aa.com', activatedToken: 't0k3n' }
      },
      result: {
        data: {
          userActivate: {
            email: 'test@aa.com',
            activatedToken: 't0k3n'
          }
        }
      }
    }
  ];
  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter
        initialEntries={[
          '/auth/activate_account?email=test@aa.com&token=t0k3n'
        ]}
      >
        <Route path="/auth/activate_account?email=test@aa.com&token=t0k3n">
          <ActivateAccountContainer />
        </Route>
      </MemoryRouter>
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    wrapper.update();
    expect(wrapper.find('#activate-account_success')).toBeDefined();
    wrapper.unmount();
  });
});

it('should show an error message if account can not be activated', async () => {
  const mocks = [
    {
      request: {
        query: ACTIVATE,
        variables: { email: 'test@aa.com', activatedToken: 't0k3n' }
      },
      result: {
        data: {
          errors: [{ message: ':<' }]
        }
      }
    }
  ];
  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter
        initialEntries={[
          '/auth/activate_account?email=test@aa.com&token=t0k3n'
        ]}
      >
        <Route path="/auth/activate_account?email=test@aa.com&token=t0k3n">
          <ActivateAccountContainer />
        </Route>
      </MemoryRouter>
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    expect(wrapper.find('#activate-account_error_alert')).toBeDefined();
    wrapper.unmount();
  });
});
