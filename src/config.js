export const NODE_ENV = process.env.NODE_ENV;
export const IS_PROD = process.env.NODE_ENV === 'production';
export const APP_URL = process.env.REACT_APP_APP_URL;
export const READER_PATH = process.env.REACT_APP_READER_PATH;
export const APP_PATH = process.env.REACT_APP_APP_PATH;
export const APP_TITLE = process.env.REACT_APP_APP_TITLE;
export const DISQUS_SHORTNAME = process.env.REACT_APP_DISQUS_SHORTNAME;
export const GA_ID = process.env.REACT_APP_GA_ID;
export const DISCORD_URL = process.env.REACT_APP_DISCORD_URL;
export const DISCORD_ID = process.env.REACT_APP_DISCORD_ID;
export const PATREON_URL = process.env.REACT_APP_PATREON_URL;
export const ANONYMIZER_DOWNLOADS = process.env.REACT_APP_ANONYMIZER_DOWNLOADS
  ? process.env.REACT_APP_ANONYMIZER_DOWNLOADS
  : '';
export const CDN = process.env.REACT_APP_CDNS;
export const LANGUAGES = process.env.REACT_APP_LANGUAGES
  ? process.env.REACT_APP_LANGUAGES.split(',')
  : ['en'];
