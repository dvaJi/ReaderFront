import gql from 'graphql-tag';

export const FETCH_WORK = gql`
  query PublicWork($language: Int, $stub: String) {
    work(language: $language, stub: $stub, showHidden: false) {
      id
      name
      stub
      uniqid
      type
      demographicId
      status
      adult
      thumbnail_path
      createdAt
      updatedAt
      chapters {
        id
        chapter
        subchapter
        volume
        language
        language_name
        name
        stub
        uniqid
        thumbnail
        download_href
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
      genres {
        id
        name
      }
    }
  }
`;
