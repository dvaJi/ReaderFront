import React from 'react';
import { mountWithIntl, shallowWithIntl } from 'enzyme-react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import ReleasesContainer from './ReleasesContainer';
import { doChangeLanguage } from '../../layout/actions/doChangeLanguage';
import { releasesIsLoading } from '../actions/doReleases';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from '@anilanar/moxios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const releases = global.rfMocks.releases.getReleases;

beforeEach(function() {
  moxios.install();
  global.window.resizeTo(1024);
});

afterEach(function() {
  moxios.uninstall();
});

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
    <Provider store={store}>
      <MemoryRouter>
        <ReleasesContainer />
      </MemoryRouter>
    </Provider>
  );

  store.dispatch(doChangeLanguage('en'));
  wrapper.update();
  wrapper.unmount();
});

it('should render new items if user scroll to bottom', () => {
  const store = mockStore({
    releases: {
      chapters: releases,
      releasesPage: 1,
      releasesIsLoading: false,
      releasesHasErrored: false
    },
    layout: {
      language: 'es'
    }
  });
  const wrapper = mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <ReleasesContainer />
      </MemoryRouter>
    </Provider>
  );

  store.dispatch(releasesIsLoading(false));
  wrapper.update();

  document.body.scrollTop = 40;
  window.dispatchEvent(new window.UIEvent('scroll', { detail: 0 }));

  wrapper.update();
  wrapper.unmount();
});
