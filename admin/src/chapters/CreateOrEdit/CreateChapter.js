import React from 'react';
import { useMutation } from '@apollo/client';
import { useParams, useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ChapterForm from './ChapterForm';
import { Card, ButtonLink, Container } from 'common/ui';
import { MetaTagCreate } from '../ACPChaptersMetaTags';
import { FETCH_CHAPTERS } from '../../works/query';
import { CREATE_CHAPTER } from '../mutations';
import { LANGUAGES } from '../../config';
import { languagesAvailables } from '../../../../shared/params/global';

import 'react-datepicker/dist/react-datepicker.css';

export const chapterEmpty = {
  id: 0,
  workId: 0,
  chapter: 0,
  subchapter: 0,
  volume: 0,
  language: languagesAvailables(LANGUAGES)[0].id,
  name: '',
  stub: '',
  uniqid: '',
  hidden: true,
  description: '',
  thumbnail: '',
  releaseDate: new Date()
};

function CreateChapter() {
  const params = useParams();
  const history = useHistory();
  const { formatMessage: f } = useIntl();
  const [createChapter] = useMutation(CREATE_CHAPTER);

  const workPath = `/work/${params.workId}/${params.stub}`;

  const onSubmit = async (event, chapter) => {
    event.preventDefault();

    const result = await createChapter({
      variables: { ...chapter },
      refetchQueries: [
        {
          query: FETCH_CHAPTERS,
          variables: { workId: Number(params.workId) }
        }
      ],
      ignoreResults: false
    });

    history.push(`${workPath}/chapter/${result.data.chapterCreate.id}`);
  };

  return (
    <Container>
      <MetaTagCreate />
      <div style={{ marginTop: '1rem' }}>
        <ButtonLink to={workPath}>
          <FontAwesomeIcon icon="arrow-left" />{' '}
          {f({ id: 'go_back', defaultMessage: 'Back' })}
        </ButtonLink>
      </div>
      <Card>
        <h4>
          {f({ id: 'create', defaultMessage: 'Create' })}{' '}
          {f({ id: 'chapter', defaultMessage: 'Chapter' })}
        </h4>
        <div>
          <ChapterForm
            chapter={{
              ...chapterEmpty,
              workId: parseInt(params.workId, 0)
            }}
            onSubmit={onSubmit}
          />
        </div>
      </Card>
    </Container>
  );
}

export default CreateChapter;
