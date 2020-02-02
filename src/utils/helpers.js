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

export function isReaderRoute(location) {
  if (location === null || location.pathname === null) {
    return false;
  }

  if (location.pathname.startsWith('/read', 0)) {
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

export function isMobile() {
  let check = false;
  (function(a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

/**
 * Get network type (limited compatibility: https://caniuse.com/#feat=netinfo)
 * @returns
 * 0 = fast, not supported or unknown (default)
 * 1 = medium (3G)
 * 2 = slow (2G)
 */
export function networkType() {
  try {
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    if (!connection || !connection.effectiveType) return 0;
    if (connection.effectiveType.indexOf('2g') >= 0) return 2;
    if (connection.effectiveType.indexOf('3g') >= 0) return 1;

    return 0;
  } catch (err) {
    return 0;
  }
}

export function hash(host, index, min, max) {
  const random = (seed, max, min) => {
    max = max || 1;
    min = min || 0;
    seed = (seed * 9301 + 49297) % 233280;
    var rnd = seed / 233280;
    return min + rnd * (max - min);
  };

  let hash = index;
  for (let i = 0; i < host.length; i++) {
    hash = (hash << 5) - hash + host.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.floor(random(hash, min, max));
}

export function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
}
