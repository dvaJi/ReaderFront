import { createGlobalState } from 'react-hooks-global-state';

const displaySettingsLS = getLSItem('displaySettings');
const displaySettings = {
  fitDisplay: 'width', // container|width|height|no resize
  pageRendering: 'longstrip' //single|double|longstrip
};

const layoutSettingsLS = getLSItem('layoutSettings');
const layoutSettings = {
  header: true,
  sidebar: true
};

const coreSettingsLS = getLSItem('coreSettings');
const coreSettings = {
  preloadImages: 3, // 0 to 20
  qualityImage: 100
};

const initialState = {
  theme: window.localStorage.getItem('theme') || 'light',
  language: 'es',
  displaySettings: displaySettingsLS || displaySettings,
  layoutSettings: layoutSettingsLS || layoutSettings,
  coreSettings: coreSettingsLS || coreSettings
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
  setLSItem('displaySettings', displaySettings);
  setGlobalState('displaySettings', displaySettings);
};

export const setLayoutSettings = layoutSettings => {
  setLSItem('layoutSettings', layoutSettings);
  setGlobalState('layoutSettings', layoutSettings);
};

export const setCoreSettings = coreSettings => {
  setLSItem('coreSettings', coreSettings);
  setGlobalState('coreSettings', coreSettings);
};

function setLSItem(name, object) {
  try {
    window.localStorage.setItem(name, JSON.stringify(object));
  } catch (err) {
    console.error(err);
  }
}

function getLSItem(name) {
  try {
    const item = window.localStorage.getItem(name);
    return JSON.parse(item);
  } catch (err) {
    return null;
  }
}

export { GlobalStateProvider, useGlobalState };
