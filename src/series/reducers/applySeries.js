export function seriesHasErrored(state = false, action) {
  switch (action.type) {
    case "SERIES_HAS_ERRORED":
      return action.hasErrored;

    default:
      return state;
  }
}

export function seriesIsLoading(state = true, action) {
  switch (action.type) {
    case "SERIES_IS_LOADING":
      return action.isLoading;

    default:
      return state;
  }
}

export function latestSeriesIsLoading(state = true, action) {
  switch (action.type) {
    case "LATEST_SERIES_IS_LOADING":
      return action.isLoading;

    default:
      return state;
  }
}

export function seriesFilterText(state = "", action) {
  switch (action.type) {
    case "SERIES_FILTER_TEXT":
      return action.filterText;

    default:
      return state;
  }
}

export function series(state = [], action) {
  switch (action.type) {
    case "SERIES_FETCH_DATA_SUCCESS":
      return action.series;

    default:
      return state;
  }
}

export function latestSeries(state = [], action) {
  switch (action.type) {
    case "SERIES_CUSTOM_FETCH_DATA_SUCCESS":
      return action.series;

    default:
      return state;
  }
}