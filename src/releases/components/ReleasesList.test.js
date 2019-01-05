import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mountWithIntl } from 'enzyme-react-intl';
import ReleasesList from './ReleasesList';

const releases = global.rfMocks.releases.getReleases;

it('renders without crashing', () => {
  mountWithIntl(
    <BrowserRouter>
      <ReleasesList releases={[]} />
    </BrowserRouter>
  );
});

it('should render releases without crashing', () => {
  mountWithIntl(
    <BrowserRouter>
      <ReleasesList releases={releases} />
    </BrowserRouter>
  );
});
