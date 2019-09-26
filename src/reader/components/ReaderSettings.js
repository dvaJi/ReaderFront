import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { useGlobalState, setDisplaySettings } from 'state';
import { Button, Container } from 'common/ui';

function ReaderSettings({ isOpen, toggle }) {
  const [displaySettings] = useGlobalState('displaySettings');

  const readingModeRendering = readingMode => () =>
    setDisplaySettings({ ...displaySettings, readingMode });
  return (
    <Modal
      isOpen={isOpen}
      toggle={() => toggle(false)}
      size="md"
      centered={true}
    >
      <ModalHeader toggle={() => toggle(false)}>
        <FormattedMessage
          id="reader_settings"
          defaultMessage="Reader Settings"
        />
      </ModalHeader>
      <ModalBody>
        <Container>
          <h5>
            <FormattedMessage
              id="display_settings"
              defaultMessage="Display settings"
            />
          </h5>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label">
              <FormattedMessage
                id="reading_mode"
                defaultMessage="Reading Mode"
              />
            </label>
            <div className="col">
              <div className="row">
                <Button
                  active={displaySettings.readingMode === 'manga'}
                  onClick={readingModeRendering('manga')}
                  className="col px-2"
                >
                  Manga
                </Button>
                <Button
                  active={displaySettings.readingMode === 'webtoon'}
                  onClick={readingModeRendering('webtoon')}
                  className="col px-2"
                >
                  Webtoon
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => toggle(false)}>
          <FormattedMessage id="close" defaultMessage="Close" />
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ReaderSettings;
