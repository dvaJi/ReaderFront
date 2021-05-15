type Item = {
  [name: string]: {
    id: number;
    name: string;
  };
};

type BlogProps = {
  categories: Item;
  status: Item;
  [prop: string]: Item;
};

const blog: BlogProps = {
  categories: {
    chapter: {
      id: 1,
      name: "chapter",
    },
    news: {
      id: 2,
      name: "news",
    },
    tutorials: {
      id: 3,
      name: "tutorials",
    },
    other: {
      id: 4,
      name: "other",
    },
  },
  status: {
    publish: {
      id: 1,
      name: "publish",
    },
    draft: {
      id: 2,
      name: "draft",
    },
    trash: {
      id: 3,
      name: "trash",
    },
  },
};

export function get(source: string) {
  return Object.keys(blog[source]).map(function (key) {
    return blog[source][key];
  });
}

export const categories = blog.categories;
export const status = blog.status;
