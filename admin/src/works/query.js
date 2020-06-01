import gql from 'graphql-tag';

export const FETCH_WORKS = gql`
  query Works($languages: [Int]) {
    works(
      languages: $languages
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
      description
      language
      language_name
      works_genres {
        genreId
      }
    }
  }
`;

export const FETCH_WORK = gql`
  query Work($workId: Int) {
    workById(workId: $workId) {
      id
      name
      stub
      uniqid
      type
      hidden
      demographicId
      demographic_name
      status
      status_name
      adult
      thumbnail
      createdAt
      description
      language
      people_works {
        rol
        people {
          id
          name
          thumbnail
        }
      }
      staff {
        rol
        rol_name
        people {
          id
          name
          thumbnail
        }
      }
      works_genres {
        genreId
      }
      genres {
        id
        name
      }
    }
  }
`;

export const FETCH_CHAPTERS = gql`
  query ChaptersByWork($languages: [Int], $workStub: String) {
    chaptersByWork(
      languages: $languages
      workStub: $workStub
      showHidden: true
    ) {
      id
      chapter
      subchapter
      volume
      language
      language_name
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
