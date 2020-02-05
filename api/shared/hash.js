exports.hashCode = hashCode;
exports.hashToNum = hashToNum;

function hashCode(string) {
  if (!string) {
    return 0;
  }

  for (var index = 0, hash = 0; index < string.length; index++) {
    hash = (Math.imul(31, hash) + string.charCodeAt(index)) | 0;
  }

  return hash;
}

function hashToNum(host, index, min, max) {
  var random = function random(seed, max, min) {
    max = max || 1;
    min = min || 0;
    seed = (seed * 9301 + 49297) % 233280;
    var rnd = seed / 233280;
    return min + rnd * (max - min);
  };

  var hash = index;

  for (var i = 0; i < host.length; i++) {
    hash = (hash << 5) - hash + host.charCodeAt(i);
    hash = hash & hash;
  }

  return Math.floor(random(hash, min, max));
}
