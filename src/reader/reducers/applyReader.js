export function chapter(state = null, action) {
  switch (action.type) {
    case "READER_SELECT_CHAPTER":
      return action.chapter;

    default:
      return state;
  }
}

export function readerHasErrored(state = false, action) {
  switch (action.type) {
    case "READER_HAS_ERRORED":
      return action.hasErrored;

    default:
      return state;
  }
}

export function readerIsLoading(state = true, action) {
  switch (action.type) {
    case "READER_IS_LOADING":
      return action.isLoading;

    default:
      return state;
  }
}

export function chapters(state = [], action) {
  switch (action.type) {
    case "READER_FETCH_DATA_SUCCESS":
      return action.chapters;

    default:
      return state;
  }
}
