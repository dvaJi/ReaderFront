import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';

// App imports
import List from './List';
import { FETCH_ALL_POSTS_WITH_AGG } from '../queries';

const posts = global.rfMocks.posts.getPosts;
const mocks = [
  {
    request: {
      query: FETCH_ALL_POSTS_WITH_AGG,
      variables: { first: 20, offset: 0 }
    },
    result: {
      data: {
        posts: posts,
        postsAggregates: { count: 1 }
      }
    }
  }
];

afterEach(() => {
  console.error = global.originalError;
});

it('should show a list of post', async () => {
  const wrapper = await mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <List />
      </MemoryRouter>
    </MockedProvider>
  );

  await global.wait(0);
  expect(wrapper).toBeTruthy();
  await wrapper.unmount();
});

it('should show pagination and change page state', async () => {
  const mocksPagination = {
    request: {
      query: FETCH_ALL_POSTS_WITH_AGG,
      variables: { first: 20, offset: 0 }
    },
    result: {
      data: {
        posts: posts,
        postsAggregates: { count: 100 }
      }
    }
  };
  const wrapper = await mount(
    <MockedProvider mocks={[mocksPagination]} addTypename={false}>
      <MemoryRouter>
        <List />
      </MemoryRouter>
    </MockedProvider>
  );

  // TODO: Handle PaginationLink onClick event
  await wrapper.unmount();
});

it("should show an error message if it can't fetch data", async () => {
  console.error = jest.fn();
  const errorMock = {
    request: {
      query: FETCH_ALL_POSTS_WITH_AGG,
      variables: { first: 20, offset: 0 }
    },
    error: new Error('Nope')
  };
  const wrapper = await mount(
    <MockedProvider mocks={[errorMock]} addTypename={false}>
      <MemoryRouter>
        <List />
      </MemoryRouter>
    </MockedProvider>
  );

  await global.wait(0);
  expect(wrapper.text()).toContain('Error');
  await wrapper.unmount();
});
