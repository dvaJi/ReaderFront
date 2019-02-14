import gql from 'graphql-tag';

export const FETCH_WORK = gql`
  query Work($language: Int, $stub: String) {
    work(language: $language, stub: $stub, showHidden: false) {
      id
      name
      stub
      uniqid
      type
      demographicId
      status
      statusReason
      visits
      adult
      thumbnail
      createdAt
      chapters {
        id
        chapter
        subchapter
        volume
        language
        name
        stub
        uniqid
        thumbnail
      }
      works_descriptions {
        description
        language
      }
      people_works {
        rol
        people {
          id
          name
          name_kanji
          thumbnail
          stub
          uniqid
          description
        }
      }
      works_genres {
        genreId
      }
    }
  }
`;
