import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { MockedProvider } from '@apollo/react-testing';

import { FETCH_WORK } from './containers/query';
import Serie from './';
import { MemoryRouter } from 'react-router-dom';

const chapters = global.rfMocks.releases.getReleases;
const work = global.rfMocks.work.work;

const mocks = [
  {
    request: {
      query: FETCH_WORK,
      variables: { language: 1, stub: 'infection' }
    },
    result: {
      data: {
        work: { ...work, chapters: chapters }
      }
    }
  }
];

it('should render without throwing an error', () => {
  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <Serie
          match={{
            params: {
              stub: 'infection'
            }
          }}
        />
      </MemoryRouter>
    </MockedProvider>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
