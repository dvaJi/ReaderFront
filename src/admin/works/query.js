import gql from 'graphql-tag';

export const FETCH_WORKS = gql`
  query Works($language: Int) {
    works(
      language: $language
      orderBy: "ASC"
      sortBy: "stub"
      first: 120
      offset: 0
      showHidden: true
    ) {
      id
      name
      stub
      type
      status
      adult
      createdAt
      updatedAt
      languages {
        id
        name
        description
      }
      works_descriptions {
        description
        language
      }
      works_genres {
        genreId
      }
    }
  }
`;

export const FETCH_WORK = gql`
  query Work($language: Int, $stub: String) {
    work(language: $language, stub: $stub, showHidden: true) {
      id
      name
      stub
      uniqid
      type
      hidden
      demographicId
      status
      adult
      thumbnail
      createdAt
      works_descriptions {
        description
        language
      }
      people_works {
        rol
        people {
          id
          name
          thumbnail
        }
      }
      works_genres {
        genreId
      }
    }
  }
`;

export const FETCH_CHAPTERS = gql`
  query ChaptersByWork($language: Int, $workStub: String) {
    chaptersByWork(language: $language, workStub: $workStub, showHidden: true) {
      id
      chapter
      subchapter
      volume
      language
      name
      stub
      uniqid
      releaseDate
      createdAt
      updatedAt
    }
  }
`;

export const SEARCH_PEOPLE = gql`
  query SearchPeopleByName($name: String, $first: Int, $offset: Int) {
    searchPeopleByName(name: $name, first: $first, offset: $offset) {
      id
      name
      name_kanji
      thumbnail
    }
  }
`;
