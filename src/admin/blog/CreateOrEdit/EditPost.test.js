import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';

// App imports
import EditPost from './EditPost';
import { UPDATE_POST } from '../mutations';
import { FIND_BY_STUB } from '../queries';

const post = global.rfMocks.posts.getPost;
const mocks = [
  {
    request: {
      query: FIND_BY_STUB,
      variables: { stub: 'lel' }
    },
    result: {
      data: {
        postByStub: post
      }
    }
  },
  {
    request: {
      query: UPDATE_POST,
      variables: { ...post }
    },
    result: {
      data: {
        createPost: { id: 1 }
      }
    }
  }
];

it('should render without throwing an error', async () => {
  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <EditPost />
      </MemoryRouter>
    </MockedProvider>
  );

  await global.wait(0);
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

// TODO: Cover onSubmit  event
