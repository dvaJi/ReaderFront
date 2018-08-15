export function worksHasErrored(state = false, action) {
  switch (action.type) {
    case "WORKS_HAS_ERRORED":
      return action.hasErrored;

    default:
      return state;
  }
}

export function worksIsLoading(state = true, action) {
  switch (action.type) {
    case "WORKS_IS_LOADING":
      return action.isLoading;

    default:
      return state;
  }
}

export function latestWorksIsLoading(state = true, action) {
  switch (action.type) {
    case "LATEST_WORKS_IS_LOADING":
      return action.isLoading;

    default:
      return state;
  }
}

export function worksFilterText(state = "", action) {
  switch (action.type) {
    case "WORKS_FILTER_TEXT":
      return action.filterText;

    default:
      return state;
  }
}

export function works(state = [], action) {
  switch (action.type) {
    case "WORKS_FETCH_DATA_SUCCESS":
      return action.works;

    default:
      return state;
  }
}

export function latestWorks(state = [], action) {
  switch (action.type) {
    case "WORKS_CUSTOM_FETCH_DATA_SUCCESS":
      return action.works;

    default:
      return state;
  }
}

export function aggregates(state = {}, action) {
  switch (action.type) {
    case "WORKS_AGG":
      return action.workAggregates;

    default:
      return state;
  }
}
