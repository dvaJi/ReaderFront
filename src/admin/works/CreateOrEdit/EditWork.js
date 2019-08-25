import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Query, graphql } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// App imports
import WorkForm from './Form';
import CreatePersonModal from '../CreatePersonModal';
import { Card, ButtonLink, Container } from 'common/ui';
import { MetaTagEdit } from '../ACPWorksMetaTags';
import { FETCH_WORK, FETCH_WORKS } from '../query';
import { UPDATE_WORK } from '../mutation';

function EditWork({ match, intl, mutate, history }) {
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
        <MetaTagEdit />
        <div style={{ marginTop: '1rem' }}>
          <ButtonLink to={'/admincp/work/manage'}>
            <FontAwesomeIcon icon={faArrowLeft} />{' '}
            <FormattedMessage id="go_back" defaultMessage="Go back" />
          </ButtonLink>
        </div>
        <Card>
          <h4>
            <FormattedMessage id="edit" defaultMessage="Edit" />{' '}
            <FormattedMessage id="work" defaultMessage="Work" />
          </h4>
          <Query
            query={FETCH_WORK}
            variables={{ stub: match.params.stub, language: -1 }}
          >
            {({ loading, error, data }) => {
              if (loading)
                return (
                  <div>
                    <FormattedMessage
                      id="loading"
                      defaultMessage="Loading..."
                    />
                  </div>
                );
              if (error) return <p id="error_edit_post">Error :(</p>;
              return (
                <div>
                  <MetaTagEdit workName={data.work.name} />
                  <WorkForm
                    work={data.work}
                    onSubmit={onSubmit}
                    onCreatePersonModal={toggleCreatePersonModal}
                    intl={intl}
                  />
                </div>
              );
            }}
          </Query>
        </Card>
      </Container>
      <CreatePersonModal
        isOpen={isCreatePersonModal}
        toggleModal={toggleCreatePersonModal}
      />
    </>
  );
}

export default graphql(UPDATE_WORK)(injectIntl(withRouter(EditWork)));
