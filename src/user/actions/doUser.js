import axios from 'axios';
import cookie from 'js-cookie';

import * as config from '../../config';
import { queryBuilder } from '../../utils/helpers';

export function authIsLoading(bool) {
  return {
    type: 'AUTH/IS_LOADING',
    isLoading: bool
  };
}

export function authSetUser(user) {
  return {
    type: 'AUTH/SET_USER',
    user
  };
}

export function authError(error) {
  return {
    type: 'AUTH/ERROR',
    error
  };
}

export function authLogout() {
  return {
    type: 'AUTH/LOGOUT'
  };
}

// Actions

// Set a user after login or using localStorage token
export function setUser(token, user) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }

  return authSetUser(user);
}

// Login a user using credentials
export function login(userCredentials, isLoading = true) {
  return dispatch => {
    dispatch(authIsLoading(isLoading));

    return axios
      .post(
        config.READER_PATH,
        queryBuilder({
          type: 'query',
          operation: 'userLogin',
          data: userCredentials,
          fields: ['user {name, email, role}', 'token']
        })
      )
      .then(response => {
        let error = '';

        if (response.data.errors && response.data.errors.length > 0) {
          error = response.data.errors[0].message;
        } else if (response.data.data.userLogin.token !== '') {
          const token = response.data.data.userLogin.token;
          const user = response.data.data.userLogin.user;

          dispatch(setUser(token, user));

          loginSetUserLocalStorageAndCookie(token, user);
        }

        dispatch(authError(error));
      })
      .catch(error => {
        dispatch(authError('Please try again'));
      });
  };
}

// Set user token and info in localStorage and cookie
export function loginSetUserLocalStorageAndCookie(token, user) {
  // Update token
  window.localStorage.setItem('token', token);
  window.localStorage.setItem('user', JSON.stringify(user));

  // Set cookie for SSR
  cookie.set('auth', { token, user }, { path: '/' });
}

// Register a user
export function register(userDetails) {
  return dispatch => {
    return axios.post(
      config.READER_PATH,
      queryBuilder({
        type: 'mutation',
        operation: 'userSignup',
        data: userDetails,
        fields: ['id', 'name', 'email']
      })
    );
  };
}

// Activate account
export function activate(userDetails) {
  return dispatch => {
    return axios.post(
      config.READER_PATH,
      queryBuilder({
        type: 'mutation',
        operation: 'userActivate',
        data: userDetails,
        fields: ['email', 'activatedToken']
      })
    );
  };
}

// Log out user and remove token from localStorage
export function logout() {
  return dispatch => {
    logoutUnsetUserLocalStorageAndCookie();

    dispatch(authLogout());
  };
}

// Unset user token and info in localStorage and cookie
export function logoutUnsetUserLocalStorageAndCookie() {
  // Remove token
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('user');

  // Remove cookie
  cookie.remove('auth');
}

// Get user gender
export function getGenders() {
  return dispatch => {
    return axios.post(
      config.READER_PATH,
      queryBuilder({
        type: 'query',
        operation: 'userGenders',
        fields: ['id', 'name']
      })
    );
  };
}
