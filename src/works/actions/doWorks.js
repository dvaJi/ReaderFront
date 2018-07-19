import axios from 'axios';
import * as config from '../../config';
import params from '../../params.json';
import { queryBuilder } from '../../utils/helpers';
import { normalizeCovers } from '../../utils/common';

export function worksHasErrored(bool) {
  return {
    type: 'WORKS_HAS_ERRORED',
    hasErrored: bool
  };
}

export function worksIsLoading(bool) {
  return {
    type: 'WORKS_IS_LOADING',
    isLoading: bool
  };
}

export function latestWorksIsLoading(bool) {
  return {
    type: 'LATEST_WORKS_IS_LOADING',
    isLoading: bool
  };
}

export function worksFilterText(text) {
  return {
    type: 'WORKS_FILTER_TEXT',
    filterText: text
  };
}

export function worksFetchDataSuccess(works) {
  return {
    type: 'WORKS_FETCH_DATA_SUCCESS',
    works
  };
}

export function worksCustomDataSuccess(works) {
  return {
    type: 'WORKS_CUSTOM_FETCH_DATA_SUCCESS',
    works
  };
}

export function fetchWorks(lang, sort = 'ASC', perPage = 120) {
  return dispatch => {
    sort !== 'ASC'
      ? dispatch(latestWorksIsLoading(true))
      : dispatch(worksIsLoading(true));

    if (lang === undefined || lang === null) {
      dispatch(worksHasErrored(true));
      throw Error('Lang is undefined');
    }

    axios
      .post(
        config.READER_PATH,
        queryBuilder({
          type: 'query',
          operation: 'works',
          data: {
            language: params.global.languages[lang].id,
            orderBy: sort,
            first: perPage
          },
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
            'works_covers { filename, coverTypeId, height, width }',
            'works_descriptions {description}',
            'people_works { rol, people {id,name,name_kanji,thumbnail,stub,uniqid,description} }',
            'works_genres { genreId }'
          ]
        })
      )
      .then(response => {
        if (response.statusText !== 'OK') {
          throw Error(response.statusText);
        }

        return response.data.data.works;
      })
      .then(works =>
        works.map(work => {
          const status = Object.keys(params.works.status).find(
            st => params.works.status[st].id === work.status
          );

          const demographic = Object.keys(params.genres.demographic).find(
            dm => params.genres.demographic[dm].id === work.demographicId
          );

          const genres = work.works_genres.map(wg => {
            return Object.keys(params.genres.types).find(
              dm => params.genres.types[dm].id === wg.genreId
            );
          });

          // set a safest description
          const desc =
            work.works_descriptions.length === 0
              ? ''
              : work.works_descriptions[0].description;

          // set a covers obj
          const covers = normalizeCovers(work);

          const newWork = {
            ...work,
            statusLabel: status,
            demographic: demographic,
            works_genres: genres,
            description: desc,
            covers: covers
          };
          return newWork;
        })
      )
      .then(
        works =>
          sort !== 'ASC'
            ? dispatch(worksCustomDataSuccess(works))
            : dispatch(worksFetchDataSuccess(works))
      )
      .then(
        () =>
          sort !== 'ASC'
            ? dispatch(latestWorksIsLoading(false))
            : dispatch(worksIsLoading(false))
      )
      .catch(err => {
        console.error(err);
        dispatch(worksHasErrored(true));
      });
  };
}
