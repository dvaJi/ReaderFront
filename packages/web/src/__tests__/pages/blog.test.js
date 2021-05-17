import React from 'react';
import { actions } from 'utils/enzyme-actions';
import { mountWithIntl } from 'utils/enzyme-intl';
import { MockedProvider } from '@apollo/client/testing';

import BlogContainer, { FETCH_ALL_POSTS_WITH_AGG } from '@pages/blog';

const posts = global.rfMocks.posts.getPosts;

const mocks = [
  {
    request: {
      query: FETCH_ALL_POSTS_WITH_AGG,
      variables: { first: 9, offset: 0, language: 1 }
    },
    result: {
      data: {
        posts: posts,
        postsAggregates: {
          count: 40
        }
      }
    }
  }
];

it('should render without throwing an error', async () => {
  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BlogContainer />
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    await global.wait(0);
    expect(wrapper).toBeTruthy();
    wrapper.unmount();
  });
});

it('should render new items if user scroll to bottom', async () => {
  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BlogContainer />
    </MockedProvider>
  );

  await global.wait(0);

  document.body.scrollTop = 140;
  window.dispatchEvent(new window.UIEvent('scroll', { detail: 0 }));

  await actions(wrapper, async () => {
    await global.wait(0);
    wrapper.update();
    expect(wrapper).toBeTruthy();
    wrapper.unmount();
  });
});
