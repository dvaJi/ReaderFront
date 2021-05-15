type Item = {
  [name: string]: {
    id: number;
    name: string;
  };
};

type GlobalProps = {
  languages: Item;
  [prop: string]: Item;
};

const global: GlobalProps = {
  languages: {
    es: {
      id: 1,
      name: "es",
    },
    en: {
      id: 2,
      name: "en",
    },
  },
};

export function languageById(id: number) {
  if (id === null) {
    return { name: null };
  }

  const key =
    Object.keys(global.languages).find(function (key) {
      return global.languages[key].id === id;
    }) || "";
  return global.languages[key];
}

export function languagesAvailables() {
  var langs =
    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return Object.keys(global.languages)
    .map(function (key) {
      return global.languages[key];
    })
    .filter(function (lang) {
      return langs.includes(lang.name);
    });
}

export const languages = global.languages;
