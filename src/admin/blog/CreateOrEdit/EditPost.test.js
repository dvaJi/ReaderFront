import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { actions } from 'utils/enzyme-actions';
import { MemoryRouter, Route } from 'react-router-dom';
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
      variables: { stub: 'my-post' }
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
      <MemoryRouter initialEntries={['/admincp/blog/edit_post/my-post']}>
        <Route path="/admincp/blog/edit_post/:stub">
          <EditPost />
        </Route>
      </MemoryRouter>
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    await global.wait(0);
    expect(wrapper).toBeTruthy();
    wrapper.unmount();
  });
});

// TODO: Cover onSubmit  event
