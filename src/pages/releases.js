import React, { useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { useQuery } from '@apollo/react-hooks';
import { Helmet } from 'react-helmet';
import { Container } from 'reactstrap';
import gql from 'graphql-tag';

import ReleasePagination from '@components/Releases/ReleasePagination';
import ReleasesList from '@components/Releases/ReleasesList';
import ReleaseCardEmpty from '@components/Releases/ReleaseCardEmpty';
import { useGlobalState } from 'lib/state';
import { APP_TITLE } from 'lib/config';
import { withApollo } from 'lib/apollo';
import { logException } from 'lib/analytics';

export const FETCH_RELEASES = gql`
  query Chapters(
    $languages: [Int]
    $orderBy: String
    $first: Int
    $offset: Int
  ) {
    chapters(
      languages: $languages
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
      language_name
      name
      stub
      uniqid
      thumbnail
      releaseDate
      read_path
      createdAt
      work {
        id
        stub
        name
        uniqid
        adult
        language_name
      }
    }
  }
`;
const PER_PAGE = 20;

const LatestReleases = ({ languages, orderBy, first, offset }) => {
  const { loading, error, data } = useQuery(FETCH_RELEASES, {
    variables: { languages, orderBy, first, offset }
  });

  if (loading) return <ReleaseCardEmpty />;
  if (error) {
    logException(JSON.stringify(error), true);
    return <p id="error_releases">Error :(</p>;
  }

  return <ReleasesList releases={data.chapters} />;
};

export function ReleasesContainer() {
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const { formatMessage: f } = useIntl();
  const [languagesSelected] = useGlobalState('languages_filter');
  const languages = languagesSelected.map(l => l.value);

  return (
    <Container className="Releases">
      <h2>{f({ id: 'latest_releases', defaultMessage: 'Latest Releases' })}</h2>
      <ReleasesMetatags />
      <LatestReleases
        languages={languages}
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

function ReleasesMetatags() {
  return (
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
  );
}

export default withApollo(ReleasesContainer);
