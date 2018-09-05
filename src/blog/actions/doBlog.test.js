import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from '@anilanar/moxios';
import { fetchPosts } from './doBlog';
import { getPosts } from '../../utils/mocks/getBlogMock';
import { normalizePost } from '../../utils/normalizeBlog';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetchPosts actions', () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  it('creates BLOG_IS_LOADING and BLOG_FETCH_DATA_SUCCESS after successfuly fetching work', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        statusText: 'OK',
        response: { data: { posts: getPosts() } }
      });
    });

    const expectedActions = [
      { type: 'BLOG_IS_LOADING', isLoading: true },
      {
        type: 'BLOG_FETCH_DATA_SUCCESS',
        posts: getPosts().map(p => normalizePost(p)),
        page: 1
      },
      { type: 'BLOG_IS_LOADING', isLoading: false }
    ];

    const store = mockStore({
      blog: {
        post: null,
        posts: [],
        blogHasErrored: false,
        blogIsLoading: false,
        blogPage: 1
      }
    });

    return store.dispatch(fetchPosts('es', 1, 'DESC', 10)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates BLOG_HAS_ERRORED after catch any error', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        statusText: 'ERROR',
        response: { data: { posts: null } }
      });
    });

    const expectedActions = [
      { type: 'BLOG_IS_LOADING', isLoading: true },
      { type: 'BLOG_HAS_ERRORED', hasErrored: true }
    ];

    const store = mockStore({
      blog: {
        post: null,
        posts: [],
        blogHasErrored: false,
        blogIsLoading: false,
        blogPage: 1
      }
    });

    return store.dispatch(fetchPosts('es', 1, 'DESC', 20)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('throw an Error if lang is undefined', () => {
    expect(() => {
      const store = mockStore({
        releases: {}
      });
      store.dispatch(fetchPosts());
    }).toThrow();
  });
});
