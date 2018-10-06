import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactGA from 'react-ga';
import {JSDOM} from 'jsdom';
import {
  getPages,
  getPagesAsFiles,
  getReleases,
  getPagesUploaded
} from './utils/mocks/getReleasesMock';
import { getPosts } from './utils/mocks/getBlogMock';
import { getWork, getWorks } from './utils/mocks/getWorksMock';
import { normalizePost } from './utils/normalizeBlog';
import { normalizeWork } from './utils/normalizeWork';

configure({ adapter: new Adapter() });
ReactGA.initialize('foo', { testMode: true });
ReactGA.ga('send', 'pageview', '/series');
jest.mock('react-ga');

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

global.scrollTo = jest.fn();
global.localStorage = localStorageMock;
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
      fillRect: function() {},
      clearRect: function(){},
      getImageData: function(x, y, w, h) {
          return  {
              data: new Array(w*h*4)
          };
      },
      putImageData: function() {},
      createImageData: function(){ return []},
      setTransform: function(){},
      drawImage: function(){},
      save: function(){},
      fillText: function(){},
      restore: function(){},
      beginPath: function(){},
      moveTo: function(){},
      lineTo: function(){},
      closePath: function(){},
      stroke: function(){},
      translate: function(){},
      scale: function(){},
      rotate: function(){},
      arc: function(){},
      fill: function(){},
      measureText: function(){
          return { width: 0 };
      },
      transform: function(){},
      rect: function(){},
      clip: function(){},
  };
}

window.HTMLCanvasElement.prototype.toDataURL = function () {
  return "";
}

if (typeof window.URL.createObjectURL === 'undefined') {
  Object.defineProperty(window.URL, 'createObjectURL', { value: () =>  ""})
}

// Setup Mocks
global.rfMocks = {
  releases: {
    getPages: getPages(),
    getPagesAsFiles: getPagesAsFiles(),
    getReleases: getReleases(),
    getPagesUploaded: getPagesUploaded()
  },
  posts: {
    getPosts: getPosts(),
    getPostsNormalized: getPosts().map(post => normalizePost(post))
  },
  work: {
    work: getWork,
    workNormalized: normalizeWork(getWork),
    works: getWorks,
    worksNormalized: getWorks.map(work => normalizeWork(work))
  }
};
