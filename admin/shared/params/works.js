var works = {
  status: {
    on_going: {
      id: 1,
      name: 'on_going',
      background: '#17a2b8',
      color: '#fff'
    },
    completed: {
      id: 2,
      name: 'completed',
      background: '#28a745',
      color: '#fff'
    },
    dropped: {
      id: 3,
      name: 'dropped',
      background: '#f8f9fa',
      color: '#212529'
    }
  },
  roles: {
    author: {
      id: 1,
      name: 'author'
    },
    artist: {
      id: 2,
      name: 'artist'
    }
  },
  types: {
    manga: 'Manga',
    artbook: 'Artbook',
    doujinshi: 'Doujinshi',
    drama_cd: 'Drama CD',
    filipino: 'Filipino',
    indonesian: 'Indonesian',
    manhwa: 'Manhwa',
    manhua: 'Manhua',
    novel: 'Novel',
    oel: 'OEL',
    thai: 'Thai',
    vietnamese: 'Vietnamese'
  }
};

var get = function get(source) {
  return Object.keys(works[source]).map(function(key) {
    return works[source][key];
  });
};

exports.get = get;

var statusById = function statusById(id) {
  return works.status[
    Object.keys(works.status).find(function(key) {
      return works.status[key].id === id;
    })
  ];
};

exports.statusById = statusById;

var rolesById = function rolesById(id) {
  return works.roles[
    Object.keys(works.roles).find(function(key) {
      return works.roles[key].id === id;
    })
  ];
};

exports.rolesById = rolesById;
exports.status = works.status;
exports.types = works.types;
exports.roles = works.roles;
