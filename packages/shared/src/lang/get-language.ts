export function getDefaultLanguage(languagesAllowed: string[]) {
  if (languagesAllowed.length === 1) {
    if (localStorage.getItem("rf_language") !== languagesAllowed[0]) {
      localStorage.setItem("rf_language", languagesAllowed[0]);
    }

    return languagesAllowed[0];
  }

  var navigatorLang =
    (navigator as any).browserLanguage ||
    navigator.language ||
    (navigator as any).userLanguage;
  var localLang = window.localStorage.getItem("rf_language");
  var language = "";

  if (localLang) {
    language = localLang;
  } else {
    var navigatorValue = navigatorLang.split("-")[0];
    var isValidLanguage = !!languagesAllowed.find(function (lang) {
      return lang === navigatorValue;
    });
    language = isValidLanguage ? navigatorValue : "en";
  }

  if (localStorage.getItem("rf_language") !== language) {
    localStorage.setItem("rf_language", language);
  }

  return language;
}
