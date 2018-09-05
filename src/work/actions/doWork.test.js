import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from '@anilanar/moxios';
import { fetchWork, fetchRandomWork } from './doWork';
import { getWork } from '../../utils/mocks/getWorksMock';
import { normalizeWork } from '../../utils/normalizeWork';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const work = getWork;

describe('fetchWork actions', () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  it('creates WORK_IS_LOADING and WORK_FETCH_DATA_SUCCESS after successfuly fetching work', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        statusText: 'OK',
        response: { data: { work: work } }
      });
    });

    const expectedActions = [
      { type: 'WORK_IS_LOADING', isLoading: true },
      { type: 'WORK_FETCH_DATA_SUCCESS', work: normalizeWork(work) },
      { type: 'WORK_IS_LOADING', isLoading: false }
    ];

    const store = mockStore({
      work: {
        work: null,
        randomWork: null,
        workHasErrored: false,
        workIsLoading: false,
        workRandomIsLoading: false
      }
    });

    return store
      .dispatch(fetchWork('aka_akatoshitachi_no_monogatari', 'es'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates WORK_HAS_ERRORED after catch any error', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        statusText: 'ERROR',
        response: { data: { work: null } }
      });
    });

    const expectedActions = [
      { type: 'WORK_IS_LOADING', isLoading: true },
      { type: 'WORK_HAS_ERRORED', hasErrored: true }
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

    return store.dispatch(fetchWork('boku_no_piko', 'es')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('fetchRandomWork actions', () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  it('creates WORK_RANDOM_IS_LOADING and RANDOM_WORK_FETCH_DATA_SUCCESS after successfuly fetching work', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        statusText: 'OK',
        response: { data: { workRandom: work } }
      });
    });

    const expectedActions = [
      { type: 'WORK_RANDOM_IS_LOADING', isLoading: true },
      {
        type: 'RANDOM_WORK_FETCH_DATA_SUCCESS',
        work: normalizeWork(work)
      },
      { type: 'WORK_RANDOM_IS_LOADING', isLoading: false }
    ];

    const store = mockStore({
      work: {
        work: null,
        randomWork: null,
        workHasErrored: false,
        workIsLoading: false,
        workRandomIsLoading: false
      }
    });

    return store
      .dispatch(fetchRandomWork('es', 'aka_akatoshitachi_no_monogatari'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates WORK_HAS_ERRORED after catch any error', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        statusText: 'ERROR',
        response: { data: { workRandom: null } }
      });
    });

    const expectedActions = [
      { type: 'WORK_RANDOM_IS_LOADING', isLoading: true },
      { type: 'WORK_HAS_ERRORED', hasErrored: true }
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

    return store.dispatch(fetchRandomWork('es')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
