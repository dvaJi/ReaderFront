export function isAuthRoute(location: any) {
  if (location === null || location.pathname === null) {
    return false;
  }

  if (location.pathname.startsWith("/auth", 0)) {
    return true;
  }

  return false;
}

export function isAdminRoute(location: any) {
  if (location === null || location.pathname === null) {
    return false;
  }

  if (location.pathname.startsWith("/admin", 0)) {
    return true;
  }

  return false;
}

export function isReaderRoute(location: any) {
  if (location === null || location.pathname === null) {
    return false;
  }

  if (location.pathname.startsWith("/read", 0)) {
    return true;
  }

  return false;
}

export function subString(string: string) {
  var length =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (typeof string !== "string") {
    return "";
  }

  return string.length > length
    ? "".concat(string.substr(0, length), "...")
    : string;
}

export function duplicate(object: any) {
  return Object.assign({}, object);
}

export function nullToEmptyString(value?: string) {
  return value === null ? "" : value;
}

export function nullToZero(value?: number) {
  return value === null ? 0 : value;
}

export function plural(value?: number) {
  return value === 1 ? "" : "s";
}

export function isEmpty(obj: any) {
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
