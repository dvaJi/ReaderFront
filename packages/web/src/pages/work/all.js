import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { useQuery } from '@apollo/client';
import { Container } from 'reactstrap';
import gql from 'graphql-tag';

import WorksList from '@components/Works/WorksList';
import WorksListLoading from '@components/Works/WorksListLoading';
import FilterCard from '@components/Works/FilterCard';
import { useGlobalState } from 'lib/state';
import { withApollo } from 'lib/apollo';
import { APP_TITLE } from 'lib/config';
import { logException } from 'lib/analytics';

export const FETCH_WORKS = gql`
  query PublicWorks($languages: [Int]) {
    works(
      languages: $languages
      orderBy: "ASC"
      sortBy: "stub"
      first: 120
      offset: 0
      showHidden: false
    ) {
      name
      stub
      uniqid
      type
      demographic_name
      status_name
      language_name
      adult
      thumbnail_path
    }
  }
`;

export function WorksContainer() {
  const { query, push } = useRouter();
  const [textFilter, setText] = useState(query.q ? query.q : '');
  const [languagesSelected] = useGlobalState('languages_filter');
  const languages = languagesSelected.map(l => l.value);

  const { loading, error, data } = useQuery(FETCH_WORKS, {
    variables: { languages }
  });

  const setTextFilter = text => {
    push({ query: { q: text } });
    setText(text);
  };

  if (loading)
    return (
      <Container>
        <FilterCard filter={textFilter} onFilterTextChange={setTextFilter} />
        <WorksListLoading />
      </Container>
    );

  if (error) {
    logException(JSON.stringify(error), true);
    return (
      <Container>
        <p id="error_works">Error :(</p>
      </Container>
    );
  }

  return (
    <Container>
      <WorksMetatags />
      <FilterCard filter={textFilter} onFilterTextChange={setTextFilter} />
      <WorksList works={data.works} filterText={textFilter} />
    </Container>
  );
}

function WorksMetatags() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
      </Helmet>
      <FormattedMessage
        id="works.title"
        defaultMessage="Projects List :: {title}"
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
        id="works.desc"
        defaultMessage="Projects List for {title}"
        values={{ title: APP_TITLE }}
      >
        {desc => (
          <Helmet>
            <meta name="description" content={desc} />
          </Helmet>
        )}
      </FormattedMessage>
    </>
  );
}

export default withApollo(WorksContainer);
