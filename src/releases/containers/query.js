import gql from 'graphql-tag';
export const FETCH_RELEASES = gql`
  query Chapters($language: Int, $orderBy: String, $first: Int, $offset: Int) {
    chapters(
      language: $language
      orderBy: $orderBy
      first: $first
      offset: $offset
      showHidden: false
    ) {
      id
      chapter
      subchapter
      volume
      language
      name
      stub
      uniqid
      thumbnail
      releaseDate
      createdAt
      work {
        id
        stub
        name
        uniqid
        adult
      }
    }
  }
`;
