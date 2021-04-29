import path from 'path';

import globalParams from '@shared/params/global';
import userParams from '@shared/params/user';
import genresParams from '@shared/params/genres';
import blogParams from '@shared/params/blog';
import { getLatestToken } from '../modules/user/resolvers';

/**
 * Generate a path of a chapter, if filename is undefined it will return only the directory
 * @param {*} chapter
 * @param {*} work
 * @param {*} filename Optional
 */
export function generateChapterDir(chapter, work, filename) {
  // If filename is undefined, just return directory
  if (filename === undefined) {
    return path.join(
      __dirname,
      '..',
      '..',
      'public',
      'works',
      work.uniqid,
      chapter.uniqid
    );
  } else {
    return path.join(
      __dirname,
      '..',
      '..',
      'public',
      'works',
      work.uniqid,
      chapter.uniqid,
      filename
    );
  }
}

/**
 * Get extension from a file
 * @param {string} filename
 */
export function getFileExtension(filename) {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined;
}

/**
 * Check if the field is included in the gql query
 * @param {*} fieldNodes
 * @param {string[]} fields
 */
export function includesField(fieldNodes = [], fields) {
  const resultFields =
    fieldNodes && fieldNodes.length > 0
      ? fieldNodes[0].selectionSet.selections.map(
          selection => selection.name.value
        )
      : [];

  let isIncluded = false;

  for (let index = 0; index < fields.length; index++) {
    const field = fields[index];
    if (resultFields.includes(field)) {
      isIncluded = true;
    }
  }

  return isIncluded;
}

export const AUTH_ERROR = {
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  OPERATION_DENIED: 'OPERATION_DENIED'
};

export const hasPermission = async (mod = 'read', auth, module = 'core') => {
  if (mod !== 'read') {
    const token = await getLatestToken(auth.user.id);
    if (!token) {
      throw new Error(AUTH_ERROR.SESSION_EXPIRED);
    }
  }

  if (auth.user && (module === 'users' || module === 'registry')) {
    return auth.user.role === userParams.roles.admin;
  }

  if (auth.user && auth.user.role) {
    return (
      auth.user.role === userParams.roles.admin ||
      (auth.user.role === userParams.roles.uploader && mod !== 'delete')
    );
  }

  return false;
};

// Language helpers
export const languages = Object.keys(globalParams.languages).map(
  k => globalParams.languages[k]
);

export function languageIdToName(langId) {
  const language = languages.find(lang => lang.id === langId);
  return language !== undefined ? language.name : null;
}

// Genres Status helpers
export const genresTypes = Object.keys(genresParams.types).map(
  g => genresParams.types[g]
);

export function genreTypeIdToName(genreId) {
  const genre = genresTypes.find(genre => genre.id === genreId);
  return genre !== undefined ? genre.name : null;
}

// Posts Status helpers
export const postsStatus = Object.keys(blogParams.status).map(
  k => blogParams.status[k]
);

export function postsStatusIdToName(statusId) {
  const status = postsStatus.find(status => status.id === statusId);
  return status !== undefined ? status.name : null;
}

// Blog Categories helpers
export const blogCategories = Object.keys(blogParams.categories).map(
  k => blogParams.categories[k]
);

export function blogCategoriesIdToName(categoryId) {
  const category = blogCategories.find(cat => cat.id === categoryId);
  return category !== undefined ? category.name : null;
}
