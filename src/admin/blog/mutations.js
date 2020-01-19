import gql from 'graphql-tag';

export const CREATE_POST = gql`
  mutation PostCreate(
    $userId: Int
    $content: String
    $category: Int
    $uniqid: String
    $type: Int
    $title: String
    $stub: String
    $status: Int
    $sticky: Boolean
    $language: Int
    $thumbnail: Upload
  ) {
    postCreate(
      userId: $userId
      content: $content
      category: $category
      uniqid: $uniqid
      type: $type
      title: $title
      stub: $stub
      status: $status
      sticky: $sticky
      language: $language
      thumbnail: $thumbnail
    ) {
      id
    }
  }
`;

export const UPDATE_POST = gql`
  mutation PostUpdate(
    $id: Int
    $uniqid: String
    $type: Int
    $title: String
    $stub: String
    $content: String
    $category: Int
    $status: Int
    $sticky: Boolean
    $language: Int
    $thumbnail: Upload
    $userId: Int
  ) {
    postUpdate(
      id: $id
      uniqid: $uniqid
      type: $type
      title: $title
      stub: $stub
      content: $content
      category: $category
      status: $status
      sticky: $sticky
      language: $language
      thumbnail: $thumbnail
      userId: $userId
    ) {
      id
    }
  }
`;

export const REMOVE_POST = gql`
  mutation PostRemove($id: Int) {
    postRemove(id: $id) {
      id
    }
  }
`;
