import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { MemoryRouter } from 'react-router-dom';

import List from './List';
import { FETCH_WORKS } from './query';

const works = global.rfMocks.work.works;

const mocks = [
  {
    request: {
      query: FETCH_WORKS,
      variables: { language: -1 }
    },
    result: {
      data: {
        works: works
      }
    }
  }
];

it('should render without throwing an error', async () => {
  // Append a div to test our UncontrolledTooltip
  const div = document.createElement('div');
  div.setAttribute('id', 'noDescWarn-1');
  document.body.appendChild(div);
  const div2 = document.createElement('div');
  div2.setAttribute('id', 'noDescWarn-2');
  document.body.appendChild(div2);

  const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <List />
      </MemoryRouter>
    </MockedProvider>
  );

  await global.wait(0);

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});

it('should show a message when works list is empty without throwing an error', async () => {
  const emptyMocks = [
    {
      request: {
        query: FETCH_WORKS,
        variables: { language: -1 }
      },
      result: {
        data: {
          works: []
        }
      }
    }
  ];
  // Append a div to test our UncontrolledTooltip
  const div = document.createElement('div');
  div.setAttribute('id', 'noDescWarn');
  document.body.appendChild(div);

  const wrapper = mount(
    <MockedProvider mocks={emptyMocks} addTypename={false}>
      <MemoryRouter>
        <List />
      </MemoryRouter>
    </MockedProvider>
  );

  await global.wait(0);

  expect(wrapper.find('#works_empty')).toBeDefined();

  expect(wrapper).toBeTruthy();
  wrapper.unmount();
});
