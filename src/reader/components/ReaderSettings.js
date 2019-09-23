import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { useGlobalState, setDisplaySettings, setCoreSettings } from 'state';
import { Button, Container } from 'common/ui';

function ReaderSettings({ isOpen, toggle }) {
  const [displaySettings] = useGlobalState('displaySettings');
  const [coreSettings] = useGlobalState('coreSettings');

  const readingModeRendering = readingMode => () =>
    setDisplaySettings({ ...displaySettings, readingMode });
  const updatePageRendering = pageRendering => () =>
    setDisplaySettings({ ...displaySettings, pageRendering });
  const readingDirectionRendering = readingDirection => () =>
    setDisplaySettings({ ...displaySettings, readingDirection });
  const updatePreload = e =>
    setCoreSettings({ ...coreSettings, preloadImages: e.target.value });
  const updateQuality = e =>
    setCoreSettings({ ...coreSettings, qualityImage: e.target.value });
  return (
    <Modal
      isOpen={isOpen}
      toggle={() => toggle(false)}
      size="md"
      centered={true}
    >
      <ModalHeader toggle={() => toggle(false)}>Reader Settings</ModalHeader>
      <ModalBody>
        <Container>
          <h5>Display settings</h5>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label">Reading Mode</label>
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
          <div className="form-group row">
            <label className="col-sm-4 col-form-label">Page rendering</label>
            <div className="col">
              <div className="row">
                <Button
                  active={displaySettings.pageRendering === 'horizontal'}
                  onClick={updatePageRendering('horizontal')}
                  className="col px-2"
                >
                  Horizontal
                </Button>
                <Button
                  active={displaySettings.pageRendering === 'vertical'}
                  onClick={updatePageRendering('vertical')}
                  className="col px-2"
                >
                  Vertical
                </Button>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label">Reading Direction</label>
            <div className="col">
              <div className="row">
                <Button
                  active={displaySettings.readingDirection === 'left'}
                  onClick={readingDirectionRendering('left')}
                  className="col px-2"
                >
                  Left
                </Button>
                <Button
                  active={displaySettings.readingDirection === 'right'}
                  onClick={readingDirectionRendering('right')}
                  className="col px-2"
                >
                  Right
                </Button>
              </div>
            </div>
          </div>
          <hr />
          <h5>Other settings</h5>
          <div className="row form-group">
            <label className="col-sm-4 col-form-label">
              Preload images (0 to <span className="preload-max-value">20</span>
              )
            </label>
            <div className="col px-0 my-auto">
              <input
                data-setting="preloadPages"
                className="form-control"
                type="number"
                min="0"
                max="20"
                placeholder="The amount of images (default: 3)"
                onChange={updatePreload}
                value={coreSettings.preloadImages}
              />
            </div>
          </div>
          <div className="row form-group advanced">
            <label className="col-sm-4 col-form-label">Quality Image</label>
            <div className="col px-0 my-auto">
              <select
                className="form-control"
                onChange={updateQuality}
                value={coreSettings.qualityImage}
              >
                <option value="100">Source</option>
                <option value="90">High</option>
                <option value="75">Medium</option>
                <option value="60">Low</option>
              </select>
            </div>
          </div>
        </Container>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => toggle(false)}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ReaderSettings;
