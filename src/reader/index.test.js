import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';

import Reader from './';
import { FETCH_CHAPTER } from './containers/queries';

const releases = global.rfMocks.releases.getReleases;
const pages = global.rfMocks.releases.getPages;

const mocks = [
  {
    request: {
      query: FETCH_CHAPTER,
      variables: {
        workStub: 'Infection',
        language: 1,
        volume: 0,
        chapter: 1,
        subchapter: 0
      }
    },
    result: {
      data: {
        chapterByWorkAndChapter: { ...releases[0], pages }
      }
    }
  }
];

it('should render without throwing an error', () => {
  const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <Reader
          match={{
            params: {
              stub: 'Infection',
              chapter: '1',
              subchapter: '0',
              volume: '0',
              lang: 'es'
            }
          }}
        />
      </MemoryRouter>
    </MockedProvider>
  );
  wrapper.unmount();
});
