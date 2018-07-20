import axios from 'axios';
import * as config from '../../config';
import params from '../../params.json';
import { queryBuilder } from '../../utils/helpers';
import { normalizeWork } from '../../utils/normalizeWork';

export function workHasErrored(bool) {
  return {
    type: 'WORK_HAS_ERRORED',
    hasErrored: bool
  };
}

export function workIsLoading(bool) {
  return {
    type: 'WORK_IS_LOADING',
    isLoading: bool
  };
}

export function workRandomIsLoading(bool) {
  return {
    type: 'WORK_RANDOM_IS_LOADING',
    isLoading: bool
  };
}

export function workFetchDataSuccess(work) {
  return {
    type: 'WORK_FETCH_DATA_SUCCESS',
    work
  };
}

export function randomWorkFetchDataSuccess(work) {
  return {
    type: 'RANDOM_WORK_FETCH_DATA_SUCCESS',
    work
  };
}

export function fetchWork(lang, stub) {
  return dispatch => {
    dispatch(workIsLoading(true));

    if (stub === undefined || stub === null) {
      dispatch(workHasErrored(true));
      throw Error('Stub is undefined');
    }

    return axios
      .post(
        config.READER_PATH,
        queryBuilder({
          type: 'query',
          operation: 'work',
          data: { language: params.global.languages[lang].id, stub },
          fields: [
            'id',
            'name',
            'stub',
            'uniqid',
            'type',
            'demographicId',
            'status',
            'statusReason',
            'visits',
            'adult',
            'createdAt',
            'chapters { id,chapter,subchapter,volume,language,name,stub,uniqid,thumbnail }',
            'works_covers { filename, coverTypeId, height, width }',
            'works_descriptions {description, language}',
            'people_works { rol, people {id,name,name_kanji,thumbnail,stub,uniqid,description} }',
            'works_genres { genreId }'
          ]
        })
      )
      .then(response => {
        if (response.statusText !== 'OK') {
          throw Error(response.statusText);
        }

        return response.data.data.work;
      })
      .then(work => normalizeWork(work))
      .then(work => dispatch(workFetchDataSuccess(work)))
      .then(() => dispatch(workIsLoading(false)))
      .catch(() => dispatch(workHasErrored(true)));
  };
}

export function fetchRandomWork(lang) {
  return dispatch => {
    dispatch(workRandomIsLoading(true));

    return axios
      .post(
        config.READER_PATH,
        queryBuilder({
          type: 'query',
          operation: 'workRandom',
          data: { language: params.global.languages[lang].id },
          fields: [
            'id',
            'name',
            'stub',
            'uniqid',
            'type',
            'demographicId',
            'status',
            'statusReason',
            'visits',
            'adult',
            'works_covers { filename, coverTypeId, height, width }',
            'works_descriptions {description, language}',
            'works_genres { genreId }'
          ]
        })
      )
      .then(response => {
        if (response.statusText !== 'OK') {
          throw Error(response.statusText);
        }

        return response.data.data.workRandom;
      })
      .then(work => normalizeWork(work))
      .then(work => dispatch(randomWorkFetchDataSuccess(work)))
      .then(() => dispatch(workRandomIsLoading(false)))
      .catch(error => dispatch(workHasErrored(true)));
  };
}
