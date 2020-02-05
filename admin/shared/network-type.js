/**
 * Get network type (limited compatibility: https://caniuse.com/#feat=netinfo)
 * @returns
 * 0 = fast, not supported or unknown (default)
 * 1 = medium (3G)
 * 2 = slow (2G)
 */
function networkType() {
  try {
    var connection =
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

exports.networkType = networkType;
