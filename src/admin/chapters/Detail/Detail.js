import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Query } from 'react-apollo';
import { Button, Container, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { MetaTagDetail } from '../ACPChaptersMetaTags';
import DropImages from './DropImages';
import ChapterInfo from './ChapterInfo';
import { FETCH_CHAPTER } from '../query';
import { languageIdToName } from '../../../utils/common';

function Detail(props) {
  const { params } = props.match;
  const [isModalOpen, toggleModal] = useState(false);
  return (
    <Container>
      <Link to={'/admincp/work/' + params.workId + '/' + params.stub}>
        <Button>
          <FontAwesomeIcon icon={faArrowLeft} className="mr-1" />
          <FormattedMessage id="go_back" defaultMessage="Back" />
        </Button>
      </Link>
      <Query
        query={FETCH_CHAPTER}
        variables={{ chapterId: parseInt(params.chapterId, 0) }}
      >
        {({ loading, error, data }) => {
          if (loading)
            return (
              <FormattedMessage id="loading" defaultMessage="Loading..." />
            );
          if (error) return <p id="error_releases">Error :(</p>;
          const langName = languageIdToName(data.chapterById.language);
          const chapterPath = `read/${params.stub}/${languageIdToName(
            data.chapterById.language
          )}/${data.chapterById.volume}/${data.chapterById.chapter}.${
            data.chapterById.subchapter
          }`;
          const chapterUrl = `${window.location.origin}/${chapterPath}`;
          return (
            <>
              <MetaTagDetail chapter={data.chapterById} />
              <ChapterInfo lang={langName} chapter={data.chapterById} />
              <DropImages
                chapter={data.chapterById}
                toggleModal={toggleModal}
              />
              <Modal isOpen={isModalOpen} toggle={() => toggleModal(false)}>
                <ModalHeader toggle={() => toggleModal(false)}>
                  <FormattedMessage
                    id="chapter_uploaded"
                    defaultMessage="Chapter Uploaded"
                  />
                </ModalHeader>
                <ModalBody>
                  <FormattedMessage
                    id="read_chapter"
                    defaultMessage="Read chapter"
                  />
                  : <code>{chapterUrl}</code>
                </ModalBody>
              </Modal>
            </>
          );
        }}
      </Query>
    </Container>
  );
}

export default Detail;
