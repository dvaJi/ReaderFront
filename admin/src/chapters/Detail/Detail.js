import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ButtonLink, Container } from 'common/ui';
import { MetaTagDetail } from '../ACPChaptersMetaTags';
import DropImages from './DropImages';
import ChapterInfo from './ChapterInfo';
import { FETCH_CHAPTER } from '../query';
import { APP_URL } from '../../config';

function Detail() {
  const { formatMessage: f } = useIntl();
  const { workId, stub } = useParams();

  return (
    <Container>
      <div style={{ marginTop: '1rem' }}>
        <ButtonLink to={'/work/' + workId + '/' + stub}>
          <FontAwesomeIcon icon="arrow-left" className="mr-1" />
          {f({ id: 'go_back', defaultMessage: 'Back' })}
        </ButtonLink>
        <ChapterDetail />
      </div>
    </Container>
  );
}

function ChapterDetail() {
  const [isModalOpen, toggleModal] = useState(false);
  const { chapterId } = useParams();
  const { formatMessage: f } = useIntl();
  const { loading, error, data } = useQuery(FETCH_CHAPTER, {
    variables: { chapterId: parseInt(chapterId, 0) }
  });

  if (loading) return f({ id: 'loading', defaultMessage: 'Loading...' });
  if (error) return <p id="error_releases">Error :(</p>;

  const chapterUrl = `${APP_URL}${data.chapterById.read_path}`;

  return (
    <>
      <MetaTagDetail chapter={data.chapterById} />
      <ChapterInfo chapter={data.chapterById} />
      <DropImages chapter={data.chapterById} toggleModal={toggleModal} />
      <Modal isOpen={isModalOpen} toggle={() => toggleModal(false)}>
        <ModalHeader toggle={() => toggleModal(false)}>
          {f({
            id: 'chapter_uploaded',
            defaultMessage: 'Chapter Uploaded'
          })}
        </ModalHeader>
        <ModalBody>
          <>{f({ id: 'read_chapter', defaultMessage: 'Read chapter' })}</>:{' '}
          <code>{chapterUrl}</code>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Detail;
