import React from 'react';
import { mountWithIntl, shallowWithIntl } from 'enzyme-react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import ReaderContainer from './ReaderContainer';
import store from '../../store';
import { doChangeLanguage } from '../../layout/actions/doChangeLanguage';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from '@anilanar/moxios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const releases = global.rfMocks.releases.getReleases;
const pages = global.rfMocks.releases.getPages;

it('should render without throwing an error', () => {
  const wrapper = shallowWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <ReaderContainer match={'infection'} />
      </MemoryRouter>
    </Provider>
  );

  expect(wrapper).toBeTruthy();
});

it('should render the pages of the chapter selected', () => {
  const store = mockStore({
    reader: {
      chapters: releases,
      chapter: { ...releases[0], pages: pages },
      readerIsLoading: false,
      readerHasErrored: false
    },
    layout: {
      language: 'es'
    },
    match: {
      params: {
        stub: 'manga'
      }
    }
  });
  const wrapper = mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <ReaderContainer />
      </MemoryRouter>
    </Provider>
  );

  wrapper.update();
  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
