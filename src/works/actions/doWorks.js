import axios from 'axios';
import * as config from '../../config';
import params from '../../params.json';
import { queryBuilder } from '../../utils/helpers';
import { normalizeWork } from '../../utils/normalizeWork';

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

export function fetchWorks(
  lang,
  sort = 'ASC',
  perPage = 120,
  sortBy = 'id',
  page = 0
) {
  return dispatch => {
    sort !== 'ASC' && sortBy === 'id'
      ? dispatch(latestWorksIsLoading(true))
      : dispatch(worksIsLoading(true));

    return axios
      .post(
        config.READER_PATH,
        queryBuilder({
          type: 'query',
          operation: 'works',
          data: {
            language: lang ? params.global.languages[lang].id : -1,
            orderBy: sort,
            sortBy: sortBy,
            first: perPage,
            offset: page
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
            'updatedAt',
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

        return response.data.data.works;
      })
      .then(works => works.map(work => normalizeWork(work)))
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
        dispatch(worksHasErrored(true));
      });
  };
}

export function worksAggregateSuccess(workAggregates) {
  return {
    type: 'WORKS_AGG',
    workAggregates
  };
}

export function getAggregates(lang, aggFunc = 'COUNT', column = 'id') {
  return dispatch => {
    return axios
      .post(
        config.READER_PATH,
        queryBuilder({
          type: 'query',
          operation: 'workAggregates',
          data: {
            language: lang ? params.global.languages[lang].id : -1,
            aggregate: aggFunc,
            aggregateColumn: column
          },
          fields: [aggFunc.toLowerCase()]
        })
      )
      .then(response => {
        if (response.statusText !== 'OK') {
          throw Error(response.statusText);
        }

        return response.data.data.workAggregates;
      })
      .then(works => dispatch(worksAggregateSuccess(works)))
      .catch(err => {
        console.error(err);
      });
  };
}
