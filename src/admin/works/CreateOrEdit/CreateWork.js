import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// App imports
import WorkForm from './Form';
import CreatePersonModal from '../CreatePersonModal';
import { Card, ButtonLink, Container } from 'common/ui';
import { MetaTagCreate } from '../ACPWorksMetaTags';
import { FETCH_WORKS } from '../query';
import { CREATE_WORK } from '../mutation';

export const postEmpty = {
  id: 0,
  name: '',
  stub: '',
  type: '',
  hidden: false,
  demographicId: 0,
  status: 0,
  statusReason: '',
  adult: false,
  visits: 0,
  thumbnail: '',
  people_works: [],
  works_descriptions: [],
  works_genres: []
};

function CreateWork({ intl, mutate, history }) {
  const [isCreatePersonModal, toggleCreatePersonModal] = useState(false);

  const onSubmit = async (event, work) => {
    event.preventDefault();

    await mutate({
      variables: { ...work },
      refetchQueries: [
        {
          query: FETCH_WORKS
        }
      ]
    });

    history.push('/admincp/work/manage');
  };

  return (
    <>
      <Container>
        <MetaTagCreate />
        <div style={{ marginTop: '1rem' }}>
          <ButtonLink to={'/admincp/work/manage'}>
            <FontAwesomeIcon icon={faArrowLeft} />{' '}
            <FormattedMessage id="go_back" defaultMessage="Go back" />
          </ButtonLink>
        </div>
        <Card>
          <h4>
            <FormattedMessage id="create" defaultMessage="Create" />{' '}
            <FormattedMessage id="work" defaultMessage="Work" />
          </h4>
          <div>
            <WorkForm
              work={postEmpty}
              onSubmit={onSubmit}
              onCreatePersonModal={toggleCreatePersonModal}
            />
          </div>
        </Card>
      </Container>
      <CreatePersonModal
        isOpen={isCreatePersonModal}
        toggleModal={toggleCreatePersonModal}
      />
    </>
  );
}

export default graphql(CREATE_WORK)(injectIntl(withRouter(CreateWork)));
