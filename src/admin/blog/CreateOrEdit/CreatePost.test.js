import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';

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
  const wrapper = mount(
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
