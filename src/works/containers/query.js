import gql from 'graphql-tag';

export const FETCH_WORKS = gql`
  query Works($language: Int) {
    works(
      language: $language
      orderBy: "ASC"
      sortBy: "stub"
      first: 120
      offset: 0
      showHidden: false
    ) {
      id
      name
      stub
      uniqid
      type
      demographicId
      status
      adult
      thumbnail
      createdAt
      updatedAt
      works_descriptions {
        description
      }
    }
  }
`;
