import React from 'react';
import { shallow } from 'enzyme';

import { GlobalStateProvider } from 'state';
import App from './App';

it('renders without crashing', () => {
  const wrapper = shallow(
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
  );
  expect(wrapper).toBeTruthy();
});
