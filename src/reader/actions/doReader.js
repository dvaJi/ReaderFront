import * as config from "../../config";

export function readerSelectChapter(chapter) {
  return {
    type: "READER_SELECT_CHAPTER",
    chapter: chapter
  };
}

export function readerHasErrored(bool) {
  return {
    type: "READER_HAS_ERRORED",
    hasErrored: bool
  };
}

export function readerIsLoading(bool) {
  return {
    type: "READER_IS_LOADING",
    isLoading: bool
  };
}

export function readerFetchDataSuccess(chapters) {
  return {
    type: "READER_FETCH_DATA_SUCCESS",
    chapters
  };
}

export function fetchChapters(lang, stub) {
  return dispatch => {
    dispatch(readerIsLoading(true));

    if (lang === undefined || lang === null) {
      dispatch(readerHasErrored(true));
      throw Error("Lang is undefined");
    } else if (stub === undefined || stub === null) {
      dispatch(readerHasErrored(true));
      throw Error("Stub is undefined");
    }

    fetch(
      `${config.READER_PATH}v2/chapters?stub=${stub}&lang=${lang}&per_page=100`
    )
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(readerIsLoading(false));

        return response;
      })
      .then(response => response.json())
      .then(chapters => dispatch(readerFetchDataSuccess(chapters)))
      .catch((err) => dispatch(readerHasErrored(true)));
  };
}
