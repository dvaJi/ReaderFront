import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from '@anilanar/moxios';
import { fetchReleases } from './doReleases';
import { getReleases } from '../../utils/mocks/getReleasesMock';

const releases = getReleases();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetchReleases actions', () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  it('creates RELEASES_IS_LOADING and RELEASES_FETCH_DATA_SUCCESS after successfuly fetching work', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        statusText: 'OK',
        response: { data: { chapters: releases } }
      });
    });

    const expectedActions = [
      { type: 'RELEASES_IS_LOADING', isLoading: true },
      { type: 'RELEASES_FETCH_DATA_SUCCESS', chapters: releases, page: 1 },
      { type: 'RELEASES_IS_LOADING', isLoading: false }
    ];

    const store = mockStore({
      releases: {
        chapters: [],
        releasesHasErrored: false,
        releasesIsLoading: false,
        releasesPage: 0
      }
    });

    return store
      .dispatch(fetchReleases('es', 1, 20, 'DESC'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates RELEASES_HAS_ERRORED after catch any error', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        statusText: 'ERROR',
        response: { data: { chapters: null } }
      });
    });

    const expectedActions = [
      { type: 'RELEASES_IS_LOADING', isLoading: true },
      { type: 'RELEASES_HAS_ERRORED', hasErrored: true }
    ];

    const store = mockStore({
      works: {
        chapters: [],
        releasesHasErrored: false,
        releasesIsLoading: false,
        releasesPage: 0
      }
    });

    return store.dispatch(fetchReleases('es', 1, 20, 'DESC')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('throw an Error if stub or lang are undefined', () => {
    expect(() => {
      const store = mockStore({
        releases: {}
      });
      store.dispatch(fetchReleases());
    }).toThrow();

    expect(() => {
      const store = mockStore({
        releases: {}
      });
      store.dispatch(fetchReleases('es'));
    }).toThrow();
  });
});
