import packageJson from '../package.json';
export const NODE_ENV = import.meta.env.MODE;
export const IS_PROD = import.meta.env.PROD;
export const APP_URL = import.meta.env.REACT_APP_APP_URL;
export const READER_PATH = import.meta.env.REACT_APP_READER_PATH;
export const APP_PATH = import.meta.env.REACT_APP_APP_PATH;
export const APP_TITLE = import.meta.env.REACT_APP_APP_TITLE;
export const GA_ID = import.meta.env.REACT_APP_GA_ID;
export const CDN = import.meta.env.REACT_APP_CDNS;
export const LANGUAGES = import.meta.env.REACT_APP_LANGUAGES
  ? import.meta.env.REACT_APP_LANGUAGES.split(',')
  : ['en'];
export const APP_VERSION = packageJson.version;
export const S3_ENDPOINT = import.meta.env.REACT_APP_S3_ENDPOINT;
