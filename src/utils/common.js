import axios from 'axios/index';

// Common functions
import params from '../params.json';
import { READER_PATH, LANGUAGES } from '../config';

// Return an object with styles
export function getStatusTagStyle(statusId) {
  if (statusId === params.works.status.onGoing.id) {
    return { background: '#17a2b8', color: '#fff' };
  } else if (statusId === params.works.status.completed.id) {
    return { background: '#28a745', color: '#fff' };
  } else if (statusId === params.works.status.dropped.id) {
    return { background: '#f8f9fa', color: '#212529' };
  }
}

export function canUseWebP() {
  try {
    const elem =
      typeof document === 'object' ? document.createElement('canvas') : {};
    if (elem.getContext && elem.getContext('2d')) {
      return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}

// Language helpers
export const languages = Object.keys(params.global.languages).map(
  k => params.global.languages[k]
);

export const languagesAvailables = languages.filter(lang =>
  LANGUAGES.includes(lang.name)
);

export function languageIdToName(langId) {
  const language = languages.find(lang => lang.id === langId);
  return language !== undefined ? language.name : null;
}

export function languageNameToId(langName) {
  const language = languages.find(lang => lang.name === langName);
  return language !== undefined ? language.id : -1;
}

//Posts Status helpers
export const postsStatus = Object.keys(params.blog.status).map(
  k => params.blog.status[k]
);

export function postsStatusIdToName(statusId) {
  const status = postsStatus.find(status => status.id === statusId);
  return status !== undefined ? status.name : null;
}

export function postsStatusNameToId(statusName) {
  const status = postsStatus.find(status => status.name === statusName);
  return status !== undefined ? status.id : null;
}

// Blog Categories helpers
export const blogCategories = Object.keys(params.blog.categories).map(
  k => params.blog.categories[k]
);

export function blogCategoriesIdToName(categoryId) {
  const category = blogCategories.find(cat => cat.id === categoryId);
  return category !== undefined ? category.name : null;
}

export function blogCategoriesNameToId(categoryName) {
  const category = blogCategories.find(cat => cat.name === categoryName);
  return category !== undefined ? category.id : null;
}

// Work Helpers
export const workStatus = Object.keys(params.works.status).map(
  s => params.works.status[s]
);

export function workStatusIdToName(statusId) {
  const status = workStatus.find(status => status.id === statusId);
  return status !== undefined ? status.name : null;
}

// Work Helpers
export const workTypes = Object.keys(params.works.types).map(
  s => params.works.types[s]
);

export function workTypesIdToName(typeId) {
  const type = workTypes.find(type => type.id === typeId);
  return type !== undefined ? type.name : null;
}

export const genresDemographic = Object.keys(params.genres.demographic).map(
  d => params.genres.demographic[d]
);

export function genreDemographicIdToName(demographicId) {
  const status = genresDemographic.find(
    demographic => demographic.id === demographicId
  );
  return status !== undefined ? status.name : '';
}

export const genresTypes = Object.keys(params.genres.types).map(
  g => params.genres.types[g]
);

export function genreTypeIdToName(genreId) {
  const genre = genresTypes.find(genre => genre.id === genreId);
  return genre !== undefined ? genre.name : null;
}

export const workRoles = Object.keys(params.works.roles).map(
  r => params.works.roles[r]
);

export function rolIdToName(rolId) {
  const rol = workRoles.find(rol => rol.id === rolId);
  return rol !== undefined ? rol.name : null;
}

export async function uploadImage(data) {
  return await axios.post(READER_PATH + 'uploads', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export function getDefaultLanguage() {
  if (LANGUAGES.length === 1) {
    if (localStorage.getItem('rf_language') !== LANGUAGES[0]) {
      localStorage.setItem('rf_language', LANGUAGES[0]);
    }
    return LANGUAGES[0];
  }

  const navigatorLang =
    navigator.browserLanguage || navigator.language || navigator.userLanguage;
  const localLang = window.localStorage.getItem('rf_language');

  let language = '';
  if (localLang) {
    language = localLang;
  } else {
    const navigatorValue = navigatorLang.split('-')[0];
    const isValidLanguage = !!LANGUAGES.find(lang => lang === navigatorValue);
    language = isValidLanguage ? navigatorValue : 'en';
  }

  if (localStorage.getItem('rf_language') !== language) {
    localStorage.setItem('rf_language', language);
  }

  return language;
}
