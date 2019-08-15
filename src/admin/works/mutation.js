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
    $thumbnail: String
    $works_descriptions: String
    $works_genres: JSON
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
    $thumbnail: String
    $works_descriptions: String
    $works_genres: JSON
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
    ) {
      id
    }
  }
`;
