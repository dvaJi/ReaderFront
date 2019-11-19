import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';

// App imports
import EditWork from './EditWork';
import { UPDATE_WORK } from '../mutation';
import { FETCH_WORK } from '../query';

const work = global.rfMocks.work.work;
const mocks = [
  {
    request: {
      query: FETCH_WORK,
      variables: { stub: 'infection', language: -1 }
    },
    result: {
      data: {
        postByStub: work
      }
    }
  },
  {
    request: {
      query: UPDATE_WORK,
      variables: work
    },
    result: {
      data: {
        createPost: { id: 1 }
      }
    }
  }
];

it('should render without throwing an error', async () => {
  const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <EditWork />
      </MemoryRouter>
    </MockedProvider>
  );

  await global.wait(0);
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
