import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import WorkContainer from './WorkContainer';
import ErrorBoundary from '../../utils/ErrorBoundary';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const work = global.rfMocks.work.workNormalized;
const chapters = global.rfMocks.releases.getReleases;

it('should render without throwing an error', () => {
  const store = mockStore({
    work: {
      work: null,
      workIsLoading: false,
      workHasErrored: false
    },
    params: { match: { params: {} } },
    layout: {
      language: 'es'
    }
  });
  const wrapper = mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <ErrorBoundary>
          <WorkContainer match={'infection'} />
        </ErrorBoundary>
      </MemoryRouter>
    </Provider>
  );

  expect(wrapper).toBeTruthy();
});

it('should render without throwing an error', () => {
  const store = mockStore({
    work: {
      work: { ...work, chapters: chapters },
      workIsLoading: false,
      workHasErrored: false
    },
    params: { match: { params: {} } },
    layout: {
      language: 'es'
    }
  });
  const wrapper = mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <ErrorBoundary>
          <WorkContainer match={'infection'} />
        </ErrorBoundary>
      </MemoryRouter>
    </Provider>
  );

  expect(wrapper).toBeTruthy();
});
