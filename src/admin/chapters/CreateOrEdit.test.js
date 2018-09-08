import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Form } from 'reactstrap';
import { mountWithIntl } from 'enzyme-react-intl';
import moxios from '@anilanar/moxios';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { getReleases } from '../../utils/mocks/getReleasesMock';
import CreateOrEdit from './CreateOrEdit';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const chapter = getReleases(1)[0];
const params = {
  params: {
    chapterId: undefined,
    workId: 0,
    stub: ''
  }
};

const paramsWChapter = {
  params: {
    chapterId: 1,
    workId: 0,
    stub: ''
  }
};

describe('Create or Edit Chapter tests', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe('chapter fetch', () => {
    it('should fetch chapter', async () => {
      const store = mockStore({
        reader: {
          chapter: null
        },
        i18nState: {
          lang: 'es',
          translations: {},
          forceRefresh: false
        },
        match: paramsWChapter
      });

      const wrapper = await mountWithIntl(
        <Provider store={store}>
          <MemoryRouter>
            <CreateOrEdit store={store} match={paramsWChapter} />
          </MemoryRouter>
        </Provider>
      );

      let request = moxios.requests.mostRecent();
      await request.respondWith({
        status: 200,
        statusText: 'OK',
        response: {
          data: {
            chapterById: { ...chapter, pages: [] }
          }
        }
      });

      expect(wrapper).toBeTruthy();
      wrapper.unmount();
    });

    it('should show an error message if it can not fetch the chapter', async () => {
      const store = mockStore({
        reader: {
          chapter: null
        },
        i18nState: {
          lang: 'es',
          translations: {},
          forceRefresh: false
        },
        match: paramsWChapter
      });

      const wrapper = await mountWithIntl(
        <Provider store={store}>
          <MemoryRouter>
            <CreateOrEdit store={store} match={paramsWChapter} />
          </MemoryRouter>
        </Provider>
      );

      let request = moxios.requests.mostRecent();
      await request.respondWith({
        status: 500,
        statusText: 'ERROR',
        response: {
          data: {
            error: 'Can not fetch the chapter'
          }
        }
      });

      expect(wrapper.find('#error-alert')).toBeDefined();
      wrapper.unmount();
    });
  });

  describe('form', () => {
    it('should create a new chapter', async () => {
      const store = mockStore({
        reader: {
          chapter: null
        },
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
            <CreateOrEdit store={store} match={params} />
          </MemoryRouter>
        </Provider>
      );

      const form = wrapper.find(Form);
      // Input text
      const inputName = form.find('input[name="name"]');
      inputName.simulate('change', {
        target: { value: 'The Chapter', name: 'name' }
      });
      const inputVolume = form.find('input[name="volume"]');
      inputVolume.simulate('change', {
        target: { value: '0', name: 'volume' }
      });
      const inputChapter = form.find('input[name="chapter"]');
      inputChapter.simulate('change', {
        target: { value: '1', name: 'chapter' }
      });
      const inputSubchapter = form.find('input[name="subchapter"]');
      inputSubchapter.simulate('change', {
        target: { value: '0', name: 'subchapter' }
      });

      // Select
      const selectLanguage = form.find('select[name="language"]');
      selectLanguage.simulate('change', {
        target: { value: 1, name: 'language' }
      });

      await form.simulate('submit');

      let submitRequest = moxios.requests.mostRecent();
      await submitRequest.respondWith({
        status: 200,
        statusText: 'OK',
        response: {
          data: {
            chapterById: { ...chapter, pages: [] }
          }
        }
      });

      expect(wrapper).toBeTruthy();
      wrapper.unmount();
    });
  });
});
