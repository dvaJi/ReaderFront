export function workHasErrored(state = false, action) {
  switch (action.type) {
    case "WORK_HAS_ERRORED":
      return action.hasErrored;

    default:
      return state;
  }
}

export function workIsLoading(state = true, action) {
  switch (action.type) {
    case "WORK_IS_LOADING":
      return action.isLoading;

    default:
      return state;
  }
}

export function workRandomIsLoading(state = true, action) {
  switch (action.type) {
    case "WORK_RANDOM_IS_LOADING":
      return action.isLoading;

    default:
      return state;
  }
}

export function work(state = null, action) {
  switch (action.type) {
    case "WORK_FETCH_DATA_SUCCESS":
      return action.work;

    default:
      return state;
  }
}

export function randomWork(state = null, action) {
  switch (action.type) {
    case "RANDOM_WORK_FETCH_DATA_SUCCESS":
      return action.work;

    default:
      return state;
  }
}