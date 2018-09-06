import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from '@anilanar/moxios';
import { fetchWorks, worksFetchDataSuccess } from './doWorks';
import { getWorks } from '../../utils/mocks/getWorksMock';
import { normalizeWork } from '../../utils/normalizeWork';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const works = getWorks;
const worksNormalized = works.map(work => normalizeWork(work));

describe('fetchWorks actions', () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  it('creates WORKS_IS_LOADING and WORKS_FETCH_DATA_SUCCESS after successfuly fetching works', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        statusText: 'OK',
        response: { data: { works: works } }
      });
    });

    const expectedActions = [
      { type: 'WORKS_IS_LOADING', isLoading: true },
      {
        type: 'WORKS_FETCH_DATA_SUCCESS',
        works: worksNormalized
      },
      { type: 'WORKS_IS_LOADING', isLoading: false }
    ];

    const store = mockStore({
      works: {
        works: [],
        latestWorks: [],
        worksFilterText: '',
        worksHasErrored: false,
        worksIsLoading: false,
        latestWorksIsLoading: false
      }
    });

    return store
      .dispatch(fetchWorks('es', 'ASC', 120))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

describe('fetchWorks actions', () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  it('creates WORKS_IS_LOADING and WORKS_FETCH_DATA_SUCCESS after successfuly fetching works', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        statusText: 'OK',
        response: { data: { works: works } }
      });
    });

    const expectedActions = [
      { type: 'WORKS_IS_LOADING', isLoading: true },
      { type: 'WORKS_FETCH_DATA_SUCCESS', works: worksNormalized },
      { type: 'WORKS_IS_LOADING', isLoading: false }
    ];

    const store = mockStore({
      works: {
        works: [],
        latestWorks: [],
        worksFilterText: '',
        worksHasErrored: false,
        worksIsLoading: false,
        latestWorksIsLoading: false
      }
    });

    return store.dispatch(fetchWorks('es', 'ASC', 120)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates LATEST_WORKS_IS_LOADING and WORKS_CUSTOM_FETCH_DATA_SUCCESS after successfuly fetching works', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        statusText: 'OK',
        response: { data: { works: works } }
      });
    });

    const expectedActions = [
      { type: 'LATEST_WORKS_IS_LOADING', isLoading: true },
      { type: 'WORKS_CUSTOM_FETCH_DATA_SUCCESS', works: worksNormalized },
      { type: 'LATEST_WORKS_IS_LOADING', isLoading: false }
    ];

    const store = mockStore({
      works: {
        works: [],
        latestWorks: [],
        worksFilterText: '',
        worksHasErrored: false,
        worksIsLoading: false,
        latestWorksIsLoading: false
      }
    });

    return store.dispatch(fetchWorks('es', 'DESC', 120)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates WORKS_HAS_ERRORED after catch any error', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        statusText: 'ERROR',
        response: { data: { works: null } }
      });
    });

    const expectedActions = [
      { type: 'WORKS_IS_LOADING', isLoading: true },
      { type: 'WORKS_HAS_ERRORED', hasErrored: true }
    ];

    const store = mockStore({
      works: {
        works: [],
        latestWorks: [],
        worksFilterText: '',
        worksHasErrored: false,
        worksIsLoading: false,
        latestWorksIsLoading: false
      }
    });

    return store.dispatch(fetchWorks('es')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
