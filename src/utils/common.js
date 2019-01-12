import axios from 'axios/index';

// Common functions
import params from '../params.json';
import * as config from '../config';

// Return an object with styles
export function getStatusTagStyle(statusId) {
  if (statusId === params.works.status.onGoing.id) {
    return { background: '#ff982c', color: '#ffe111' };
  } else if (statusId === params.works.status.completed.id) {
    return { background: '#ff982c', color: '#ffe111' };
  } else if (statusId === params.works.status.dropped.id) {
    return { background: '#ff982c', color: '#ffe111' };
  }
}

// Get the work thumbnail url
export function getWorkThumb(dir, filename, size = 'small') {
  if (!filenameIsValid(filename)) {
    return '/static/images/default-cover.png';
  }

  const isWebp = canUseWebP() ? '&lowQuality=true' : '';
  return `${
    config.READER_PATH
  }covers/works/${dir}/${filename}?size=${size}${isWebp}`;
}

export function getChapterPageUrl(work, chapter, filename, size = 'small') {
  if (!filenameIsValid(filename)) {
    return '/static/images/default-cover.png';
  }

  const isWebp = canUseWebP() ? '&lowQuality=true' : '';
  return `${config.READER_PATH}covers/chapter/${work.stub}_${work.uniqid}/${
    chapter.stub
  }_${chapter.uniqid}/${filename}?size=${size}${isWebp}`;
}

// Get the post thumbnail url
export function getPostThumb(dir, filename, size = 'small') {
  if (!filenameIsValid(filename)) {
    return '/static/images/default-cover.png';
  }

  const isWebp = canUseWebP() ? '&lowQuality=true' : '';

  return `${
    config.READER_PATH
  }covers/blog/${dir}/${filename}?size=${size}${isWebp}`;
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

export async function uploadImage(data) {
  return await axios.post(config.READER_PATH + 'uploads', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

function filenameIsValid(filename) {
  return filename !== null && filename !== undefined && filename !== '';
}
