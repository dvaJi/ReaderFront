/**
 * It will return an slugify version of the text given
 * Example: Star Wars: Episode VIII - The Last Jedi -> star_wars_episode_viii_the_last_jedi
 * @param {string} text - Text to slugify
 * @return {string} - Returns a Promise with undefined value.
 */
var sets = [
  {
    to: "a",
    from: "[ÀÁÂÃÄÅÆĀĂĄẠẢẤẦẨẪẬẮẰẲẴẶ]",
  },
  {
    to: "c",
    from: "[ÇĆĈČ]",
  },
  {
    to: "d",
    from: "[ÐĎĐÞ]",
  },
  {
    to: "e",
    from: "[ÈÉÊËĒĔĖĘĚẸẺẼẾỀỂỄỆ]",
  },
  {
    to: "g",
    from: "[ĜĞĢǴ]",
  },
  {
    to: "h",
    from: "[ĤḦ]",
  },
  {
    to: "i",
    from: "[ÌÍÎÏĨĪĮİỈỊ]",
  },
  {
    to: "j",
    from: "[Ĵ]",
  },
  {
    to: "ij",
    from: "[Ĳ]",
  },
  {
    to: "k",
    from: "[Ķ]",
  },
  {
    to: "l",
    from: "[ĹĻĽŁ]",
  },
  {
    to: "m",
    from: "[Ḿ]",
  },
  {
    to: "n",
    from: "[ÑŃŅŇ]",
  },
  {
    to: "o",
    from: "[ÒÓÔÕÖØŌŎŐỌỎỐỒỔỖỘỚỜỞỠỢǪǬƠ]",
  },
  {
    to: "oe",
    from: "[Œ]",
  },
  {
    to: "p",
    from: "[ṕ]",
  },
  {
    to: "r",
    from: "[ŔŖŘ]",
  },
  {
    to: "s",
    from: "[ßŚŜŞŠ]",
  },
  {
    to: "t",
    from: "[ŢŤ]",
  },
  {
    to: "u",
    from: "[ÙÚÛÜŨŪŬŮŰŲỤỦỨỪỬỮỰƯμ]",
  },
  {
    to: "w",
    from: "[ẂŴẀẄ]",
  },
  {
    to: "x",
    from: "[ẍ]",
  },
  {
    to: "y",
    from: "[ÝŶŸỲỴỶỸ]",
  },
  {
    to: "z",
    from: "[ŹŻŽ]",
  },
  {
    to: "-",
    from: "[·/_,:;']",
  },
];
var whiteSpaces = /\s+/g;
var ampersand = /&/g;
var nonWordsAndNumbers = /[^a-zA-Z0-9_]/g;
var nonWordsAndNumbersDot = /[^a-zA-Z0-9._]/g;
var replaceMultipleUnderscore = /\__+/g; // eslint-disable-line no-useless-escape

export const slugify = (text: string, preserveDots = false) => {
  if (text === null || text === undefined) {
    return "";
  }

  var slugText = text; // Replace all characters from our set

  sets.forEach(function (set) {
    slugText = slugText.replace(new RegExp(set.from, "gi"), set.to);
  });
  return slugText
    .toString()
    .toLowerCase()
    .replace(whiteSpaces, "_")
    .replace(ampersand, "-and-")
    .replace(preserveDots ? nonWordsAndNumbersDot : nonWordsAndNumbers, "")
    .replace(replaceMultipleUnderscore, "_")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};
