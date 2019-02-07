// Helpers

// Render element or component by provided condition
export function renderIf(condition, renderFn) {
  return condition ? renderFn() : null;
}

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
 * It will return an slugify version of the text given
 * Example: Star Wars: Episode VIII - The Last Jedi -> star_wars_episode_viii_the_last_jedi
 * @param {string} text - Text to slugify
 * @return {string} - Returns a Promise with undefined value.
 */
const sets = [
  { to: 'a', from: '[ÀÁÂÃÄÅÆĀĂĄẠẢẤẦẨẪẬẮẰẲẴẶ]' },
  { to: 'c', from: '[ÇĆĈČ]' },
  { to: 'd', from: '[ÐĎĐÞ]' },
  { to: 'e', from: '[ÈÉÊËĒĔĖĘĚẸẺẼẾỀỂỄỆ]' },
  { to: 'g', from: '[ĜĞĢǴ]' },
  { to: 'h', from: '[ĤḦ]' },
  { to: 'i', from: '[ÌÍÎÏĨĪĮİỈỊ]' },
  { to: 'j', from: '[Ĵ]' },
  { to: 'ij', from: '[Ĳ]' },
  { to: 'k', from: '[Ķ]' },
  { to: 'l', from: '[ĹĻĽŁ]' },
  { to: 'm', from: '[Ḿ]' },
  { to: 'n', from: '[ÑŃŅŇ]' },
  { to: 'o', from: '[ÒÓÔÕÖØŌŎŐỌỎỐỒỔỖỘỚỜỞỠỢǪǬƠ]' },
  { to: 'oe', from: '[Œ]' },
  { to: 'p', from: '[ṕ]' },
  { to: 'r', from: '[ŔŖŘ]' },
  { to: 's', from: '[ßŚŜŞŠ]' },
  { to: 't', from: '[ŢŤ]' },
  { to: 'u', from: '[ÙÚÛÜŨŪŬŮŰŲỤỦỨỪỬỮỰƯμ]' },
  { to: 'w', from: '[ẂŴẀẄ]' },
  { to: 'x', from: '[ẍ]' },
  { to: 'y', from: '[ÝŶŸỲỴỶỸ]' },
  { to: 'z', from: '[ŹŻŽ]' },
  { to: '-', from: "[·/_,:;']" }
];
const whiteSpaces = /\s+/g;
const ampersand = /&/g;
const nonWordsAndNumbers = /[^a-zA-Z0-9_]/g;
const replaceMultipleUnderscore = /\__+/g; // eslint-disable-line no-useless-escape

export const slugify = text => {
  if (text === null || text === undefined) {
    return '';
  }
  let slugText = text;
  // Replace all characters from our set
  sets.forEach(set => {
    slugText = slugText.replace(new RegExp(set.from, 'gi'), set.to);
  });

  return slugText
    .toString()
    .toLowerCase()
    .replace(whiteSpaces, '_')
    .replace(ampersand, '-and-')
    .replace(nonWordsAndNumbers, '')
    .replace(replaceMultipleUnderscore, '_')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export function isAuthRoute(location) {
  if (location === null || location.pathname === null) {
    return false;
  }

  if (location.pathname.startsWith('/auth', 0)) {
    return true;
  }

  return false;
}

export function isAdminRoute(location) {
  if (location === null || location.pathname === null) {
    return false;
  }

  if (location.pathname.startsWith('/admin', 0)) {
    return true;
  }

  return false;
}

// Substring with ...
export function subString(string, length = 0) {
  if (typeof string !== 'string') {
    return '';
  }
  return string.length > length ? `${string.substr(0, length)}...` : string;
}

// Duplicate object
export function duplicate(object) {
  return Object.assign({}, object);
}

// Return empty string if value is null
export function nullToEmptyString(value) {
  return value === null ? '' : value;
}

// Return zero if value is null
export function nullToZero(value) {
  return value === null ? 0 : value;
}

// Add (s) to any string by count
export function plural(value) {
  return value === 1 ? '' : 's';
}

// Check if object is empty
export function isEmpty(obj) {
  let name;
  for (name in obj) {
    if (obj.hasOwnProperty(name)) {
      return false;
    }
  }
  if (obj.constructor !== Object) {
    return false;
  }
  return true;
}

// Transform query param to object
// ?foo=bar => {foo: bar}
export function getQueryParams(query) {
  if (!query) {
    return {};
  }
  return query
    .replace(/^\?/, '')
    .split('&')
    .reduce((json, item) => {
      if (item) {
        item = item.split('=').map(value => decodeURIComponent(value));
        json[item[0]] = item[1];
      }
      return json;
    }, {});
}

// GraphQL Query Builder
export function queryBuilder(options) {
  options.type = options.type ? options.type : 'query';
  options.operation = options.operation ? options.operation : '';
  options.fields = options.fields ? options.fields : [];
  options.data = options.data ? options.data : {};
  options.variables = options.variables ? options.variables : {};

  const query = {
    query: `
        ${options.type} ${queryDataArgumentAndTypeMap(options.data)} {
            ${options.operation} ${queryDataNameAndArgumentMap(options.data)} {
                ${options.fields.join(',')}
            }
        }`,
    variables: Object.assign(options.data, options.variables)
  };

  return query;
}

// Private - Convert object to name and argument map eg: (id: $id)
function queryDataNameAndArgumentMap(data) {
  return Object.keys(data).length
    ? `(${Object.keys(data).reduce(
        (dataString, key, i) =>
          `${dataString}${i !== 0 ? ', ' : ''}${key}: $${key}`,
        ''
      )})`
    : '';
}

// Private - Convert object to argument and type map eg: ($id: Int)
function queryDataArgumentAndTypeMap(data) {
  return Object.keys(data).length
    ? `(${Object.keys(data).reduce(
        (dataString, key, i) =>
          `${dataString}${i !== 0 ? ', ' : ''}$${key}: ${queryDataType(
            data[key]
          )}`,
        ''
      )})`
    : '';
}

// Private - Get GraphQL equivalent type of data passed (String, Int, Float, Boolean)
function queryDataType(data) {
  switch (typeof data) {
    case 'boolean':
      return 'Boolean';
    case 'number':
      return data % 1 === 0 ? 'Int' : 'Float';
    case 'string':
    default:
      return 'String';
  }
}

export function hashCode(string) {
  if (!string) {
    return 0;
  }

  for (var index = 0, hash = 0; index < string.length; index++) {
    hash = (Math.imul(31, hash) + string.charCodeAt(index)) | 0;
  }
  return hash;
}

export function bytesToSize(bytes, fixed = 0) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === undefined || bytes === 0) return 0;
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  if (i === 0) return `${bytes} ${sizes[i]}`;
  return `${(bytes / 1024 ** i).toFixed(fixed)} ${sizes[i]}`;
}
