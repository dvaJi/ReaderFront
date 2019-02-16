import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { forceCheck } from 'react-lazyload';

import MetaTags from './WorksMetatags';
import WorksList from '../components/WorksList';
import WorksListLoading from '../components/WorksListLoading';
import FilterCard from '../components/FilterCard';
import { FETCH_WORKS } from './query';
import params from '../../params.json';

function WorksContainer({ language }) {
  const [textFilter, setTextFilter] = useState('');
  const languageId = params.global.languages[language].id;
  return (
    <div className="Works">
      <MetaTags />
      <FilterCard filter={textFilter} onFilterTextChange={setTextFilter} />
      <Query query={FETCH_WORKS} variables={{ language: languageId }}>
        {({ loading, error, data }) => {
          if (loading) return <WorksListLoading />;
          if (error) return <p id="error_releases">Error :(</p>;
          forceCheck();
          return <WorksList works={data.works} filterText={textFilter} />;
        }}
      </Query>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    language: state.layout.language
  };
};

export default connect(mapStateToProps)(WorksContainer);
