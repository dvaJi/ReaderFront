import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import { actions } from 'utils/enzyme-actions';
import { MockedProvider } from '@apollo/react-testing';

import { WorksContainer, FETCH_WORKS } from '@pages/work/all';

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
      <WorksContainer />
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    await global.wait(0);

    expect(wrapper).toBeTruthy();
    wrapper.unmount();
  });
});

it('should filter works', async () => {
  const wrapper = mountWithIntl(
    <MockedProvider mocks={mocks} addTypename={false}>
      <WorksContainer />
    </MockedProvider>
  );

  await actions(wrapper, async () => {
    await global.wait(0);

    expect(wrapper.find('#works-list > *').length).toBe(3);

    wrapper
      .find('input[id="work-search"]')
      .simulate('change', { target: { value: 'a', name: 'work-search' } });

    await global.wait(0);

    expect(wrapper.find('#works-list > *').length).toBe(1);
  });
});
