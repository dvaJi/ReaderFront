import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';

// App imports
import CreatePost from './CreatePost';
import { CREATE_POST } from '../mutations';

const post = global.rfMocks.posts.getPost;
const mocks = [
  {
    request: {
      query: CREATE_POST,
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
        <CreatePost />
      </MemoryRouter>
    </MockedProvider>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

// TODO: Cover onSubmit  event
