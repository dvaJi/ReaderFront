import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';

import WorksContainer from './WorksContainer';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { FETCH_WORKS } from './query';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const works = global.rfMocks.work.works;

const mocks = [
  {
    request: {
      query: FETCH_WORKS,
      variables: { language: 1 }
    },
    result: {
      data: {
        works: works
      }
    }
  }
];

it('should render without throwing an error', async () => {
  const store = mockStore({
    layout: {
      language: 'es'
    }
  });
  const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Provider store={store}>
        <MemoryRouter>
          <WorksContainer />
        </MemoryRouter>
      </Provider>
    </MockedProvider>
  );

  await global.wait(0);

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should filter works', async () => {
  const store = mockStore({
    layout: {
      language: 'es'
    }
  });
  const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Provider store={store}>
        <MemoryRouter>
          <WorksContainer />
        </MemoryRouter>
      </Provider>
    </MockedProvider>
  );

  await global.wait(0);

  const input = wrapper.find('input[name="work-search"]');
  input.instance().value = 'a';
  input.simulate('change');
  wrapper.unmount();
});
