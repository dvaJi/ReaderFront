import gql from 'graphql-tag';

export const REMOVE_WORK = gql`
  mutation WorkRemove($id: Int) {
    workRemove(id: $id) {
      id
    }
  }
`;

export const REMOVE_CHAPTER = gql`
  mutation ChapterRemove($id: Int) {
    chapterRemove(id: $id) {
      id
    }
  }
`;

export const CREATE_WORK = gql`
  mutation WorkCreate(
    $name: String
    $stub: String
    $type: String
    $hidden: Boolean
    $demographicId: Int
    $status: Int
    $statusReason: String
    $adult: Boolean
    $visits: Int
    $thumbnail: Upload
    $works_descriptions: String
    $works_genres: JSON
    $people_works: JSON
  ) {
    workCreate(
      name: $name
      stub: $stub
      type: $type
      hidden: $hidden
      demographicId: $demographicId
      status: $status
      statusReason: $statusReason
      adult: $adult
      visits: $visits
      thumbnail: $thumbnail
      works_descriptions: $works_descriptions
      works_genres: $works_genres
      people_works: $people_works
    ) {
      id
    }
  }
`;

export const UPDATE_WORK = gql`
  mutation WorkUpdate(
    $id: Int
    $name: String
    $stub: String
    $type: String
    $hidden: Boolean
    $demographicId: Int
    $status: Int
    $statusReason: String
    $adult: Boolean
    $visits: Int
    $thumbnail: Upload
    $works_descriptions: String
    $works_genres: JSON
    $people_works: JSON
  ) {
    workUpdate(
      id: $id
      name: $name
      stub: $stub
      type: $type
      hidden: $hidden
      demographicId: $demographicId
      status: $status
      statusReason: $statusReason
      adult: $adult
      visits: $visits
      thumbnail: $thumbnail
      works_descriptions: $works_descriptions
      works_genres: $works_genres
      people_works: $people_works
    ) {
      id
    }
  }
`;

export const CREATE_PERSON = gql`
  mutation PersonCreate(
    $name: String
    $name_kanji: String
    $description: String
    $twitter: String
    $thumbnail: String
  ) {
    peopleCreate(
      name: $name
      name_kanji: $name_kanji
      description: $description
      twitter: $twitter
      thumbnail: $thumbnail
    ) {
      id
    }
  }
`;
