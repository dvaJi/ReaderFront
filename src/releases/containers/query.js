import gql from 'graphql-tag';
export const query = (language, orderBy, first, offset) => gql`
{
  chapters(language: ${language}, orderBy: "${orderBy}", first: ${first}, offset: ${offset}, showHidden: false) {
    id
    chapter
    subchapter
    volume
    language
    name
    stub
    uniqid
    thumbnail
    releaseDate
    createdAt
    work {id, stub, name, uniqid, adult}
  }
}
`;
