import React from 'react';
import { mount } from 'enzyme';
import { mountWithIntl } from 'enzyme-react-intl';
import { Provider } from 'react-redux';
import ReleasesContainer from './ReleasesContainer';
import App from '../../App';
import { doChangeLanguage } from '../../layout/actions/doChangeLanguage';
import { releasesIsLoading, fetchReleases } from '../actions/doReleases';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from '@anilanar/moxios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

beforeEach(function() {
  moxios.install();
});

afterEach(function() {
  moxios.uninstall();
});

// TODO: Improve this test with moxios

it('should render without throwing an error', () => {
  const store = mockStore({
    releases: {
      chapters: [],
      releasesPage: 0,
      releasesIsLoading: false,
      releasesHasErrored: false
    },
    layout: {
      language: 'es'
    }
  });
  const wrapper = mountWithIntl(
    <Provider store={store}>
      <ReleasesContainer />
    </Provider>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should render without throwing an error when it receive a new language props', () => {
  const store = mockStore({
    releases: {
      chapters: [],
      releasesPage: 0,
      releasesIsLoading: false,
      releasesHasErrored: false
    },
    layout: {
      language: 'es'
    }
  });
  const wrapper = mountWithIntl(
    <App>
      <Provider store={store}>
        <ReleasesContainer />
      </Provider>
    </App>
  );

  store.dispatch(doChangeLanguage('en'));
  wrapper.update();
  wrapper.unmount();
});

it('should render without throwing an error when it receive a new language props', () => {
  const store = mockStore({
    releases: {
      chapters: [],
      releasesPage: 0,
      releasesIsLoading: false,
      releasesHasErrored: false
    },
    layout: {
      language: 'es'
    }
  });
  const wrapper = mountWithIntl(
    <App>
      <Provider store={store}>
        <ReleasesContainer />
      </Provider>
    </App>
  );

  store.dispatch(releasesIsLoading(false));
  wrapper.update();

  document.body.scrollTop = 40;
  window.dispatchEvent(new window.UIEvent('scroll', { detail: 0 }));
  wrapper.update();
  wrapper.unmount();
});

it('should throw if it receive a null lang or page props', () => {
  expect(() => {
    store.dispatch(fetchReleases('es', null));
  }).toThrow();

  expect(() => {
    store.dispatch(fetchReleases(null, 1));
  }).toThrow();
});
