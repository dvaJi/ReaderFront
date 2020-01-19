import gql from 'graphql-tag';

export const FETCH_ALL_POSTS_WITH_AGG = gql`
  query AllPosts($language: Int, $first: Int, $offset: Int) {
    posts(
      language: $language
      orderBy: "DESC"
      sortBy: "createdAt"
      first: $first
      offset: $offset
      showHidden: false
    ) {
      id
      uniqid
      type
      title
      stub
      content
      user {
        name
      }
      category
      status
      sticky
      language
      thumbnail_path
      createdAt
      updatedAt
    }

    postsAggregates(
      language: $language
      aggregate: "COUNT"
      aggregateColumn: "id"
      showHidden: false
    ) {
      count
    }
  }
`;

export const FIND_BY_STUB = gql`
  query PostByStub($stub: String) {
    postByStub(stub: $stub, showHidden: true) {
      id
      uniqid
      type
      title
      stub
      content
      category
      status
      sticky
      language
      thumbnail_path
      createdAt
      updatedAt
    }
  }
`;
