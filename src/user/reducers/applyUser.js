import { isEmpty } from '../../utils/helpers';

export const userInitialState = {
  error: null,
  isLoading: false,
  isAuthenticated: false,
  details: null
};

export default (state = userInitialState, action) => {
  switch (action.type) {
    case 'AUTH/SET_USER':
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        details: action.user
      };

    case 'AUTH/IS_LOADING':
      return {
        ...state,
        error: null,
        isLoading: action.isLoading
      };

    case 'AUTH/ERROR':
      return {
        ...state,
        error: action.error,
        isLoading: false
      };

    case 'AUTH/LOGOUT':
      return {
        ...state,
        error: null,
        isLoading: false,
        isAuthenticated: false,
        details: null
      };

    default:
      return state;
  }
};
