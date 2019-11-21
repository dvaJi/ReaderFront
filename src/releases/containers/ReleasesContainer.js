import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import { Query } from 'react-apollo';

// App imports
import MetaTag from './ReleaseMetaTags';
import ReleasePagination from '../components/ReleasePagination';
import ReleasesList from '../components/ReleasesList';
import ReleaseCardEmpty from '../components/ReleaseCardEmpty';
import { FETCH_RELEASES } from './query';
import { languageNameToId } from 'utils/common';

const PER_PAGE = 20;

const LatestReleases = ({ language, orderBy, first, offset }) => (
  <Query
    query={FETCH_RELEASES}
    variables={{ language, orderBy, first, offset }}
  >
    {({ loading, error, data }) => {
      if (loading) return <ReleaseCardEmpty />;
      if (error) return <p id="error_releases">Error :(</p>;

      return <ReleasesList releases={data.chapters} />;
    }}
  </Query>
);

function ReleasesContainer({ language }) {
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const { formatMessage: f } = useIntl();

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

const mapStateToProps = state => {
  return {
    language: languageNameToId(state.layout.language)
  };
};

export default connect(mapStateToProps)(ReleasesContainer);
