export function post(state = null, action) {
  switch (action.type) {
    case 'BLOG_SELECT_POST':
      return action.post;

    default:
      return state;
  }
}

export function blogHasErrored(state = false, action) {
  switch (action.type) {
    case 'BLOG_HAS_ERRORED':
      return action.hasErrored;

    default:
      return state;
  }
}

export function blogIsLoading(state = true, action) {
  switch (action.type) {
    case 'BLOG_IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
}

export function blogPage(state = 0, action) {
  switch (action.type) {
    case 'BLOG_PAGE':
      return action.page;

    default:
      return state;
  }
}

export function posts(state = [], action) {
  switch (action.type) {
    case 'BLOG_FETCH_DATA_SUCCESS':
      if (action.posts.length === 0) {
        return state;
      }
      return state.page === 0 ? action.posts : state.concat(action.posts);

    default:
      return state;
  }
}
