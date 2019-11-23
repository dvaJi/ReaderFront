import React, { memo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useQuery } from '@apollo/react-hooks';
import { forceCheck } from 'react-lazyload';

import MetaTags from './WorksMetatags';
import WorksList from '../components/WorksList';
import WorksListLoading from '../components/WorksListLoading';
import FilterCard from '../components/FilterCard';
import { languageNameToId } from 'utils/common';
import { FETCH_WORKS } from './query';

function WorksContainer() {
  const [textFilter, setTextFilter] = useState('');
  const { locale } = useIntl();
  const language = languageNameToId(locale);

  const { loading, error, data } = useQuery(FETCH_WORKS, {
    variables: { language }
  });
  if (loading) return <WorksListLoading />;
  if (error) return <p id="error_releases">Error :(</p>;

  forceCheck();

  return (
    <div className="Works">
      <MetaTags />
      <FilterCard filter={textFilter} onFilterTextChange={setTextFilter} />
      <WorksList works={data.works} filterText={textFilter} />
    </div>
  );
}

export default memo(WorksContainer);
