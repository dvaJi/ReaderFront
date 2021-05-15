type Options = {
  strictMode?: boolean;
};
export function parseUri(str?: string, opts?: Options) {
  if (!str) return undefined;

  opts = opts || {};

  var o = {
    key: [
      'source',
      'protocol',
      'authority',
      'userInfo',
      'user',
      'password',
      'host',
      'port',
      'relative',
      'path',
      'directory',
      'file',
      'query',
      'anchor'
    ],
    q: {
      name: 'queryKey',
      parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
      strict:
        /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
      loose:
        /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
  };

  var m = o.parser[opts.strictMode ? 'strict' : 'loose'].exec(str);
  var uri = {};
  var i = 14;

  while (i--) uri[o.key[i]] = m![i] || '';

  uri[o.q.name] = {};
  uri[o.key[12]].replace(o.q.parser, function (_, $1, $2) {
    if ($1) uri[o.q.name][$1] = $2;
  });

  return uri;
}
