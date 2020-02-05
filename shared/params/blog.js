var blog = {
  categories: {
    chapter: {
      id: 1,
      name: 'chapter'
    },
    news: {
      id: 2,
      name: 'news'
    },
    tutorials: {
      id: 3,
      name: 'tutorials'
    },
    other: {
      id: 4,
      name: 'other'
    }
  },
  status: {
    publish: {
      id: 1,
      name: 'publish'
    },
    draft: {
      id: 2,
      name: 'draft'
    },
    trash: {
      id: 3,
      name: 'trash'
    }
  }
};

var get = function get(source) {
  return Object.keys(blog[source]).map(function(key) {
    return blog[source][key];
  });
};

exports.get = get;
exports.categories = blog.categories;
exports.status = blog.status;
