import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation } from '@apollo/client';
import { Link, useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

import WorkForm from './Form';
import CreatePersonModal from '../CreatePersonModal';
import { Card, buttonWithColors, Container } from '@readerfront/ui';
import { MetaTagCreate } from '../ACPWorksMetaTags';
import { FETCH_WORKS } from '../query';
import { CREATE_WORK } from '../mutation';
import { languagesAvailables } from '@readerfront/shared/build/params/global';
import { LANGUAGES } from '../../config';

const ButtonLink = buttonWithColors(Link);

export const postEmpty = {
  id: 0,
  name: '',
  stub: '',
  type: 'Manga',
  hidden: false,
  demographicId: 1,
  status: 1,
  statusReason: '',
  licensed: false,
  description: '',
  language: languagesAvailables(LANGUAGES)[0].id,
  adult: false,
  visits: 0,
  thumbnail: '',
  people_works: [],
  works_genres: []
};

function CreateWork() {
  const [isCreatePersonModal, toggleCreatePersonModal] = useState(false);
  const history = useHistory();
  const { formatMessage: f } = useIntl();
  const [createWork] = useMutation(CREATE_WORK);

  const onSubmit = async (event, work) => {
    event.preventDefault();

    try {
      await createWork({
        variables: { ...work },
        refetchQueries: [
          {
            query: FETCH_WORKS,
            variables: { languages: [] }
          }
        ]
      });
    } catch (err) {
      alert(err);
    }

    history.push('/work/manage');
  };

  return (
    <>
      <Container>
        <MetaTagCreate />
        <div style={{ marginTop: '1rem' }}>
          <ButtonLink to={'/work/manage'}>
            <FontAwesomeIcon icon="arrow-left" />{' '}
            {f({ id: 'go_back', defaultMessage: 'Go back' })}
          </ButtonLink>
        </div>
        <Card>
          <h4>
            {f({ id: 'create', defaultMessage: 'Create' })}{' '}
            {f({ id: 'work', defaultMessage: 'Work' })}
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

export default CreateWork;
