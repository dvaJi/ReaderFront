import gql from 'graphql-tag';

export const FETCH_RELEASES = gql`
  query HomeChapters(
    $language: Int
    $orderBy: String
    $first: Int
    $offset: Int
  ) {
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
      thumbnail_path
      read_path
      releaseDate
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

export const FETCH_LATEST_WORKS = gql`
  query LatestWorks($language: Int) {
    works(
      language: $language
      orderBy: "DESC"
      sortBy: "id"
      first: 10
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
      thumbnail_path
      works_descriptions {
        description
      }
    }
  }
`;

export const FETCH_RANDOM_WORK = gql`
  query RandomWork($language: Int) {
    workRandom(language: $language) {
      id
      name
      stub
      uniqid
      type
      demographicId
      status
      adult
      thumbnail_path
      works_descriptions {
        description
      }
    }
  }
`;
