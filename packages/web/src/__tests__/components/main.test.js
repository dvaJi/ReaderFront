import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';

import App from '@components/main';

jest.mock('@components/layout/RouteNavItem', () => ({ children }) => (
  <a>{children}</a>
));

it('renders without crashing', () => {
  const wrapper = mountWithIntl(<App />);
  expect(wrapper).toBeTruthy();
});
