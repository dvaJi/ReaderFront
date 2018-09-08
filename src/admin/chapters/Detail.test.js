import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { mountWithIntl } from 'enzyme-react-intl';
import moxios from '@anilanar/moxios';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import {
  getReleases,
  getPages,
  getPagesAsFiles,
  getPagesUploaded
} from '../../utils/mocks/getReleasesMock';
import ErrorBoundary from '../../utils/ErrorBoundary';
import Dropzone from 'react-dropzone';
import Detail from './Detail';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const chapter = getReleases(1)[0];
const pages = getPages();
const pagesUploaded = getPagesUploaded();
const pagesAsFile = getPagesAsFiles();
const params = {
  params: {
    chapterId: 1,
    workId: 0,
    stub: ''
  }
};

beforeEach(() => {
  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

it('should render the chapter with pages', async () => {
  const store = mockStore({
    reader: {
      chapter: {
        workId: 1,
        chapter: 0,
        subchapter: 0,
        volume: 0,
        language: 1,
        name: '',
        stub: '',
        hidden: false,
        notShowAtStart: false,
        description: '',
        thumbnail: '',
        pages: []
      }
    },
    match: params,
    i18nState: {
      lang: 'es',
      translations: {},
      forceRefresh: false
    },
    match: params
  });

  const wrapper = await mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <Detail store={store} match={params} />
      </MemoryRouter>
    </Provider>
  );

  let request = moxios.requests.mostRecent();
  await request.respondWith({
    status: 200,
    statusText: 'OK',
    response: {
      data: {
        chapterById: { ...chapter, pages: pages }
      }
    }
  });

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should render the chapter without pages', () => {
  const store = mockStore({
    reader: {
      chapter: { ...chapter, pages: [] }
    },
    i18nState: {
      lang: 'es',
      translations: {},
      forceRefresh: false
    },
    match: params
  });

  const wrapper = mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <Detail store={store} match={params} />
      </MemoryRouter>
    </Provider>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should delete all pages', async () => {
  const store = mockStore({
    reader: {
      chapter: { ...chapter, pages: pagesUploaded }
    },
    match: params,
    i18nState: {
      lang: 'es',
      translations: {},
      forceRefresh: false
    },
    match: params
  });

  // Append a div to test our UncontrolledTooltip
  const div = document.createElement('div');
  div.setAttribute('id', 'select-default-0');
  document.body.appendChild(div);

  const wrapper = await mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <Detail store={store} match={params} />
      </MemoryRouter>
    </Provider>
  );

  const removeAllButton = await wrapper
    .find('button[id="delete-all-pages"]')
    .simulate('click');

  const confirmRemoveAllButton = await wrapper.find(
    'button[id="confirm-delete-all-pages"]'
  );
  await confirmRemoveAllButton.simulate('click');
  await wrapper.update();

  let request = moxios.requests.mostRecent();
  await request.respondWith({
    status: 200,
    statusText: 'OK',
    response: {
      data: {
        message: 'Ok'
      }
    }
  });

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should upload all pages', async () => {
  const store = mockStore({
    reader: {
      chapter: { ...chapter, pages: pagesAsFile }
    },
    match: params,
    i18nState: {
      lang: 'es',
      translations: {},
      forceRefresh: false
    },
    match: params
  });

  // Append a div to test our UncontrolledTooltip
  const div = document.createElement('div');
  div.setAttribute('id', 'select-default-0');
  document.body.appendChild(div);

  const wrapper = await mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <ErrorBoundary>
          <Detail store={store} match={params} />
        </ErrorBoundary>
      </MemoryRouter>
    </Provider>
  );

  moxios.stubRequest('/uploads', {
    status: 200,
    responseText: 'hello'
  });

  const uploadAllButton = await wrapper.find('button[id="upload-all-pages"]');
  uploadAllButton.simulate('click');

  await wrapper.update();

  const props = await wrapper
    .find(Detail)
    .props()
    .store.getState();

  let request = moxios.requests.mostRecent();
  await request.respondWith({
    status: 200,
    statusText: 'OK',
    response: {
      data: {
        file: pagesAsFile[0]
      }
    }
  });

  let requestCreateOrUpdatePage = moxios.requests.mostRecent();
  await requestCreateOrUpdatePage.respondWith({
    status: 200,
    statusText: 'OK',
    response: {
      data: {
        createOrUpdatePage: {
          response: 'ok'
        }
      }
    }
  });

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should allow to set a page as default', async () => {
  const store = mockStore({
    reader: {
      chapter: { ...chapter, pages: pagesAsFile }
    },
    match: params,
    i18nState: {
      lang: 'es',
      translations: {},
      forceRefresh: false
    },
    match: params
  });

  const wrapper = await mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <ErrorBoundary>
          <Detail store={store} match={params} />
        </ErrorBoundary>
      </MemoryRouter>
    </Provider>
  );

  const selectAsDefault = await wrapper.find('div#select-default-0');
  selectAsDefault.simulate('click');

  await wrapper.update();

  const props = await wrapper
    .find(Detail)
    .props()
    .store.getState();

  let request = moxios.requests.mostRecent();
  await request.respondWith({
    status: 200,
    statusText: 'OK',
    response: {
      data: {
        message: 'Ok'
      }
    }
  });

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should allow to add pages', async () => {
  const store = mockStore({
    reader: {
      chapter: { ...chapter, pages: [] }
    },
    match: params,
    i18nState: {
      lang: 'es',
      translations: {},
      forceRefresh: false
    },
    match: params
  });

  const wrapper = await mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <ErrorBoundary>
          <Detail store={store} match={params} />
        </ErrorBoundary>
      </MemoryRouter>
    </Provider>
  );

  let image = {
    name: 'plot.jpg',
    size: 1000,
    type: 'image/jpeg'
  };

  const fileContents = image;
  const file = new Blob([fileContents], { type: 'text/plain' });

  await wrapper
    .find(Dropzone)
    .simulate('drop', { dataTransfer: { files: [file] } });

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should show an error message', async () => {
  const store = mockStore({
    reader: {
      chapter: {
        workId: 1,
        chapter: 0,
        subchapter: 0,
        volume: 0,
        language: 1,
        name: '',
        stub: '',
        hidden: false,
        notShowAtStart: false,
        description: '',
        thumbnail: '',
        pages: []
      }
    },
    match: params,
    i18nState: {
      lang: 'es',
      translations: {},
      forceRefresh: false
    },
    match: params
  });

  const wrapper = await mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <ErrorBoundary>
          <Detail store={store} match={params} />
        </ErrorBoundary>
      </MemoryRouter>
    </Provider>
  );

  let request = moxios.requests.mostRecent();
  await request.respondWith({
    status: 500,
    statusText: 'ERROR',
    response: {
      data: {
        error: 'EWWWW'
      }
    }
  });

  const alert = wrapper.find('#error-alert');

  expect(alert).toBeDefined();
  wrapper.unmount();
});
