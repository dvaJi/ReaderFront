export function releasesHasErrored(state = false, action) {
  switch (action.type) {
    case "RELEASES_HAS_ERRORED":
      return action.hasErrored;

    default:
      return state;
  }
}

export function releasesIsLoading(state = false, action) {
  switch (action.type) {
    case "RELEASES_IS_LOADING":
      return action.isLoading;

    default:
      return state;
  }
}

export function releasesPage(state = 0, action) {
  switch (action.type) {
    case "RELEASES_PAGE":
      return action.page;

    default:
      return state;
  }
}

export function chapters(state = [], action) {
  switch (action.type) {
    case "RELEASES_FETCH_DATA_SUCCESS":
      return action.page === 1 ? action.chapters : state.concat(action.chapters);

    default:
      return state;
  }
}
