import React from 'react';
import { graphql } from 'react-apollo';
import { useParams, useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// App imports
import ChapterForm from './ChapterForm';
import { Card, ButtonLink, Container } from 'common/ui';
import { MetaTagCreate } from '../ACPChaptersMetaTags';
import { FETCH_CHAPTERS } from '../../works/query';
import { CREATE_CHAPTER } from '../mutations';
import 'react-datepicker/dist/react-datepicker.css';

export const chapterEmpty = {
  id: 0,
  workId: 0,
  chapter: 0,
  subchapter: 0,
  volume: 0,
  language: 0,
  name: '',
  stub: '',
  uniqid: '',
  hidden: false,
  description: '',
  thumbnail: '',
  releaseDate: new Date()
};

function CreateChapter({ createChapter }) {
  const params = useParams();
  const history = useHistory();
  const { formatMessage: f } = useIntl();

  const onSubmit = async (event, chapter) => {
    event.preventDefault();

    const result = await createChapter({
      variables: { ...chapter },
      refetchQueries: [
        {
          query: FETCH_CHAPTERS,
          variables: { language: -1, workStub: params.stub }
        }
      ],
      ignoreResults: false
    });

    history.push(
      '/admincp/work/' +
        params.workId +
        '/' +
        params.stub +
        '/chapter/' +
        result.data.chapterCreate.id
    );
  };

  const workPath = `/admincp/work/${params.workId}/${params.stub}`;
  return (
    <Container>
      <MetaTagCreate />
      <div style={{ marginTop: '1rem' }}>
        <ButtonLink to={workPath}>
          <FontAwesomeIcon icon={faArrowLeft} />{' '}
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

export default graphql(CREATE_CHAPTER, { name: 'createChapter' })(
  CreateChapter
);
