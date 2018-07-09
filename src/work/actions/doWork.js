import axios from 'axios';
import * as config from '../../config';
import params from '../../params.json';
import { queryBuilder } from '../../utils/helpers';

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

    axios
      .post(
        config.READER_PATH,
        queryBuilder({
          type: 'query',
          operation: 'work',
          data: { language: lang, stub },
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
      .then(work => {
        // Get status key
        const status = Object.keys(params.works.status).find(
          st => params.works.status[st].id === work.status
        );

        // Get demographic key
        const demographic = Object.keys(params.genres.demographic).find(
          dm => params.genres.demographic[dm].id === work.demographicId
        );

        // get genres keys
        const genres = work.works_genres.map(wg => {
          return Object.keys(params.genres.types).find(
            dm => params.genres.types[dm].id === wg.genreId
          );
        });

        // get roles keys
        const pWorks = work.people_works.map(pw => {
          return {
            ...pw,
            rolText: Object.keys(params.works.roles).find(
              dm => params.works.roles[dm].id === pw.rol
            )
          };
        });

        // set a safest description
        const desc =
          work.works_descriptions.length === 0
            ? ''
            : work.works_descriptions[0].description;

        // set a covers obj
        const covers =
          work.works_covers.length === 0
            ? null
            : {
                small: work.works_covers.find(
                  c => c.coverTypeId === params.works.cover_type.small_thumb.id
                ),
                medium: work.works_covers.find(
                  c => c.coverTypeId === params.works.cover_type.medium_thumb.id
                ),
                large: work.works_covers.find(
                  c => c.coverTypeId === params.works.cover_type.large_thumb.id
                ),
                portrait: work.works_covers.find(
                  c => c.coverTypeId === params.works.cover_type.portrait.id
                )
              };
        // new work with new values
        const newWork = {
          ...work,
          statusLabel: status,
          demographic: demographic,
          works_genres: genres,
          people_works: pWorks,
          description: desc,
          covers: covers
        };
        return newWork;
      })
      .then(work => dispatch(workFetchDataSuccess(work)))
      .then(() => dispatch(workIsLoading(false)))
      .catch(() => dispatch(workHasErrored(true)));
  };
}

export function fetchRandomWork(lang) {
  return dispatch => {
    dispatch(workRandomIsLoading(true));

    axios
      .post(
        config.READER_PATH,
        queryBuilder({
          type: 'query',
          operation: 'workRandom',
          data: { language: lang },
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
      .then(work => {
        // set a safest description
        const desc =
          work.works_descriptions.length === 0
            ? ''
            : work.works_descriptions[0].description;

        // set a covers obj
        const covers =
          work.works_covers.length === 0
            ? null
            : {
                small: work.works_covers.find(
                  c => c.coverTypeId === params.works.cover_type.small_thumb.id
                ),
                medium: work.works_covers.find(
                  c => c.coverTypeId === params.works.cover_type.medium_thumb.id
                ),
                large: work.works_covers.find(
                  c => c.coverTypeId === params.works.cover_type.large_thumb.id
                ),
                portrait: work.works_covers.find(
                  c => c.coverTypeId === params.works.cover_type.portrait.id
                )
              };

        // new work with new values
        const newWork = {
          ...work,
          description: desc,
          covers: covers
        };

        return newWork;
      })
      .then(work => dispatch(randomWorkFetchDataSuccess(work)))
      .then(() => dispatch(workRandomIsLoading(false)))
      .catch(error => dispatch(workHasErrored(true)));
  };
}
