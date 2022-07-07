import gql from 'graphql-tag';

export const CREATE_PAGE = gql`
  mutation PageCreate($chapterId: Int, $file: Upload, $size: Int) {
    pageCreate(chapterId: $chapterId, file: $file, size: $size) {
      id
      filename
      mime
      height
      width
      size
    }
  }
`;

export const UPDATE_PAGE = gql`
  mutation PageUpdate(
    $id: Int
    $chapterId: Int
    $filename: String
    $hidden: Boolean
    $height: Int
    $width: Int
    $size: Int
    $mime: String
  ) {
    pageUpdate(
      id: $id
      chapterId: $chapterId
      filename: $filename
      hidden: $hidden
      height: $height
      width: $width
      size: $size
      mime: $mime
    ) {
      id
    }
  }
`;

export const REMOVE_PAGE = gql`
  mutation PageRemove($id: Int) {
    pageRemove(id: $id) {
      id
    }
  }
`;

export const UPDATE_DEFAULT_PAGE = gql`
  mutation ChapterThumbUpdate($id: Int, $pageId: Int) {
    chapterThumbUpdate(id: $id, pageId: $pageId) {
      id
    }
  }
`;

export const CREATE_CHAPTER = gql`
  mutation ChapterCreate(
    $workId: Int
    $chapter: Int
    $subchapter: Int
    $volume: Int
    $name: String
    $stub: String
    $uniqid: String
    $hidden: Boolean
    $description: String
    $thumbnail: String
    $scheduled_release: Int
  ) {
    chapterCreate(
      workId: $workId
      chapter: $chapter
      subchapter: $subchapter
      volume: $volume
      name: $name
      stub: $stub
      uniqid: $uniqid
      hidden: $hidden
      description: $description
      thumbnail: $thumbnail
      scheduled_release: $scheduled_release
    ) {
      id
    }
  }
`;

export const UPDATE_CHAPTER = gql`
  mutation ChapterUpdate(
    $id: Int
    $workId: Int
    $chapter: Int
    $subchapter: Int
    $volume: Int
    $name: String
    $stub: String
    $uniqid: String
    $hidden: Boolean
    $description: String
    $thumbnail: String
    $releaseDate: String
  ) {
    chapterUpdate(
      id: $id
      workId: $workId
      chapter: $chapter
      subchapter: $subchapter
      volume: $volume
      name: $name
      stub: $stub
      uniqid: $uniqid
      hidden: $hidden
      description: $description
      thumbnail: $thumbnail
      releaseDate: $releaseDate
    ) {
      id
    }
  }
`;

export const UPDATE_CHAPTER_STATUS = gql`
  mutation UpdateChapterStatus($id: Int, $hidden: Boolean) {
    chapterStatusUpdate(id: $id, hidden: $hidden) {
      id
    }
  }
`;
