import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useIntl, FormattedMessage } from 'react-intl';
import { useQuery } from '@apollo/react-hooks';
import { forceCheck } from 'react-lazyload';
import { Container } from 'reactstrap';
import gql from 'graphql-tag';

import WorksList from '@components/Works/WorksList';
import WorksListLoading from '@components/Works/WorksListLoading';
import FilterCard from '@components/Works/FilterCard';
import { languageNameToId } from 'utils/common';
import { withApollo } from 'lib/apollo';
import { APP_TITLE } from 'lib/config';

export const FETCH_WORKS = gql`
  query PublicWorks($language: Int) {
    works(
      language: $language
      orderBy: "ASC"
      sortBy: "stub"
      first: 120
      offset: 0
      showHidden: false
    ) {
      id
      name
      stub
      uniqid
      type
      demographicId
      status
      adult
      thumbnail_path
      createdAt
      updatedAt
      works_descriptions {
        description
      }
    }
  }
`;

export function WorksContainer() {
  const [textFilter, setTextFilter] = useState('');
  const { locale } = useIntl();
  const language = languageNameToId(locale);

  const { loading, error, data } = useQuery(FETCH_WORKS, {
    variables: { language }
  });
  if (loading)
    return (
      <Container>
        <WorksListLoading />
      </Container>
    );
  if (error)
    return (
      <Container>
        <p id="error_releases">Error :(</p>
      </Container>
    );

  forceCheck();

  return (
    <Container>
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
      <FilterCard filter={textFilter} onFilterTextChange={setTextFilter} />
      <WorksList works={data.works} filterText={textFilter} />
    </Container>
  );
}

export default withApollo(WorksContainer);
