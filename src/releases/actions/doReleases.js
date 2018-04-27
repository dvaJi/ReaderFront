import * as config from "../../config";

export function releasesPage(page) {
  return {
    type: "RELEASES_PAGE",
    page: page
  }
}

export function releasesHasErrored(bool) {
  return {
    type: "RELEASES_HAS_ERRORED",
    hasErrored: bool
  };
}

export function releasesIsLoading(bool) {
  return {
    type: "RELEASES_IS_LOADING",
    isLoading: bool
  };
}

export function releasesFetchDataSuccess(chapters, page) {
  return {
    type: "RELEASES_FETCH_DATA_SUCCESS",
    chapters,
    page
  };
}

export function fetchReleases(lang, page) {
  return dispatch => {
    dispatch(releasesIsLoading(true));

    if (lang === undefined || lang === null) {
      dispatch(releasesHasErrored(true));
      throw Error("Lang is undefined");
    } else if (page === undefined || page === null) {
      dispatch(releasesHasErrored(true));
      throw Error("Page is undefined");
    }

    fetch(
      `${
        config.READER_PATH
      }v2/releases?lang=${lang}&orderby=desc_created&page=${page}`
    )
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(releasesIsLoading(false));

        return response;
      })
      .then(response => response.json())
      .then(chapters => dispatch(releasesFetchDataSuccess(chapters, page)))
      .catch(() => dispatch(releasesHasErrored(true)));
  };
}
