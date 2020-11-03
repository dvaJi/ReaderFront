import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ReactGA from 'react-ga';
import { JSDOM } from 'jsdom';
import {
  getPages,
  getPagesAsFiles,
  getReleases,
  getPagesUploaded
} from '../../shared/mocks/getReleasesMock';
import { getPosts } from '../../shared/mocks/getBlogMock';
import { getWork, getWorks } from '../../shared/mocks/getWorksMock';
import 'jest-styled-components';

import 'mock-local-storage';
Object.defineProperty(window, 'localStorage', { value: global.localStorage });

configure({ adapter: new Adapter() });
ReactGA.initialize('foo', { testMode: true });
ReactGA.ga('send', 'pageview', '/series');
jest.mock('react-ga');

global.scrollTo = jest.fn();
global.XMLHttpRequest = undefined;
global.document = new JSDOM('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;
global.window.resizeTo = (width, height) => {
  global.window.innerWidth = width || global.window.innerWidth;
  global.window.innerHeight = height || global.window.innerHeight;
  global.window.dispatchEvent(new Event('resize')); // eslint-disable-line no-undef
};
global.window.scrollToBottom = () => {
  global.window.scrollTo(0, global.document.body.scrollHeight);
  global.window.dispatchEvent(new Event('scroll')); // eslint-disable-line no-undef
};

window.HTMLCanvasElement.prototype.getContext = function () {
  return {
    fillRect: function () {},
    clearRect: function () {},
    getImageData: function (x, y, w, h) {
      return {
        data: new Array(w * h * 4)
      };
    },
    putImageData: function () {},
    createImageData: function () {
      return [];
    },
    setTransform: function () {},
    drawImage: function () {},
    save: function () {},
    fillText: function () {},
    restore: function () {},
    beginPath: function () {},
    moveTo: function () {},
    lineTo: function () {},
    closePath: function () {},
    stroke: function () {},
    translate: function () {},
    scale: function () {},
    rotate: function () {},
    arc: function () {},
    fill: function () {},
    measureText: function () {
      return { width: 0 };
    },
    transform: function () {},
    rect: function () {},
    clip: function () {}
  };
};

window.HTMLCanvasElement.prototype.toDataURL = function () {
  return '';
};

if (typeof window.URL.createObjectURL === 'undefined') {
  Object.defineProperty(window.URL, 'createObjectURL', { value: () => '' });
}

// Temporal: https://github.com/airbnb/enzyme/issues/1875#issuecomment-451177239
jest.mock('react', () => {
  const r = jest.requireActual('react');

  return { ...r, memo: x => x };
});

global.wait = ms => {
  return new Promise(resolve => setTimeout(() => resolve(), ms));
};

global.originalError = console.error;

// Helper for Markdown Editor
global.createPasteEvent = function createPasteEvent(html) {
  const text = html.replace('<[^>]*>', '');
  return {
    clipboardData: {
      types: ['text/plain', 'text/html'],
      getData: type => (type === 'text/plain' ? text : html)
    }
  };
};

if (global.document) {
  document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document
    }
  });
}

// Mock useIntl hook
jest.mock('react-intl', () => {
  const reactIntl = jest.requireActual('react-intl');
  const messages = require('../../shared/lang/en.json');
  const intlProvider = new reactIntl.IntlProvider(
    {
      locale: 'en',
      defaultLocale: 'en',
      messages
    },
    {}
  );

  return {
    ...reactIntl,
    useIntl: () => {
      return intlProvider.state.intl;
    }
  };
});

global.createFile = (name, size, type) => {
  const file = new File([], name, { type });
  Object.defineProperty(file, 'size', {
    get() {
      return size;
    }
  });
  return file;
};

global.flushPromises = () => new Promise(resolve => setImmediate(resolve));

// Setup Mocks
global.rfMocks = {
  releases: {
    getPages: getPages(),
    getPagesAsFiles: getPagesAsFiles(),
    getReleases: getReleases(),
    getPagesUploaded: getPagesUploaded()
  },
  posts: {
    getPost: getPosts()[0],
    getPosts: getPosts(),
    getPostsNormalized: getPosts()
  },
  work: {
    work: getWork,
    workNormalized: getWork,
    works: getWorks,
    worksNormalized: getWorks
  }
};
