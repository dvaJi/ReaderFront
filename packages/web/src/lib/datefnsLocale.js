import localeEn from 'date-fns/locale/en-US/index';
import localeEs from 'date-fns/locale/es/index';

export function getLocale(locale) {
  if (locale === 'en') {
    return localeEn;
  }

  return localeEs;
}
