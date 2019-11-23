import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { mountWithIntl } from 'utils/enzyme-intl';
import { actions } from 'utils/enzyme-actions';
import { MockedProvider } from '@apollo/react-testing';

import BlogContainer from './BlogContainer';
import { FETCH_ALL_POSTS_WITH_AGG, FIND_BY_STUB } from './queries';

const posts = global.rfMocks.posts.getPosts;

const mocks = [
  {
    request: {
      query: FETCH_ALL_POSTS_WITH_AGG,
      variables: { first: 9, offset: 0, language: 2 }
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
      <MemoryRouter>
        <BlogContainer />
      </MemoryRouter>
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
      <MemoryRouter>
        <BlogContainer />
      </MemoryRouter>
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    await global.wait(0);

    document.body.scrollTop = 140;
    window.dispatchEvent(new window.UIEvent('scroll', { detail: 0 }));

    await global.wait(0);

    await wrapper.update();
    expect(wrapper).toBeTruthy();
    wrapper.unmount();
  });
});

it('should select a post and render it', async () => {
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
  const wrapper = mountWithIntl(
    <MockedProvider mocks={[...mocks, ...mocksStub]} addTypename={false}>
      <MemoryRouter>
        <BlogContainer />
      </MemoryRouter>
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    await global.wait(0);

    const postCard = wrapper.find('#post_card_2').first();
    postCard.simulate('click');

    await global.wait(0);

    expect(wrapper.find('#post_view_2')).toBeTruthy();
  });
});

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

  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocksStub} addTypename={false}>
      <MemoryRouter initialEntries={['blog/lorem-ipsum']}>
        <Route path="blog/:stub">
          <BlogContainer />
        </Route>
      </MemoryRouter>
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    wrapper.update();

    const postTitle = wrapper.find('#post_title');
    expect(postTitle.text()).toBe('Lorem Ipsum 1');

    wrapper.unmount();
  });
});
