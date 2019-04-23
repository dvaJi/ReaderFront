import { createGlobalState } from 'react-hooks-global-state';
const lsTheme = window.localStorage.getItem('theme');

const {
  GlobalStateProvider,
  setGlobalState,
  useGlobalState
} = createGlobalState({
  theme: lsTheme ? lsTheme : 'light',
  language: 'es'
});

export const setTheme = theme => {
  window.localStorage.setItem('theme', theme);
  setGlobalState('theme', theme);
};

export const setLanguage = language => {
  setGlobalState('language', language);
};

export { GlobalStateProvider, useGlobalState };
