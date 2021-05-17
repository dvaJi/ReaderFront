import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ReactGA from 'react-ga';
import dotenv from 'dotenv';

import {
  getPages,
  getPagesAsFiles,
  getReleases,
  getPagesUploaded
} from '@readerfront/shared/build/mocks/getReleasesMock';
import { getPosts } from '@readerfront/shared/build/mocks/getBlogMock';
import {
  getWork,
  getWorks
} from '@readerfront/shared/build/mocks/getWorksMock';
import { initGlobalState } from 'lib/state';

configure({ adapter: new Adapter() });

// Mock react-ga
ReactGA.initialize('foo', { testMode: true });
ReactGA.ga('send', 'pageview', '/');
jest.mock('react-ga');

global.wait = ms => {
  return new Promise(resolve => setTimeout(() => resolve(), ms));
};

dotenv.config();

initGlobalState({ language: 'es', theme: 'dark', languages_filter: [] });

jest.mock('next/dynamic', () => () => {
  const DynamicComponent = () => null;
  DynamicComponent.displayName = 'LoadableComponent';
  DynamicComponent.preload = jest.fn();
  return DynamicComponent;
});

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
