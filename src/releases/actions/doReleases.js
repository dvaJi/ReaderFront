import axios from 'axios';
import * as config from '../../config';
import { queryBuilder } from '../../utils/helpers';

export function releasesPage(page) {
  return {
    type: 'RELEASES_PAGE',
    page: page
  };
}

export function releasesHasErrored(bool) {
  return {
    type: 'RELEASES_HAS_ERRORED',
    hasErrored: bool
  };
}

export function releasesIsLoading(bool) {
  return {
    type: 'RELEASES_IS_LOADING',
    isLoading: bool
  };
}

export function releasesFetchDataSuccess(chapters, page) {
  return {
    type: 'RELEASES_FETCH_DATA_SUCCESS',
    chapters,
    page
  };
}

export function fetchReleases(lang, page, perPage = 12, sort = 'DESC') {
  return dispatch => {
    dispatch(releasesIsLoading(true));

    if (lang === undefined || lang === null) {
      dispatch(releasesHasErrored(true));
      throw Error('Lang is undefined');
    } else if (page === undefined || page === null) {
      dispatch(releasesHasErrored(true));
      throw Error('Page is undefined');
    }

    axios
      .post(
        config.READER_PATH,
        queryBuilder({
          type: 'query',
          operation: 'chapters',
          data: { language: lang, orderBy: sort, first: perPage, offset: page },
          fields: [
            'id',
            'work {id, stub, name}',
            'chapter',
            'subchapter',
            'volume',
            'pages {id, filename, height, width},',
            'language',
            'name',
            'stub',
            'uniqid',
            'description',
            'createdAt'
          ]
        })
      )
      .then(response => {
        if (response.statusText !== 'OK') {
          throw Error(response.statusText);
        }

        return response.data.data.chapters;
      })
      .then(chapters => dispatch(releasesFetchDataSuccess(chapters, page)))
      .then(() => dispatch(releasesIsLoading(false)))
      .catch(err => {
        console.log(err);
        dispatch(releasesHasErrored(true));
      });
  };
}
