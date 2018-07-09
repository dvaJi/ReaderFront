import axios from 'axios';
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

export function fetchChapters(lang, stub) {
  return dispatch => {
    dispatch(readerIsLoading(true));

    if (lang === undefined || lang === null) {
      dispatch(readerHasErrored(true));
      throw Error('Lang is undefined');
    } else if (stub === undefined || stub === null) {
      dispatch(readerHasErrored(true));
      throw Error('Stub is undefined');
    }

    axios
      .post(
        config.READER_PATH,
        queryBuilder({
          type: 'query',
          operation: 'chaptersByWork',
          data: { language: lang, workStub: stub },
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

        return response.data.data.chaptersByWork;
      })
      .then(chapters =>
        chapters.sort((a, b) => Number(a.chapter) - Number(b.chapter))
      )
      .then(chapters => dispatch(readerFetchDataSuccess(chapters)))
      .then(() => dispatch(readerIsLoading(false)))
      .catch(err => dispatch(readerHasErrored(true)));
  };
}
