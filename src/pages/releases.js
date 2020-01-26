import React, { useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { useQuery } from '@apollo/react-hooks';
import { Helmet } from 'react-helmet';
import { Container } from 'reactstrap';
import gql from 'graphql-tag';

import ReleasePagination from '@components/Releases/ReleasePagination';
import ReleasesList from '@components/Releases/ReleasesList';
import ReleaseCardEmpty from '@components/Releases/ReleaseCardEmpty';
import { languageNameToId } from 'utils/common';
import { APP_TITLE } from 'lib/config';
import { withApollo } from 'lib/apollo';

export const FETCH_RELEASES = gql`
  query Chapters($language: Int, $orderBy: String, $first: Int, $offset: Int) {
    chapters(
      language: $language
      orderBy: $orderBy
      first: $first
      offset: $offset
      showHidden: false
    ) {
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
      work {
        id
        stub
        name
        uniqid
        adult
      }
    }
  }
`;
const PER_PAGE = 20;

const LatestReleases = ({ language, orderBy, first, offset }) => {
  const { loading, error, data } = useQuery(FETCH_RELEASES, {
    variables: { language, orderBy, first, offset }
  });

  if (loading) return <ReleaseCardEmpty />;
  if (error) return <p id="error_releases">Error :(</p>;

  return <ReleasesList releases={data.chapters} />;
};

export function ReleasesContainer() {
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const { formatMessage: f, locale } = useIntl();
  const language = languageNameToId(locale);

  return (
    <Container className="Releases">
      <h2>{f({ id: 'latest_releases', defaultMessage: 'Latest Releases' })}</h2>
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <meta property="og:type" content="website" />
        </Helmet>
        <FormattedMessage
          id="releases.title"
          defaultMessage="Latest releases :: {title}"
          values={{ title: APP_TITLE }}
        >
          {title => (
            <Helmet>
              <title>{title}</title>
              <meta property="og:title" content={title} />
            </Helmet>
          )}
        </FormattedMessage>
        <FormattedMessage
          id="releases.desc"
          defaultMessage="Latest releases by {title}"
          values={{ title: APP_TITLE }}
        >
          {desc => (
            <Helmet>
              <meta name="description" content={desc} />
              <meta property="og:description" content={desc} />
            </Helmet>
          )}
        </FormattedMessage>
      </>
      <LatestReleases
        language={language}
        orderBy={'DESC'}
        first={PER_PAGE}
        offset={offset}
      />
      <ReleasePagination
        page={page}
        onPageChange={page => {
          setPage(page);
          setOffset(page * PER_PAGE);
        }}
      />
    </Container>
  );
}
export default withApollo(ReleasesContainer);
