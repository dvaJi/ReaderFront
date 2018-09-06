import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from '@anilanar/moxios';
import { fetchChapters } from './doReader';
import { getReleases } from '../../utils/mocks/getReleasesMock';

const releases = getReleases();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetchChapters actions', () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  it('creates READER_IS_LOADING and READER_FETCH_DATA_SUCCESS after successfuly fetching work', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        statusText: 'OK',
        response: { data: { chaptersByWork: releases } }
      });
    });

    const expectedActions = [
      { type: 'READER_IS_LOADING', isLoading: true },
      { type: 'READER_FETCH_DATA_SUCCESS', chapters: releases },
      { type: 'READER_IS_LOADING', isLoading: false }
    ];

    const store = mockStore({
      reader: {
        chapters: [],
        chapter: null,
        readerHasErrored: false,
        readerIsLoading: false
      }
    });

    return store
      .dispatch(fetchChapters('es', 'hunter_x_hunter'))
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
      { type: 'READER_IS_LOADING', isLoading: true },
      { type: 'READER_HAS_ERRORED', hasErrored: true }
    ];

    const store = mockStore({
      reader: {
        chapters: [],
        chapter: null,
        readerHasErrored: false,
        readerIsLoading: false
      }
    });

    return store.dispatch(fetchChapters('es', 'hunter_x_hunter')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('throw an Error if stub or lang are undefined', () => {
    expect(() => {
      const store = mockStore({
        releases: {}
      });
      store.dispatch(fetchChapters());
    }).toThrow();

    expect(() => {
      const store = mockStore({
        releases: {}
      });
      store.dispatch(fetchChapters('es'));
    }).toThrow();
  });
});
