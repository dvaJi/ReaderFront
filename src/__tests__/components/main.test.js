import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';

import { GlobalStateProvider } from 'lib/state';
import App from '@components/main';

jest.mock('@components/layout/RouteNavItem', () => ({ children }) => (
  <a>{children}</a>
));

it('renders without crashing', () => {
  const wrapper = mountWithIntl(
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
  );
  expect(wrapper).toBeTruthy();
});
