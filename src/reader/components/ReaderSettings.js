import React from 'react';

import { useGlobalState } from 'state';
import { Button } from 'common/ui';

function ReaderSettings() {
  const [displaySettings, setDisplaySettings] = useGlobalState(
    'displaySettings'
  );
  const [layoutSettings, setLayoutSettings] = useGlobalState('layoutSettings');
  const [coreSettings, setCoreSettings] = useGlobalState('coreSettings');

  const updateFitDisplay = fitDisplay => () =>
    setDisplaySettings({ ...displaySettings, fitDisplay });
  const updatePageRendering = pageRendering => () =>
    setDisplaySettings({ ...displaySettings, pageRendering });
  const updateDirection = direction => () =>
    setDisplaySettings({ ...displaySettings, direction });
  const updateHeader = header => () =>
    setLayoutSettings({ ...layoutSettings, header });
  const updateSidebar = sidebar => () =>
    setLayoutSettings({ ...layoutSettings, sidebar });
  const updatePreload = e =>
    setCoreSettings({ ...coreSettings, preloadImages: e.target.value });
  const updateQuality = e =>
    setCoreSettings({ ...coreSettings, qualityImage: e.target.value });
  return (
    <div>
      <h5>Display settings</h5>
      <div className="form-group row">
        <label className="col-sm-4 col-form-label">Fit display to</label>
        <div className="col">
          <div className="row">
            <Button
              active={displaySettings.fitDisplay === 'container'}
              onClick={updateFitDisplay('container')}
              className="col px-2"
            >
              Container
            </Button>
            <Button
              active={displaySettings.fitDisplay === 'width'}
              onClick={updateFitDisplay('width')}
              className="col px-2"
            >
              Width
            </Button>
            <Button
              active={displaySettings.fitDisplay === 'height'}
              onClick={updateFitDisplay('height')}
              className="col px-2"
            >
              Height
            </Button>
            <Button
              active={displaySettings.fitDisplay === 'noresize'}
              onClick={updateFitDisplay('noresize')}
              className="col px-2"
            >
              No resize
            </Button>
          </div>
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-4 col-form-label">Page rendering</label>
        <div className="col">
          <div className="row">
            <Button
              active={displaySettings.pageRendering === 'single'}
              onClick={updatePageRendering('single')}
              className="col px-2"
            >
              Single
            </Button>
            <Button
              active={displaySettings.pageRendering === 'double'}
              onClick={updatePageRendering('double')}
              className="col px-2"
            >
              Double
            </Button>
            <Button
              active={displaySettings.pageRendering === 'longstrip'}
              onClick={updatePageRendering('longstrip')}
              className="col px-2"
            >
              Long strip
            </Button>
          </div>
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-4 col-form-label">Direction</label>
        <div className="col">
          <div className="row">
            <Button
              active={displaySettings.direction === 'left'}
              onClick={updateDirection('left')}
              className="col px-2"
            >
              Left to right
            </Button>
            <Button
              active={displaySettings.direction === 'right'}
              onClick={updateDirection('right')}
              className="col px-2"
            >
              Right to left
            </Button>
          </div>
        </div>
      </div>
      <hr />
      <h5>Layout settings</h5>
      <div className="form-group row">
        <label className="col-sm-4 col-form-label">Header</label>
        <div className="col">
          <div className="row">
            <Button
              active={layoutSettings.header}
              onClick={updateHeader(true)}
              className="col px-2"
            >
              Visible
            </Button>
            <Button
              active={!layoutSettings.header}
              onClick={updateHeader(false)}
              className="col px-2"
            >
              Hidden
            </Button>
          </div>
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-4 col-form-label">Sidebar</label>
        <div className="col">
          <div className="row">
            <Button
              active={layoutSettings.sidebar}
              onClick={updateSidebar(true)}
              className="col px-2"
            >
              Visible
            </Button>
            <Button
              active={!layoutSettings.sidebar}
              onClick={updateSidebar(false)}
              className="col px-2"
            >
              Hidden
            </Button>
          </div>
        </div>
      </div>
      <hr />
      <h5>Other settings</h5>
      <div className="row form-group">
        <label className="col-sm-4 col-form-label">
          Preload images (0 to <span className="preload-max-value">20</span>)
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
    </div>
  );
}

export default ReaderSettings;
