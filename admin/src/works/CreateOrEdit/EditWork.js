import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// App imports
import WorkForm from './Form';
import CreatePersonModal from '../CreatePersonModal';
import { Card, ButtonLink, Container } from 'common/ui';
import { MetaTagEdit } from '../ACPWorksMetaTags';
import { FETCH_WORK, FETCH_WORKS } from '../query';
import { UPDATE_WORK } from '../mutation';

function EditWork() {
  const [isCreatePersonModal, toggleCreatePersonModal] = useState(false);
  const history = useHistory();
  const { formatMessage: f } = useIntl();
  const [updateWork] = useMutation(UPDATE_WORK);

  const onSubmit = async (event, work) => {
    event.preventDefault();

    await updateWork({
      variables: { ...work },
      refetchQueries: [
        {
          query: FETCH_WORKS,
          variables: { language: -1 }
        }
      ]
    });

    history.push('/work/manage');
  };

  return (
    <>
      <Container>
        <MetaTagEdit />
        <div style={{ marginTop: '1rem' }}>
          <ButtonLink to={'/work/manage'}>
            <FontAwesomeIcon icon="arrow-left" />{' '}
            {f({ id: 'go_back', defaultMessage: 'Go back' })}
          </ButtonLink>
        </div>
        <Card>
          <h4>
            {f({ id: 'edit', defaultMessage: 'Edit' })}{' '}
            {f({ id: 'work', defaultMessage: 'Work' })}
          </h4>
          <WorkDetail
            onSubmit={onSubmit}
            onCreatePersonModal={toggleCreatePersonModal}
          />
        </Card>
      </Container>
      <CreatePersonModal
        isOpen={isCreatePersonModal}
        toggleModal={toggleCreatePersonModal}
      />
    </>
  );
}

function WorkDetail({ onSubmit, onCreatePersonModal }) {
  const { workId } = useParams();
  const { formatMessage: f } = useIntl();
  const { loading, error, data } = useQuery(FETCH_WORK, {
    variables: { workId: Number(workId) }
  });

  if (loading)
    return <div>{f({ id: 'loading', defaultMessage: 'Loading...' })}</div>;
  if (error) return <p id="error_edit_post">Error :(</p>;
  return (
    <div>
      <MetaTagEdit workName={data.workById.name} />
      <WorkForm
        work={data.workById}
        onSubmit={onSubmit}
        onCreatePersonModal={onCreatePersonModal}
      />
    </div>
  );
}

export default EditWork;
