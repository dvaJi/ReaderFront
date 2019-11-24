import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useQuery } from '@apollo/react-hooks';

import MetaTag from './ReleaseMetaTags';
import ReleasePagination from '../components/ReleasePagination';
import ReleasesList from '../components/ReleasesList';
import ReleaseCardEmpty from '../components/ReleaseCardEmpty';
import { FETCH_RELEASES } from './query';
import { languageNameToId } from 'utils/common';

const PER_PAGE = 20;

const LatestReleases = ({ language, orderBy, first, offset }) => {
  const { loading, error, data } = useQuery(FETCH_RELEASES, {
    variables: { language, orderBy, first, offset }
  });

  if (loading) return <ReleaseCardEmpty />;
  if (error) return <p id="error_releases">Error :(</p>;

  return <ReleasesList releases={data.chapters} />;
};

function ReleasesContainer() {
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const { formatMessage: f, locale } = useIntl();
  const language = languageNameToId(locale);

  return (
    <div className="Releases">
      <h2>{f({ id: 'latest_releases', defaultMessage: 'Latest Releases' })}</h2>
      <MetaTag />
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
    </div>
  );
}

export default ReleasesContainer;
