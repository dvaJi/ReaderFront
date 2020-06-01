import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import dotenv from 'dotenv';

import {
  getPages,
  getPagesAsFiles,
  getReleases,
  getPagesUploaded
} from './shared/mocks/getReleasesMock';
import { getPosts } from './shared/mocks/getBlogMock';
import { getWork, getWorks } from './shared/mocks/getWorksMock';
import { initGlobalState } from 'lib/state';

configure({ adapter: new Adapter() });

global.wait = ms => {
  return new Promise(resolve => setTimeout(() => resolve(), ms));
};

dotenv.config();

initGlobalState({ language: 'es', theme: 'dark', languages_filter: [] });

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
