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

export function latestSeriesIsLoading(bool) {
  return {
    type: "LATEST_SERIES_IS_LOADING",
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

export function seriesCustomDataSuccess(series) {
  return {
    type: "SERIES_CUSTOM_FETCH_DATA_SUCCESS",
    series
  };
}

export function fetchSeries(lang, sort = "asc_name", perPage = 120) {
  return dispatch => {
    sort !== "asc_name"
      ? dispatch(latestSeriesIsLoading(true))
      : dispatch(seriesIsLoading(true));

    if (lang === undefined || lang === null) {
      dispatch(seriesHasErrored(true));
      throw Error("Lang is undefined");
    }

    fetch(
      `${
        config.READER_PATH
      }v2/comics?lang=${lang}&orderby=${sort}&per_page=${perPage}`
    )
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response;
      })
      .then(response => response.json())
      .then(
        series =>
          sort !== "asc_name"
            ? dispatch(seriesCustomDataSuccess(series))
            : dispatch(seriesFetchDataSuccess(series))
      )
      .then(
        () =>
          sort !== "asc_name"
            ? dispatch(latestSeriesIsLoading(false))
            : dispatch(seriesIsLoading(false))
      )
      .catch(() => dispatch(seriesHasErrored(true)));
  };
}
