import axios from 'axios';
import params from '../../params.json';
import * as config from '../../config';
import { queryBuilder } from '../../utils/helpers';

export function readerSelectChapter(chapter) {
  return {
    type: 'READER_SELECT_CHAPTER',
    chapter: chapter
  };
}

export function readerHasErrored(bool) {
  return {
    type: 'READER_HAS_ERRORED',
    hasErrored: bool
  };
}

export function readerIsLoading(bool) {
  return {
    type: 'READER_IS_LOADING',
    isLoading: bool
  };
}

export function readerFetchDataSuccess(chapters) {
  return {
    type: 'READER_FETCH_DATA_SUCCESS',
    chapters
  };
}

export function fetchChapters(lang, stub, showHidden = false) {
  return dispatch => {
    dispatch(readerIsLoading(true));

    if (stub === undefined || stub === null) {
      dispatch(readerHasErrored(true));
      throw Error('Stub is undefined');
    }

    return axios
      .post(
        config.READER_PATH,
        queryBuilder({
          type: 'query',
          operation: 'chaptersByWork',
          data: {
            language: lang ? params.global.languages[lang].id : -1,
            workStub: stub,
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
            'description',
            'releaseDate',
            'createdAt',
            'updatedAt'
          ]
        })
      )
      .then(response => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }

        return response.data.data.chaptersByWork;
      })
      .then(chapters =>
        chapters.sort((a, b) => Number(a.chapter) - Number(b.chapter))
      )
      .then(chapters => dispatch(readerFetchDataSuccess(chapters)))
      .then(() => dispatch(readerIsLoading(false)))
      .catch(err => {
        console.error(err);
        dispatch(readerHasErrored(true));
      });
  };
}

export function fetchChapter(chapterId, showHidden = false) {
  return dispatch => {
    if (chapterId === undefined || chapterId === null) {
      dispatch(readerHasErrored(true));
      throw Error('chapterId is undefined');
    }

    return axios
      .post(
        config.READER_PATH,
        queryBuilder({
          type: 'query',
          operation: 'chapterById',
          data: {
            id: parseInt(chapterId, 0),
            showHidden
          },
          fields: [
            'id',
            'work {id, stub, name, uniqid}',
            'chapter',
            'subchapter',
            'volume',
            'pages {id, filename, height, width, size},',
            'language',
            'name',
            'stub',
            'uniqid',
            'description',
            'thumbnail',
            'releaseDate',
            'createdAt',
            'updatedAt'
          ]
        })
      )
      .then(response => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }

        return response.data.data.chapterById;
      })
      .then(chapter => dispatch(readerSelectChapter(chapter)))
      .catch(err => dispatch(readerHasErrored(true)));
  };
}
