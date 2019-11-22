import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';
import { render, fireEvent } from '@testing-library/react';

import WorksContainer from './WorksContainer';
import { FETCH_WORKS } from './query';

const works = global.rfMocks.work.works;

const mocks = [
  {
    request: {
      query: FETCH_WORKS,
      variables: { language: 2 }
    },
    result: {
      data: {
        works: works
      }
    }
  }
];

it('should render without throwing an error', async () => {
  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <WorksContainer />
      </MemoryRouter>
    </MockedProvider>
  );

  await global.wait(0);

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should filter works', async () => {
  const { queryByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <WorksContainer />
      </MemoryRouter>
    </MockedProvider>
  );

  await global.wait(0);

  expect(queryByTestId('works-list').childElementCount).toBe(3);

  fireEvent.change(queryByTestId('work-search'), { target: { value: 'a' } });
  await global.wait(0);

  expect(queryByTestId('works-list').childElementCount).toBe(1);
});
