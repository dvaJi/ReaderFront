import path from 'path';

import params from '../config/params';

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

const illegalRe = /[\/\?<>\\:\*\|":]/g; //eslint-disable-line no-useless-escape
const controlRe = /[\x00-\x1f\x80-\x9f]/g; //eslint-disable-line no-control-regex
const reservedRe = /^\.+$/;
const windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
const windowsTrailingRe = /[\. ]+$/; //eslint-disable-line no-useless-escape
const removeWhiteSpace = /\s/g;
const removeSpecialCharacters = /[[|\]|(|)|'|"|$]/g;

export const sanitizeFilename = (filename, replacement = '') =>
  filename
    .replace(illegalRe, replacement)
    .replace(controlRe, replacement)
    .replace(reservedRe, replacement)
    .replace(windowsReservedRe, replacement)
    .replace(windowsTrailingRe, replacement)
    .replace(removeSpecialCharacters, replacement)
    .replace(removeWhiteSpace, '_');

/**
 * Same functionality as forEach, but runs only one callback at a time.
 * @param {Array} array - Array to iterate over.
 * @param {Function} callback - Function to apply each item in `array`. Accepts three arguments: `currentValue`, `index` and `array`.
 * @param {Object} [thisArg] - Value to use as *this* when executing the `callback`.
 * @return {Promise} - Returns a Promise with undefined value.
 */
export async function forEachSeries(array, callback, thisArg) {
  for (let i = 0; i < array.length; i++) {
    if (i in array) {
      await callback.call(thisArg || this, await array[i], i, array);
    }
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

// Language helpers
export const languages = Object.keys(params.global.languages).map(
  k => params.global.languages[k]
);

export function languageIdToName(langId) {
  const language = languages.find(lang => lang.id === langId);
  return language !== undefined ? language.name : null;
}

// Genres Status helpers
export const genresTypes = Object.keys(params.genres.types).map(
  g => params.genres.types[g]
);

export function genreTypeIdToName(genreId) {
  const genre = genresTypes.find(genre => genre.id === genreId);
  return genre !== undefined ? genre.name : null;
}

// Posts Status helpers
export const postsStatus = Object.keys(params.blog.status).map(
  k => params.blog.status[k]
);

export function postsStatusIdToName(statusId) {
  const status = postsStatus.find(status => status.id === statusId);
  return status !== undefined ? status.name : null;
}

// Blog Categories helpers
export const blogCategories = Object.keys(params.blog.categories).map(
  k => params.blog.categories[k]
);

export function blogCategoriesIdToName(categoryId) {
  const category = blogCategories.find(cat => cat.id === categoryId);
  return category !== undefined ? category.name : null;
}
