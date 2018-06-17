export function serieHasErrored(state = false, action) {
  switch (action.type) {
    case "SERIE_HAS_ERRORED":
      return action.hasErrored;

    default:
      return state;
  }
}

export function serieIsLoading(state = true, action) {
  switch (action.type) {
    case "SERIE_IS_LOADING":
      return action.isLoading;

    default:
      return state;
  }
}

export function serieRandomIsLoading(state = true, action) {
  switch (action.type) {
    case "SERIE_RANDOM_IS_LOADING":
      return action.isLoading;

    default:
      return state;
  }
}

export function serie(state = null, action) {
  switch (action.type) {
    case "SERIE_FETCH_DATA_SUCCESS":
      return action.serie;

    default:
      return state;
  }
}

export function randomSerie(state = null, action) {
  switch (action.type) {
    case "RANDOM_SERIE_FETCH_DATA_SUCCESS":
      return action.serie;

    default:
      return state;
  }
}