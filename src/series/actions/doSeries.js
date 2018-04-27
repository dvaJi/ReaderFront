import * as config from "../../config";

export function seriesHasErrored(bool) {
  return {
    type: "SERIES_HAS_ERRORED",
    hasErrored: bool
  };
}

export function seriesIsLoading(bool) {
  return {
    type: "SERIES_IS_LOADING",
    isLoading: bool
  };
}

export function seriesFilterText(text) {
  return {
    type: "SERIES_FILTER_TEXT",
    filterText: text
  };
}

export function seriesFetchDataSuccess(series) {
  return {
    type: "SERIES_FETCH_DATA_SUCCESS",
    series
  };
}

export function fetchSeries(lang) {
  return dispatch => {
    dispatch(seriesIsLoading(true));

    if (lang === undefined || lang === null) {
      dispatch(seriesHasErrored(true));
      throw Error("Lang is undefined");
    }

    fetch(
      `${config.READER_PATH}v2/comics?lang=${
        lang
      }&orderby=asc_name&per_page=120`
    )
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(seriesIsLoading(false));

        return response;
      })
      .then(response => response.json())
      .then(series => dispatch(seriesFetchDataSuccess(series)))
      .catch(() => dispatch(seriesHasErrored(true)));
  };
}
