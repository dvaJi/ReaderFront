exports.isAuthRoute = isAuthRoute;
exports.isAdminRoute = isAdminRoute;
exports.isReaderRoute = isReaderRoute;
exports.subString = subString;
exports.duplicate = duplicate;
exports.nullToEmptyString = nullToEmptyString;
exports.nullToZero = nullToZero;
exports.plural = plural;
exports.isEmpty = isEmpty;

function isAuthRoute(location) {
  if (location === null || location.pathname === null) {
    return false;
  }

  if (location.pathname.startsWith('/auth', 0)) {
    return true;
  }

  return false;
}

function isAdminRoute(location) {
  if (location === null || location.pathname === null) {
    return false;
  }

  if (location.pathname.startsWith('/admin', 0)) {
    return true;
  }

  return false;
}

function isReaderRoute(location) {
  if (location === null || location.pathname === null) {
    return false;
  }

  if (location.pathname.startsWith('/read', 0)) {
    return true;
  }

  return false;
}

function subString(string) {
  var length =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (typeof string !== 'string') {
    return '';
  }

  return string.length > length
    ? ''.concat(string.substr(0, length), '...')
    : string;
}

function duplicate(object) {
  return Object.assign({}, object);
}

function nullToEmptyString(value) {
  return value === null ? '' : value;
}

function nullToZero(value) {
  return value === null ? 0 : value;
}

function plural(value) {
  return value === 1 ? '' : 's';
}

function isEmpty(obj) {
  var name;

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
