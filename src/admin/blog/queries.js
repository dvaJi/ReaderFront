import gql from 'graphql-tag';

export const FETCH_ALL_POSTS_WITH_AGG = gql`
  query AllPosts($first: Int, $offset: Int) {
    posts(
      language: -1
      orderBy: "DESC"
      sortBy: "createdAt"
      first: $first
      offset: $offset
      showHidden: true
    ) {
      id
      uniqid
      type
      title
      stub
      content
      user {
        id
        name
        role
      }
      category
      status
      sticky
      language
      thumbnail
      createdAt
      updatedAt
    }

    postsAggregates(
      language: -1
      aggregate: "COUNT"
      aggregateColumn: "id"
      showHidden: true
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
      thumbnail
      createdAt
      updatedAt
    }
  }
`;
