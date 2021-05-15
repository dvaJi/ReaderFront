import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { actions } from 'utils/enzyme-actions';
import { MockedProvider } from '@apollo/client/testing';
import * as nextRouter from 'next/router';

import { BlogContainer, FIND_BY_STUB } from '@pages/blog/[slug]';

const posts = global.rfMocks.posts.getPosts;

it('should render the post selected', async () => {
  const mocksStub = [
    {
      request: {
        query: FIND_BY_STUB,
        variables: { stub: 'lorem-ipsum' }
      },
      result: {
        data: {
          postByStub: posts[0]
        }
      }
    }
  ];

  nextRouter.useRouter = jest.fn();
  nextRouter.useRouter.mockImplementation(() => ({
    route: 'blog/lorem-ipsum',
    query: {
      slug: 'lorem-ipsum'
    },
    prefetch: async () => undefined
  }));

  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocksStub} addTypename={false}>
      <BlogContainer />
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    wrapper.update();

    const postTitle = wrapper.find('#post_title');
    expect(postTitle.text()).toBe('Lorem Ipsum 1');

    wrapper.unmount();
  });
});

it('should render the post selected', async () => {
  const mocksStub = [
    {
      request: {
        query: FIND_BY_STUB,
        variables: { stub: 'lorem-ipsum' }
      },
      error: new Error('aw shucks')
    }
  ];

  nextRouter.useRouter = jest.fn();
  nextRouter.useRouter.mockImplementation(() => ({
    route: 'blog/lorem-ipsum',
    query: {
      slug: 'lorem-ipsum'
    },
    prefetch: async () => undefined
  }));

  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocksStub} addTypename={false}>
      <BlogContainer />
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    wrapper.update();

    const postTitle = wrapper.find('#error_blog');
    expect(postTitle.text()).toBe('Error :(');

    wrapper.unmount();
  });
});
