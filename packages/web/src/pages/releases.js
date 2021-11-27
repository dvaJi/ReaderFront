import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Head from "next/head";
import { Container } from 'reactstrap';
import gql from 'graphql-tag';

import useIntl from '@hooks/use-intl';

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
      language_name
      name
      stub
      thumbnail_path
      read_path
      createdAt
      work {
        name
        adult
      }
    }
  }
`;
const PER_PAGE = 20;

const LatestReleases = ({ languages = [], first, offset }) => {
  const { loading, error, data } = useQuery(FETCH_RELEASES, {
    variables: { languages, orderBy: 'DESC', first, offset }
  });

  if (loading) return <ReleaseCardEmpty />;
  if (error || !data) {
    logException(JSON.stringify(error), true);
    return <p id="error_releases">Error :(</p>;
  }

  return <ReleasesList releases={data.chapters} />;
};

export function ReleasesContainer() {
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [languagesSelected] = useGlobalState('languages_filter');
  const languages = languagesSelected.map(l => l.value);
  const { f } = useIntl();

  return (
    <Container className="Releases">
      <h2>{f({ id: 'latest_releases', defaultMessage: 'Latest Releases' })}</h2>
      <ReleasesMetatags />
      <LatestReleases languages={languages} first={PER_PAGE} offset={offset} />
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
  const { f } = useIntl();

  return (
    <Head>
      <meta property="og:type" content="website" />
      <title>{f({ id: 'releases.title', defaultMessage: 'Latest releases :: {title}', values: { title: APP_TITLE } })}</title>
      <meta property="og:title" content={f({ id: 'releases.title', defaultMessage: 'Latest releases :: {title}', values: { title: APP_TITLE } })} />
      <meta name="description" content={f({ id: 'releases.desc', defaultMessage: 'Latest releases by {title}', values: { title: APP_TITLE } })} />
      <meta property="og:description" content={f({ id: 'releases.desc', defaultMessage: 'Latest releases by {title}', values: { title: APP_TITLE } })} />
    </Head>
  );
}

export default withApollo(ReleasesContainer);
