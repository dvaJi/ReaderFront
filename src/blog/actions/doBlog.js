import axios from 'axios';
import * as config from '../../config';
import params from '../../params.json';
import { queryBuilder } from '../../utils/helpers';
import { normalizePost } from '../../utils/normalizeBlog';

export function blogSelectPost(post) {
  return {
    type: 'BLOG_SELECT_POST',
    post: post
  };
}

export function blogPage(page) {
  return {
    type: 'BLOG_PAGE',
    page: page
  };
}

export function blogHasErrored(bool) {
  return {
    type: 'BLOG_HAS_ERRORED',
    hasErrored: bool
  };
}

export function blogIsLoading(bool) {
  return {
    type: 'BLOG_IS_LOADING',
    isLoading: bool
  };
}

export function blogFetchDataSuccess(posts, page) {
  return {
    type: 'BLOG_FETCH_DATA_SUCCESS',
    posts,
    page
  };
}

export function fetchPosts(
  lang,
  sort = 'ASC',
  perPage = 120,
  sortBy = 'id',
  page = 0
) {
  return dispatch => {
    dispatch(blogIsLoading(true));

    return axios
      .post(
        config.READER_PATH,
        queryBuilder({
          type: 'query',
          operation: 'posts',
          data: {
            language: lang ? params.global.languages[lang].id : -1,
            orderBy: sort,
            sortBy: sortBy,
            first: perPage,
            offset: page
          },
          fields: [
            'id',
            'uniqid',
            'type',
            'title',
            'stub',
            'content',
            'user { id,name,role }',
            'category',
            'status',
            'sticky',
            'language',
            'thumbnail',
            'createdAt',
            'updatedAt'
          ]
        })
      )
      .then(response => {
        if (response.statusText !== 'OK') {
          throw Error(response.statusText);
        }

        return response.data.data.posts;
      })
      .then(posts => posts.map(post => normalizePost(post)))
      .then(posts => dispatch(blogFetchDataSuccess(posts, page)))
      .then(() => dispatch(blogIsLoading(false)))
      .catch(err => dispatch(blogHasErrored(true)));
  };
}

export function fetchPost(stub) {
  return dispatch => {
    dispatch(blogIsLoading(true));

    return axios
      .post(
        config.READER_PATH,
        queryBuilder({
          type: 'query',
          operation: 'postByStub',
          data: { stub },
          fields: [
            'id',
            'uniqid',
            'type',
            'title',
            'stub',
            'content',
            'user { id,name,role }',
            'category',
            'status',
            'sticky',
            'language',
            'thumbnail',
            'createdAt',
            'updatedAt'
          ]
        })
      )
      .then(response => {
        if (response.statusText !== 'OK') {
          throw Error(response.statusText);
        }

        return response.data.data.postByStub;
      })
      .then(post => dispatch(blogSelectPost(post)))
      .then(() => dispatch(blogIsLoading(false)))
      .catch(err => dispatch(blogHasErrored(true)));
  };
}

export function postsAggregateSuccess(postsAggregates) {
  return {
    type: 'POSTS_AGG',
    postsAggregates
  };
}

export function getAggregates(lang, aggFunc = 'COUNT', column = 'id') {
  return dispatch => {
    return axios
      .post(
        config.READER_PATH,
        queryBuilder({
          type: 'query',
          operation: 'postsAggregates',
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

        return response.data.data.postsAggregates;
      })
      .then(works => dispatch(postsAggregateSuccess(works)))
      .catch(err => {
        console.error(err);
      });
  };
}

export function createOrUpdate(post) {
  if (post.id > 0) {
    return update(post);
  } else {
    delete post.id;
    return create(post);
  }
}

export function create(post) {
  return dispatch => {
    return axios.post(
      config.READER_PATH,
      queryBuilder({
        type: 'mutation',
        operation: 'postCreate',
        data: post,
        fields: ['id']
      })
    );
  };
}

export function update(post) {
  return dispatch => {
    return axios.post(
      config.READER_PATH,
      queryBuilder({
        type: 'mutation',
        operation: 'postUpdate',
        data: post,
        fields: ['id']
      })
    );
  };
}

export function remove(post) {
  return dispatch => {
    return axios.post(
      config.READER_PATH,
      queryBuilder({
        type: 'mutation',
        operation: 'postRemove',
        data: post,
        fields: ['id']
      })
    );
  };
}
