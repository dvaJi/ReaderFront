import * as config from "../../config";

export function blogSelectPost(post) {
  return {
    type: "BLOG_SELECT_POST",
    post: post
  };
}

export function blogPage(page) {
  return {
    type: "BLOG_PAGE",
    page: page
  };
}

export function blogHasErrored(bool) {
  return {
    type: "BLOG_HAS_ERRORED",
    hasErrored: bool
  };
}

export function blogIsLoading(bool) {
  return {
    type: "BLOG_IS_LOADING",
    isLoading: bool
  };
}

export function blogFetchDataSuccess(posts, page) {
  return {
    type: "BLOG_FETCH_DATA_SUCCESS",
    posts,
    page
  };
}

export function fetchPosts(lang, page) {
  return dispatch => {
    dispatch(blogIsLoading(true));

    if (lang === undefined || lang === null) {
      dispatch(blogHasErrored(true));
      throw Error("Lang is undefined");
    } else if (page === undefined || page === null) {
      dispatch(blogHasErrored(true));
      throw Error("Page is undefined");
    }

    fetch(`${config.BLOG_PATH}/posts?orderby=date&per_page=15&page=${page}`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(blogIsLoading(false));

        return response;
      })
      .then(response => response.json())
      .then(posts => dispatch(blogFetchDataSuccess(posts, page)))
      .catch(() => dispatch(blogHasErrored(true)));
  };
}
