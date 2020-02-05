var global = {
  languages: {
    es: {
      id: 1,
      name: 'es'
    },
    en: {
      id: 2,
      name: 'en'
    }
  }
};

var languageById = function languageById(id) {
  return global.languages[
    Object.keys(global.languages).find(function(key) {
      return global.languages[key].id === id;
    })
  ];
};

exports.languageById = languageById;

var languagesAvailables = function languagesAvailables() {
  var langs =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return Object.keys(global.languages)
    .map(function(key) {
      return global.languages[key];
    })
    .filter(function(lang) {
      return langs.includes(lang.name);
    });
};

exports.languagesAvailables = languagesAvailables;
exports.languages = global.languages;
