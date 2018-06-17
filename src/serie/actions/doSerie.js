import * as config from "../../config";

export function serieHasErrored(bool) {
  return {
    type: "SERIE_HAS_ERRORED",
    hasErrored: bool
  };
}

export function serieIsLoading(bool) {
  return {
    type: "SERIE_IS_LOADING",
    isLoading: bool
  };
}

export function serieRandomIsLoading(bool) {
  return {
    type: "SERIE_RANDOM_IS_LOADING",
    isLoading: bool
  };
}

export function serieFetchDataSuccess(serie) {
  return {
    type: "SERIE_FETCH_DATA_SUCCESS",
    serie
  };
}

export function randomSerieFetchDataSuccess(serie) {
  return {
    type: "RANDOM_SERIE_FETCH_DATA_SUCCESS",
    serie
  };
}

export function fetchSerie(stub) {
  return dispatch => {
    dispatch(serieIsLoading(true));

    if (stub === undefined || stub === null) {
      dispatch(serieHasErrored(true));
      throw Error("Stub is undefined");
    }

    fetch(
      `${
        config.READER_PATH
      }v2/comic?stub=${stub}`
    )
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(serieIsLoading(false));

        return response;
      })
      .then(response => response.json())
      .then(serie => dispatch(serieFetchDataSuccess(serie)))
      .catch(() => dispatch(serieHasErrored(true)));
  };
}

export function fetchRandomSerie(lang) {
  return dispatch => {

    dispatch(serieRandomIsLoading(true));

    fetch(
      `${
        config.READER_PATH
      }v2/random_comic?lang=${lang}`
    )
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response;
      })
      .then(response => response.json())
      .then(serie => dispatch(randomSerieFetchDataSuccess(serie)))
      .then(() => dispatch(serieRandomIsLoading(false)))
      .catch((error) => dispatch(serieHasErrored(true)));
  };
}
