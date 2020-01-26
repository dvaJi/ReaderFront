import React from 'react';
import { useIntl } from 'react-intl';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { useGlobalState, setDisplaySettings } from 'lib/state';
import { Button, Container } from '../ui';

function ReaderSettings({ isOpen, toggle }) {
  const [displaySettings] = useGlobalState('displaySettings');
  const { formatMessage: f } = useIntl();

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
        {f({ id: 'reader_settings', defaultMessage: 'Reader Settings' })}
      </ModalHeader>
      <ModalBody>
        <Container>
          <h5>
            {f({ id: 'display_settings', defaultMessage: 'Display settings' })}
          </h5>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label">
              {f({ id: 'reading_mode', defaultMessage: 'Reading Mode' })}
            </label>
            <div className="col">
              <div className="row">
                <Button
                  active={displaySettings.readingMode === 'manga'}
                  onClick={readingModeRendering('manga')}
                  className="col px-2"
                >
                  {f({ id: 'manga', defaultMessage: 'Manga' })}
                </Button>
                <Button
                  active={displaySettings.readingMode === 'webtoon'}
                  onClick={readingModeRendering('webtoon')}
                  className="col px-2"
                >
                  {f({ id: 'webtoon', defaultMessage: 'Webtoon' })}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => toggle(false)}>
          {f({ id: 'close', defaultMessage: 'Close' })}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ReaderSettings;
