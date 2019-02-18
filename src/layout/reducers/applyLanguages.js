function getDefaultLanguage() {
  const navigatorLang = navigator.language || navigator.userLanguage || 'en';
  const localLang = window.localStorage.getItem('rf_language');

  let language = '';
  if (localLang) {
    language = localLang;
  } else {
    const validLanguages = ['es', 'en'];
    const navigatorValue = navigatorLang.split('-')[0];
    const isValidLanguage = validLanguages.indexOf(navigatorValue) > -1;
    language = isValidLanguage ? navigatorValue : 'en';
  }

  if (localStorage.getItem('rf_language') !== language) {
    localStorage.setItem('rf_language', language);
  }

  return language;
}

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
