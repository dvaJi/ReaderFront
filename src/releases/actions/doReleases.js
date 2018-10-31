import axios from 'axios';
import * as config from '../../config';
import params from '../../params.json';
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

export function fetchReleases(
  lang,
  page,
  perPage = 12,
  sort = 'DESC',
  showHidden = false
) {
  return dispatch => {
    dispatch(releasesIsLoading(true));

    if (lang === undefined || lang === null) {
      dispatch(releasesHasErrored(true));
      throw Error('Lang is undefined');
    } else if (page === undefined || page === null) {
      dispatch(releasesHasErrored(true));
      throw Error('Page is undefined');
    }

    return axios
      .post(
        config.READER_PATH,
        queryBuilder({
          type: 'query',
          operation: 'chapters',
          data: {
            language: params.global.languages[lang].id,
            orderBy: sort,
            first: perPage,
            offset: page,
            showHidden
          },
          fields: [
            'id',
            'work {id, stub, name, uniqid}',
            'chapter',
            'subchapter',
            'volume',
            'pages {id, filename, height, width},',
            'language',
            'name',
            'stub',
            'uniqid',
            'thumbnail',
            'releaseDate',
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
      .catch(err => dispatch(releasesHasErrored(true)));
  };
}

export function createOrUpdate(chapter) {
  if (chapter.id > 0) {
    delete chapter.createdAt;
    delete chapter.updatedAt;
    delete chapter.work;
    chapter.workId = parseInt(chapter.workId, 0);
    return update(chapter);
  } else {
    delete chapter.id;
    return create(chapter);
  }
}

export function create(chapter) {
  return dispatch => {
    return axios.post(
      config.READER_PATH,
      queryBuilder({
        type: 'mutation',
        operation: 'chapterCreate',
        data: chapter,
        fields: ['id']
      })
    );
  };
}

export function update(chapter) {
  return dispatch => {
    return axios.post(
      config.READER_PATH,
      queryBuilder({
        type: 'mutation',
        operation: 'chapterUpdate',
        data: chapter,
        fields: ['id']
      })
    );
  };
}

export function remove(data) {
  return dispatch => {
    return axios.post(
      config.READER_PATH,
      queryBuilder({
        type: 'mutation',
        operation: 'chapterRemove',
        data,
        fields: ['id']
      })
    );
  };
}

export function createOrUpdatePage(page) {
  if (page.id > 0) {
    return updatePage(page);
  } else {
    delete page.id;
    return createPage(page);
  }
}

export function createPage(page) {
  return dispatch => {
    return axios.post(
      config.READER_PATH,
      queryBuilder({
        type: 'mutation',
        operation: 'pageCreate',
        data: page,
        fields: ['id']
      })
    );
  };
}

export function updatePage(page) {
  return dispatch => {
    return axios.post(
      config.READER_PATH,
      queryBuilder({
        type: 'mutation',
        operation: 'pageUpdate',
        data: page,
        fields: ['id']
      })
    );
  };
}

export function removePage(data) {
  return dispatch => {
    return axios.post(
      config.READER_PATH,
      queryBuilder({
        type: 'mutation',
        operation: 'pageRemove',
        data,
        fields: ['id']
      })
    );
  };
}

export function updateDefaultPage(thumb) {
  return dispatch => {
    return axios.post(
      config.READER_PATH,
      queryBuilder({
        type: 'mutation',
        operation: 'chapterThumbUpdate',
        data: thumb,
        fields: ['id']
      })
    );
  };
}
