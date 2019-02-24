import React from 'react';
import { mountWithIntl } from 'enzyme-react-intl';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';

// App imports
import CreateChapter from './CreateChapter';
import { CREATE_CHAPTER } from '../mutations';

const releases = global.rfMocks.releases.getReleases;
const mocks = [
  {
    request: {
      query: CREATE_CHAPTER,
      variables: { ...releases[0] }
    },
    result: {
      data: {
        chapterCreate: { id: 1 }
      }
    }
  }
];

it('should render without throwing an error', async () => {
  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <CreateChapter />
      </MemoryRouter>
    </MockedProvider>
  );

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
