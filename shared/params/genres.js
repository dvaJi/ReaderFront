var genres = {
  demographic: {
    josei: {
      id: 1,
      name: 'Josei'
    },
    lolicon: {
      id: 2,
      name: 'Lolicon'
    },
    seinen: {
      id: 3,
      name: 'Seinen'
    },
    shotacon: {
      id: 4,
      name: 'Shotacon'
    },
    shoujo: {
      id: 5,
      name: 'Shoujo'
    },
    shoujo_ai: {
      id: 6,
      name: 'Shoujo Ai'
    },
    shounen: {
      id: 7,
      name: 'Shounen'
    },
    shounen_ai: {
      id: 8,
      name: 'Shounen Ai'
    },
    yaoi: {
      id: 9,
      name: 'Yaoi'
    },
    yuri: {
      id: 10,
      name: 'Yuri'
    }
  },
  types: {
    action: {
      id: 1,
      name: 'action'
    },
    adult: {
      id: 2,
      name: 'adult'
    },
    adventure: {
      id: 3,
      name: 'adventure'
    },
    comedy: {
      id: 4,
      name: 'comedy'
    },
    doujinshi: {
      id: 5,
      name: 'doujinshi'
    },
    drama: {
      id: 6,
      name: 'drama'
    },
    ecchi: {
      id: 7,
      name: 'ecchi'
    },
    fantasy: {
      id: 8,
      name: 'fantasy'
    },
    gender_bender: {
      id: 9,
      name: 'gender_bender'
    },
    harem: {
      id: 10,
      name: 'harem'
    },
    hentai: {
      id: 11,
      name: 'hentai'
    },
    historical: {
      id: 12,
      name: 'historical'
    },
    horror: {
      id: 13,
      name: 'horror'
    },
    martial_arts: {
      id: 14,
      name: 'martial_arts'
    },
    mature: {
      id: 15,
      name: 'mature'
    },
    mecha: {
      id: 16,
      name: 'mecha'
    },
    mystery: {
      id: 17,
      name: 'mystery'
    },
    psychological: {
      id: 18,
      name: 'psychological'
    },
    romance: {
      id: 19,
      name: 'romance'
    },
    school_life: {
      id: 20,
      name: 'school_life'
    },
    sci_fi: {
      id: 21,
      name: 'sci_fi'
    },
    slice_of_life: {
      id: 22,
      name: 'slice_of_life'
    },
    smut: {
      id: 23,
      name: 'smut'
    },
    sports: {
      id: 24,
      name: 'sports'
    },
    supernatural: {
      id: 25,
      name: 'supernatural'
    },
    tragedy: {
      id: 26,
      name: 'tragedy'
    }
  }
};

var get = function get(source) {
  return Object.keys(genres[source]).map(function(key) {
    return genres[source][key];
  });
};

exports.get = get;

var demographicById = function demographicById(id) {
  return genres.demographic[
    Object.keys(genres.demographic).find(function(key) {
      return genres.demographic[key].id === id;
    })
  ];
};

exports.demographicById = demographicById;

var typesById = function typesById(id) {
  return genres.types[
    Object.keys(genres.types).find(function(key) {
      return genres.types[key].id === id;
    })
  ];
};

exports.typesById = typesById;
exports.demographic = genres.demographic;
exports.types = genres.types;
