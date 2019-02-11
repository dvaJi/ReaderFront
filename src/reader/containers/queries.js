import gql from 'graphql-tag';

export const FETCH_CHAPTERS = gql`
  query ChaptersByWork($language: Int, $workStub: String) {
    chaptersByWork(language: $language, workStub: $workStub) {
      id
      chapter
      subchapter
      volume
      language
      name
      stub
      uniqid
    }
  }
`;

export const FETCH_CHAPTER = gql`
  query ChapterByWorkAndChapter(
    $workStub: String
    $language: Int
    $volume: Int
    $chapter: Int
    $subchapter: Int
  ) {
    chapterByWorkAndChapter(
      workStub: $workStub
      language: $language
      volume: $volume
      chapter: $chapter
      subchapter: $subchapter
      showHidden: false
    ) {
      id
      language
      name
      stub
      uniqid
      chapter
      subchapter
      volume
      createdAt
      updatedAt
      work {
        id
        stub
        name
        uniqid
      }
      pages {
        id
        filename
        height
        width
        size
      }
    }
  }
`;
