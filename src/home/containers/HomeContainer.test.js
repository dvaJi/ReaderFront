import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import HomeContainer from './HomeContainer';
import App from '../../App';
import store from '../../store';
import { setLanguage } from 'redux-i18n';
import { releasesFetchDataSuccess } from '../../releases/actions/doReleases';
import { getReleases } from '../../utils/mocks/getReleasesMock';

const releases = getReleases();

it('should render without throwing an error', async () => {
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
  const wrapper = mount(
    <App>
      <Provider store={store}>
        <HomeContainer />
      </Provider>
    </App>
  );
  store.dispatch(releasesFetchDataSuccess(releases));
  store.dispatch(setLanguage('es'));
  wrapper.update();
  store.dispatch(releasesFetchDataSuccess(releases));
  store.dispatch(setLanguage('en'));
  wrapper.update();
  wrapper.unmount();
});
