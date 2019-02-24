import { getDefaultLanguage } from '../../utils/common';

let initialState = getDefaultLanguage();

export function language(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_CHANGE_LANGUAGE':
      localStorage.setItem('rf_language', action.language);
      return action.language;

    default:
      return state;
  }
}
