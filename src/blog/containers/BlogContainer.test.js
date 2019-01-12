import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mountWithIntl } from 'enzyme-react-intl';
import { Provider } from 'react-redux';
import { MockedProvider } from 'react-apollo/test-utils';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import waitForExpect from 'wait-for-expect';

import BlogContainer from './BlogContainer';
import { FETCH_ALL_POSTS_WITH_AGG, FIND_BY_STUB } from './queries';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
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
const routeProps = {
  match: { params: {} },
  location: {},
  history: {}
};

it('should render without throwing an error', async () => {
  const store = mockStore({
    layout: {
      language: 'es'
    }
  });
  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Provider store={store}>
        <MemoryRouter>
          <BlogContainer {...routeProps} />
        </MemoryRouter>
      </Provider>
    </MockedProvider>
  );
  await global.wait(0);
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should render new items if user scroll to bottom', async () => {
  const store = mockStore({
    layout: {
      language: 'es'
    }
  });
  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Provider store={store}>
        <MemoryRouter>
          <BlogContainer {...routeProps} />
        </MemoryRouter>
      </Provider>
    </MockedProvider>
  );

  await global.wait(0);

  document.body.scrollTop = 140;
  window.dispatchEvent(new window.UIEvent('scroll', { detail: 0 }));

  await global.wait(0);

  await wrapper.update();
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should select a post and render it', async () => {
  const store = mockStore({
    layout: {
      language: 'es'
    }
  });
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
      <Provider store={store}>
        <MemoryRouter>
          <BlogContainer {...routeProps} />
        </MemoryRouter>
      </Provider>
    </MockedProvider>
  );

  await global.wait(0);
  await wrapper.update();

  wrapper.update();
  const firstPost = wrapper.find('#post_card_2');
  firstPost.last().simulate('click');

  await global.wait(0);
  await wrapper.update();

  const BlogContainerWrapper = wrapper.find('BlogContainer');

  expect(BlogContainerWrapper.instance().state.postSelected).toEqual(posts[0]);

  wrapper.unmount();
});

it('should render the post selected', async () => {
  const store = mockStore({
    layout: {
      language: 'es'
    }
  });
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
  const routeProps = {
    match: { params: { stub: 'lorem-ipsum' } },
    location: {},
    history: {}
  };
  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocksStub} addTypename={false}>
      <Provider store={store}>
        <MemoryRouter>
          <BlogContainer {...routeProps} />
        </MemoryRouter>
      </Provider>
    </MockedProvider>
  );

  await waitForExpect(() => {
    wrapper.update();

    const postTitle = wrapper.find('#post_title');
    expect(postTitle.text()).toBe('Lorem Ipsum 1');
  });

  wrapper.unmount();
});
