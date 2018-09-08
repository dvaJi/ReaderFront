import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from '@anilanar/moxios';
import App from '../../App';
import HomeContainer from './HomeContainer';
import { doChangeLanguage } from '../../layout/actions/doChangeLanguage';
import { releasesFetchDataSuccess } from '../../releases/actions/doReleases';
import { getReleases } from '../../utils/mocks/getReleasesMock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const releases = getReleases();

beforeEach(function() {
  moxios.install();
});

afterEach(function() {
  moxios.uninstall();
});

// TODO: Improve this test
it('should render without throwing an error', async () => {
  const store = mockStore({
    releases: {
      chapters: releases,
      releasesPage: 0,
      releasesIsLoading: false,
      releasesHasErrored: false
    },
    work: {
      randomWork: null,
      workRandomIsLoading: false
    },
    works: {
      latestWorks: [],
      latestWorksIsLoading: false
    },
    layout: {
      language: 'es'
    }
  });

  const wrapper = mount(
    <App>
      <Provider store={store}>
        <HomeContainer />
      </Provider>
    </App>
  );
  expect(wrapper).toBeTruthy();
  await wrapper.unmount();
});

it('should render without throwing an error when it receive a new language props', async () => {
  const store = mockStore({
    releases: {
      chapters: releases,
      releasesPage: 0,
      releasesIsLoading: false,
      releasesHasErrored: false
    },
    work: {
      randomWork: null,
      workRandomIsLoading: false
    },
    works: {
      latestWorks: [],
      latestWorksIsLoading: false
    },
    layout: {
      language: 'es'
    }
  });

  const wrapper = mount(
    <App>
      <Provider store={store}>
        <HomeContainer />
      </Provider>
    </App>
  );

  store.dispatch(releasesFetchDataSuccess(releases));
  store.dispatch(doChangeLanguage('es'));
  await wrapper.update();

  store.dispatch(releasesFetchDataSuccess(releases));
  store.dispatch(doChangeLanguage('en'));
  await wrapper.update();

  await wrapper.unmount();
});
