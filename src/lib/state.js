import { createGlobalState } from 'react-hooks-global-state';
import cookie from 'js-cookie';

const displaySettingsLS = getLSItem('displaySettings');
const displaySettings = {
  readingMode: 'manga', // manga|webtoon
  pageRendering: 'vertical', //horizontal|vertical
  readingDirection: 'right' // right|left
};

const coreSettingsLS = getLSItem('coreSettings');
const coreSettings = {
  preloadImages: 3, // 0 to 20
  qualityImage: 100
};

const userLS = getLSItem('user');
const initialState = ({ theme, language, languages_filter }) => ({
  theme: theme || getLSItem('theme'),
  language: language || getLSItem('rf_language'),
  languages_filter: languages_filter || getLSItem('rf_languages_filter') || [],
  user: userLS,
  displaySettings: displaySettingsLS || displaySettings,
  coreSettings: coreSettingsLS || coreSettings
});

let setGlobalState = null;
let useGlobalState = null;

export const initGlobalState = initState => {
  const global = createGlobalState(initialState(initState));
  setGlobalState = global.setGlobalState;
  useGlobalState = global.useGlobalState;
};

export const setTheme = theme => {
  setLSItem('theme', theme);
  setGlobalState('theme', theme);
};

export const setLanguage = language => {
  setLSItem('rf_language', language);
  setGlobalState('language', language);
};

export const setLanguagesFilter = languages => {
  setLSItem('rf_languages_filter', languages);
  setGlobalState('languages_filter', languages);
};

export const setUser = (user, token) => {
  if (user) {
    // Update token
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('user', JSON.stringify(user));

    // Set cookie for SSR
    cookie.set('auth', { token, user }, { path: '/' });

    setGlobalState('user', user);
  } else {
    // Remove user
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
    cookie.remove('auth');
    setGlobalState('user', null);
  }
};

export const setDisplaySettings = displaySettings => {
  setLSItem('displaySettings', displaySettings);
  setGlobalState('displaySettings', displaySettings);
};

export const setCoreSettings = coreSettings => {
  setLSItem('coreSettings', coreSettings);
  setGlobalState('coreSettings', coreSettings);
};

function setLSItem(name, object) {
  try {
    window.localStorage.setItem(name, JSON.stringify(object));
    cookie.set(name, object, { path: '/' });
  } catch (err) {
    console.error(err);
  }
}

function getLSItem(name) {
  let item = cookie.get(name);

  if (typeof window !== 'undefined') {
    item = window.localStorage.getItem(name);
  }

  try {
    return JSON.parse(item);
  } catch (err) {
    return item;
  }
}

export { useGlobalState };
