import { createGlobalState } from 'react-hooks-global-state';
const lsTheme = window.localStorage.getItem('theme');

var displaySettings = {
  fitDisplay: 'width', // container|width|height|no resize
  pageRendering: 'longstrip', //single|double|longstrip
  direction: 'right' //left|right
};

var layoutSettings = {
  header: true,
  sidebar: true
};

var others = {
  preloadImages: 3, // 0 to 20
  qualityImage: 100
};

const initialState = {
  theme: lsTheme || 'light',
  language: 'es',
  displaySettings,
  layoutSettings,
  coreSettings: others
};

const {
  GlobalStateProvider,
  setGlobalState,
  useGlobalState
} = createGlobalState(initialState);

export const setTheme = theme => {
  window.localStorage.setItem('theme', theme);
  setGlobalState('theme', theme);
};

export const setLanguage = language => {
  setGlobalState('language', language);
};

export const setDisplaySettings = displaySettings => {
  setGlobalState('displaySettings', displaySettings);
};

export const setLayoutSettings = layoutSettings => {
  setGlobalState('layoutSettings', layoutSettings);
};

export const setCoreSettings = coreSettings => {
  setGlobalState('coreSettings', coreSettings);
};

export { GlobalStateProvider, useGlobalState };
