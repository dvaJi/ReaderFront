import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';

import Detail from './index';
import { FETCH_CHAPTER } from '../query';

const releases = global.rfMocks.releases.getReleases;
const pages = global.rfMocks.releases.getPages;

const mocks = [
  {
    request: {
      query: FETCH_CHAPTER,
      variables: {
        chapterId: 1
      }
    },
    result: {
      data: {
        chapterById: { ...releases[0], pages: pages }
      }
    }
  }
];

it('should render without throwing an error', async () => {
  // Append a div to test our UncontrolledTooltip
  const div = document.createElement('div');
  div.setAttribute('id', 'select-default-1298337316');
  document.body.appendChild(div);

  const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <Detail
          match={{
            params: {
              workId: '1',
              stub: 'Infection',
              chapterId: '1'
            }
          }}
        />
      </MemoryRouter>
    </MockedProvider>
  );

  await global.wait(0);
  expect(wrapper).toBeTruthy();
  await wrapper.unmount();
});
