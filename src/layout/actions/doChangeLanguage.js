import { updateIntl } from 'react-intl-redux';
import translations from '../../i18n/locales';

export function dosChangeLanguage(lang) {
  return {
    type: 'REQUEST_CHANGE_LANGUAGE',
    language: lang
  };
}

export function doChangeLanguage(lang) {
  return dispatch => {
    dispatch(dosChangeLanguage(lang));
    dispatch(
      updateIntl({
        locale: lang,
        messages: translations[lang]
      })
    );
  };
}
