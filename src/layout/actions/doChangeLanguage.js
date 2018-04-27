export function doChangeLanguage(lang) {
  return {
    type: "REQUEST_CHANGE_LANGUAGE",
    language: lang
  };
}
