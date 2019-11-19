import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';

// App imports
import CreateWork from './CreateWork';
import { CREATE_WORK } from '../mutation';

const work = global.rfMocks.work.work;
const mocks = [
  {
    request: {
      query: CREATE_WORK,
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
        <CreateWork />
      </MemoryRouter>
    </MockedProvider>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
