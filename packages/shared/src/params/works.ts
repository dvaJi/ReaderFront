type Item = {
  [name: string]: {
    id: number;
    name: string;
  };
};

type StatusItem = {
  [name: string]: {
    id: number;
    name: string;
    background: string;
    color: string;
  };
};

type WorksProps = {
  status: StatusItem;
  roles: Item;
  types: { [name: string]: string };
  [prop: string]: any;
};

const works: WorksProps = {
  status: {
    on_going: {
      id: 1,
      name: "on_going",
      background: "#17a2b8",
      color: "#fff",
    },
    completed: {
      id: 2,
      name: "completed",
      background: "#28a745",
      color: "#fff",
    },
    dropped: {
      id: 3,
      name: "dropped",
      background: "#f8f9fa",
      color: "#212529",
    },
  },
  roles: {
    author: {
      id: 1,
      name: "author",
    },
    artist: {
      id: 2,
      name: "artist",
    },
  },
  types: {
    manga: "Manga",
    artbook: "Artbook",
    doujinshi: "Doujinshi",
    drama_cd: "Drama CD",
    filipino: "Filipino",
    indonesian: "Indonesian",
    manhwa: "Manhwa",
    manhua: "Manhua",
    novel: "Novel",
    oel: "OEL",
    thai: "Thai",
    vietnamese: "Vietnamese",
  },
};

export function get(source: string) {
  return Object.keys(works[source]).map(function (key) {
    return works[source][key];
  });
}

export function statusById(id: number) {
  const key =
    Object.keys(works.status).find(function (key) {
      return works.status[key].id === id;
    }) || "";
  return works.status[key];
}

export function rolesById(id: number) {
  const key =
    Object.keys(works.roles).find(function (key) {
      return works.roles[key].id === id;
    }) || "";
  return works.roles[key];
}

export const status = works.status;
export const types = works.types;
export const roles = works.roles;
