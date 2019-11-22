import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// App imports
import ChapterForm from './ChapterForm';
import { Card, ButtonLink, Container } from 'common/ui';
import { MetaTagEdit } from '../ACPChaptersMetaTags';
import { FETCH_CHAPTER } from '../query';
import { FETCH_CHAPTERS } from '../../works/query';
import { UPDATE_CHAPTER } from '../mutations';
import 'react-datepicker/dist/react-datepicker.css';

function EditChapter() {
  const params = useParams();
  const history = useHistory();
  const { formatMessage: f } = useIntl();
  const [updateChapter] = useMutation(UPDATE_CHAPTER);

  const onSubmit = async (event, chapter) => {
    event.preventDefault();

    await updateChapter({
      variables: { ...chapter },
      refetchQueries: [
        {
          query: FETCH_CHAPTERS,
          variables: { language: -1, workStub: params.stub }
        }
      ]
    });

    history.push('/admincp/work/' + params.workId + '/' + params.stub);
  };

  const workPath = `/admincp/work/${params.workId}/${params.stub}`;
  return (
    <Container>
      <MetaTagEdit />
      <div style={{ marginTop: '1rem' }}>
        <ButtonLink to={workPath}>
          <FontAwesomeIcon icon={faArrowLeft} />{' '}
          {f({ id: 'go_back', defaultMessage: 'Back' })}
        </ButtonLink>
      </div>
      <Card>
        <h4>
          {f({ id: 'edit', defaultMessage: 'Edit' })}{' '}
          {f({ id: 'chapter', defaultMessage: 'Chapter' })}
        </h4>
        <ChapterDetail onSubmit={onSubmit} />
      </Card>
    </Container>
  );
}

function ChapterDetail({ onSubmit }) {
  const params = useParams();
  const { formatMessage: f } = useIntl();
  const { loading, error, data } = useQuery(FETCH_CHAPTER, {
    variables: { chapterId: parseInt(params.chapterId, 0) }
  });

  if (loading)
    return <div>{f({ id: 'loading', defaultMessage: 'Loading...' })}</div>;
  if (error) return <p id="error_edit_chapter">Error :(</p>;
  return (
    <div>
      <MetaTagEdit chapterTitle={data.chapterById.title} />
      <ChapterForm
        chapter={{
          ...data.chapterById,
          workId: parseInt(params.workId, 0)
        }}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default EditChapter;
