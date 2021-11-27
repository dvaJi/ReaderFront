import { useState } from 'react';
import { UncontrolledTooltip, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useIntl from '@hooks/use-intl';

import { ButtonLink, Container, Modal, ModalHeader } from '@readerfront/ui';
import { ReaderControlsActions as Wrapper } from './styles';
import { ANONYMIZER_DOWNLOADS } from 'lib/config';
import { logEvent } from 'lib/analytics';

export default function ReaderControlsActions({
  work,
  chapter,
  toggleShowSettings,
  children
}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const { f } = useIntl();

  const toggleDownloadModal = () => setModalOpen(!isModalOpen);
  const downloadHref = ANONYMIZER_DOWNLOADS + chapter.download_href;

  return (
    <Wrapper>
      <button
        title="Download chapter"
        id="download-chapter"
        onClick={() => toggleDownloadModal(true)}
      >
        <FontAwesomeIcon icon="download" size="lg" />
      </button>
      <UncontrolledTooltip placement="bottom" target="download-chapter">
        {f({
          id: 'download_chapter',
          defaultMessage: 'Download Chapter'
        })}
      </UncontrolledTooltip>
      <button
        title="Reader settings"
        id="settings-button"
        onClick={() => toggleShowSettings(true)}
      >
        <FontAwesomeIcon icon="cog" size="lg" />
      </button>
      <UncontrolledTooltip placement="bottom" target="settings-button">
        {f({ id: 'reader_settings', defaultMessage: 'Reader Settings' })}
      </UncontrolledTooltip>
      <Modal
        isOpen={isModalOpen}
        toggle={() => toggleDownloadModal(false)}
        size="md"
        centered={true}
      >
        <ModalHeader toggle={() => toggleDownloadModal(false)}>
          {f({
            id: 'download_chapter',
            defaultMessage: 'Download Chapter'
          })}
        </ModalHeader>
        <ModalBody>
          <Container>
            <div className="form-group row">
              <div className="col">
                <div className="row">
                  <ButtonLink
                    href={`${downloadHref}/pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={f({
                      id: 'download_chapter',
                      defaultMessage: 'Download chapter'
                    })}
                    onClick={() => {
                      logEvent(
                        'Reader',
                        'Download Chapter',
                        `${work.name} [${work.language_name}] - ${chapter.chapter}.${chapter.subchapter} pdf`
                      );
                    }}
                    className="col px-2 mr-3"
                  >
                    <FontAwesomeIcon icon="file-pdf" /> PDF
                  </ButtonLink>
                  <ButtonLink
                    href={`${downloadHref}/zip`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={f({
                      id: 'download_chapter',
                      defaultMessage: 'Download chapter'
                    })}
                    onClick={() => {
                      logEvent(
                        'Reader',
                        'Download Chapter',
                        `${work.name} [${work.language_name}] - ${chapter.chapter}.${chapter.subchapter} zip`
                      );
                    }}
                    className="col px-2"
                  >
                    <FontAwesomeIcon icon="file-archive" /> ZIP
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Container>
        </ModalBody>
      </Modal>
      {children}
    </Wrapper>
  );
}
